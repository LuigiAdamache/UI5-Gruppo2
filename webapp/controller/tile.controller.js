sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (Controller, UIComponent) {
        "use strict";

        return Controller.extend("suppliers.suppliers.controller.tile", {
            onInit: function () {

            },
            goTo: function () {
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("worklist", null);
            },
            goVai: function () {
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("fornitore", null);
            },
            goEntra: function () {
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("avverti", null);
            },
            goAccedi: function () {
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("esterni", null);
            }
        });
    });
