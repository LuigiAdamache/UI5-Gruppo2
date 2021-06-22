sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History",
    "sap/ui/core/Fragment",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Filter",
    "sap/m/MessageBox"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (Controller, UIComponent, History, Fragment, FilterOperator, Filter, MessageBox) {
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
                debugger
                var value = this.byId("inputID").getValue();
                var oModel = this.getOwnerComponent().getModel();
                var aSuppliers1 = oModel.oData["Suppliers(1)"].SupplierID
                var aSuppliers2 = oModel.oData["Suppliers(2)"].SupplierID
                var aSuppliers3 = oModel.oData["Suppliers(3)"].SupplierID
                var aSuppliers4 = oModel.oData["Suppliers(4)"].SupplierID
                var aSuppliers5 = oModel.oData["Suppliers(5)"].SupplierID
                var aSuppliers6 = oModel.oData["Suppliers(6)"].SupplierID
                var aSuppliers7 = oModel.oData["Suppliers(7)"].SupplierID
                var aSuppliers8 = oModel.oData["Suppliers(8)"].SupplierID
                var aSuppliers9 = oModel.oData["Suppliers(9)"].SupplierID
                var aSuppliers10 = oModel.oData["Suppliers(10)"].SupplierID
                var aSuppliers11 = oModel.oData["Suppliers(11)"].SupplierID
                var aSuppliers12 = oModel.oData["Suppliers(12)"].SupplierID
                var aSuppliers13 = oModel.oData["Suppliers(13)"].SupplierID
                var aSuppliers14 = oModel.oData["Suppliers(14)"].SupplierID
                var aSuppliers15 = oModel.oData["Suppliers(15)"].SupplierID
                var aSuppliers16 = oModel.oData["Suppliers(16)"].SupplierID
                var aSuppliers17 = oModel.oData["Suppliers(17)"].SupplierID
                var aSuppliers18 = oModel.oData["Suppliers(18)"].SupplierID
                var aSuppliers19 = oModel.oData["Suppliers(19)"].SupplierID
                var aSuppliers20 = oModel.oData["Suppliers(20)"].SupplierID
                var aSuppliers21 = oModel.oData["Suppliers(21)"].SupplierID
                var aSuppliers22 = oModel.oData["Suppliers(22)"].SupplierID
                var aSuppliers23 = oModel.oData["Suppliers(23)"].SupplierID
                var aSuppliers24 = oModel.oData["Suppliers(24)"].SupplierID
                var aSuppliers25 = oModel.oData["Suppliers(25)"].SupplierID
                var aSuppliers26 = oModel.oData["Suppliers(26)"].SupplierID
                var aSuppliers27 = oModel.oData["Suppliers(27)"].SupplierID
                var aSuppliers28 = oModel.oData["Suppliers(28)"].SupplierID
                var aSuppliers29 = oModel.oData["Suppliers(29)"].SupplierID
            
                if (aSuppliers1 == value || aSuppliers2 == value || aSuppliers3 == value || aSuppliers4 == value || aSuppliers5 == value || aSuppliers6 == value || aSuppliers7 == value || aSuppliers8 == value || aSuppliers9 == value || aSuppliers10 == value || aSuppliers11 == value || aSuppliers12 == value || aSuppliers13 == value || aSuppliers14 == value || aSuppliers15 == value || aSuppliers16 == value || aSuppliers17 == value || aSuppliers18 == value || aSuppliers19 == value || aSuppliers20 == value || aSuppliers21 == value || aSuppliers22 == value || aSuppliers23 == value || aSuppliers24 == value || aSuppliers25 == value || aSuppliers26 == value || aSuppliers27 == value || aSuppliers28 == value || aSuppliers29 == value ) {
                        
                } else {
                    return MessageBox.error("Nessun fornitore associato")
                }  
              
            },
        openQuickView: function (oEvent, oModel) {
			var oButton = oEvent.getSource(),
				oView = this.getView();

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
			this._pQuickView.then(function (oQuickView){
				oQuickView.setModel(oModel);
				oQuickView.openBy(oButton);
			});
		},
            onQuick: function (oEvent) {
            var oModel = this.getView().getModel();
			this.openQuickView(oEvent, oModel);
            }
        });
    });
