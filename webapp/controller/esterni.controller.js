sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History",
    "sap/m/library",
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (Controller, UIComponent, History, mobileLibrary) {
        "use strict";
        var URLHelper = mobileLibrary.URLHelper;
        Controller.extend("suppliers.suppliers.controller.esterni", {
            onInit: function () {
               
            },
            onNavBack: function () {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    var oRouter = UIComponent.getRouterFor(this);
                    oRouter.navTo("tile", {}, true);
                }
            },
            _getVal: function(evt) {
			return evt.getSource().getValue();
		},
            handleEmailPress: function (evt) {
			URLHelper.triggerEmail(this._getVal(evt), "Info Request", false, false, false, true);
		},
		    handleUrlPress: function (evt) {
			URLHelper.redirect(this._getVal(evt), true);
		}
        });
    });
