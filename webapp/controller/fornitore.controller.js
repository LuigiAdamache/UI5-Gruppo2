sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (Controller, UIComponent, History, JSONModel, MessageBox) {
        "use strict";

        return Controller.extend("suppliers.suppliers.controller.tile", {
            onInit: function () {
                var oData = {
                            City: "",
                            Region: "",
                            PostalCode: "",
                            Country: "",
                   
                    "ContactTitle": [
                        {
                            "Name": "Addetto/a Vendite"
                        },
                        {
                            "Name": "Rappresentante"
                        },
                        {
                            "Name": "Manager"
                        },
                    ],
                };

                // set explored app's demo model on this sample
                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel, "b");
            },
            onBack: function () {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    var oRouter = UIComponent.getRouterFor(this);
                    oRouter.navTo("tile", {}, true);
                }
            },
            onClear: function () {
                var pulisci = this.byId("FormToolbar");
                var clear = pulisci.getAggregation("formContainers")[0].getAggregation("formElements");
                clear.forEach(obj => {
                    obj.getAggregation("fields")[0].setValue("")
                })
            },
            onCheck: function (oEvent) {
                debugger
                var SupplierID = this.byId("supID").getValue();
                var CompanyName = this.byId("companyName").getValue();
                var ContactName = this.byId("contactName").getValue();
                var Address = this.byId("addr").getValue();
        
                if (!SupplierID || !CompanyName || !ContactName || !Address) {
                    MessageBox.error("Inserire tutti i campi");
                }
            },
            onCity: function (oEvent) {
                debugger
                var insert = this.getView().getModel("b").getData();
                var citta = oEvent.getParameter("selectedItem").getProperty("key");

                if (citta === "Roma") {
                    insert["Region"] = "Lazio";
                    insert["PostalCode"] = "00100";
                    insert["Country"] = "Italia";
                }

                if (citta === "Milano") {
                    insert["Region"] = "Lombardia";
                    insert["PostalCode"] = "20019";
                    insert["Country"] = "Italia";
                }

                if (citta === "Bologna") {
                    insert["Region"] = "Emilia-Romagna";
                    insert["PostalCode"] = "40121";
                    insert["Country"] = "Italia";
                }
            },
            onChange: function (oEvent) {
                var string = oEvent.getParameter("value")
                const toUppercase = string => string.replace(/^(.)|\s+(.)/g, c => c.toUpperCase());
                let sourceName = oEvent.getSource().getParent().getAggregation("label").replace(/\s/g, "");
                let inputID = sourceName.charAt(0).toLowerCase()+ sourceName.slice(1);
                    if( string != "" ){
                        this.byId(inputID).setValue(toUppercase(string));
                    }
            }
        });
    });
