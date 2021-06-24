sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History",
    "sap/ui/core/Fragment",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Filter",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (Controller, UIComponent, History, Fragment, FilterOperator, Filter, MessageBox, JSONModel) {
        "use strict";

        return Controller.extend("suppliers.suppliers.controller.avverti", {
            onInit: function () {

            },
            onIndietro: function () {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    var oRouter = UIComponent.getRouterFor(this);
                    oRouter.navTo("tile", {}, true);
                }
            },
            help: function () {
                var oView = this.getView();

                if (!this.byId("valueHelpDialog")) {
                    Fragment.load({
                        id: oView.getId(),
                        name: "suppliers.suppliers.fragment.Fornitori",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog)
                        oDialog.open();
                    });
                } else {
                    this.byId("valueHelpDialog").open();
                }
            },
            onCloseDialog: function () {
                this.byId("valueHelpDialog").close();
            },
            onValueHelpClose: function (oEvent) {

                var oSelectedItem = oEvent.getParameter("selectedItem");
                oEvent.getSource().getBinding("items").filter([]);

                if (!oSelectedItem) {
                    return;
                }

                this.byId("inputID").setValue(oSelectedItem.getTitle());
            },
            onValueHelpSearch: function (oEvent) {
                var sValue = oEvent.getParameter("value");
                var oFilter = new Filter("CompanyName", FilterOperator.Contains, sValue);

                oEvent.getSource().getBinding("items").filter([oFilter]);
            },
            click: function (oEvent) {
                var value = this.byId("inputID").getValue();
                var oModel = this.getOwnerComponent().getModel();
                var sup = oModel.oData;
                var val = false
                for (let obj in sup) {
                    if (sup[obj].SupplierID == value) {
                        val = true
                        this.byId("employeeQuickView").setEnabled(true)
                    }
                }
                if (!val) {
                    this.byId("employeeQuickView").setEnabled(false)
                    return MessageBox.error("Nessun fornitore associato")
                }
            },
            openQuickView: function () {
                var oView = this.getView();

                if (!this._pQuickView) {
                    this._pQuickView = Fragment.load({
                        id: oView.getId(),
                        name: "suppliers.suppliers.fragment.Quick",
                        controller: this
                    }).then(function (oQuickView) {
                        oView.addDependent(oQuickView);
                        return oQuickView;
                    });
                }
            },
            onQuick: function (oEvent) {
                debugger
                var oModel = this.getOwnerComponent().getModel();
                var Data = oModel.oData;
                var SupplierID = this.byId("inputID").getValue();
                var Citta = Data[`Suppliers(${SupplierID})`].City;
                var oButton = oEvent.getSource()

                $.ajax({
                    method: "GET",
                    url: `https://api.openweathermap.org/data/2.5/weather?q=${Citta}&appid=5ce55d720929c2c516045ce60b27de43`,
                    success: (oData, oResponse) => {
                        this.openQuickView();
                        this._pQuickView.then((oQuickView) => {
                            debugger
                            var meteo = new JSONModel({
                                city: oData.name,
                                country: oData.country,
                                description: oData.weather[0].description,
                                temp_max: oData.main.temp_max,
                                temp_min: parseInt(oData.main.temp_min - 273),
                                email: false
                            });
                            if (meteo.oData.temp_min <= 20) {
                                meteo.oData.email = true;
                            }
                            oQuickView.setModel(meteo, "meteo")
                            oQuickView.openBy(oButton)
                        })
                    },
                    error: function (oResponse) {

                    }
                })
            }
        });
    });
