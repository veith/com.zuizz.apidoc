(function ($) {
    /**
     * @author Veith Zäch
     * @namespace Tc.Module
     * @class TcTemplate
     * @extends Tc.Module
     */
    Tc.Module.Restletdisplay = Tc.Module.extend({

        /**
         * Initializes the Default module.
         *
         * @method init
         * @constructor
         * @param {jQuery} $ctx the jquery context
         * @param {Sandbox} sandbox the sandbox to get the resources from
         * @param {String} modId the unique module id
         */
        init: function ($ctx, sandbox, modId) {
            var self = this;

            // call base constructor
            this._super($ctx, sandbox, modId);
            self.rest = {};
            self.init_restlet_api();
            self.initDot();
            self.autobutton();

            self.restlet = '';


        },
        onRestletSelected: function (d) {
            var $ctx = this.$ctx,
                self = this;

            self.restlet = d.info.restlet;
            self.loadData(self.restlet);
        },

        loadData: function (restlet) {
            var $ctx = this.$ctx,
                self = this;
            self.rest.restlets.get(restlet, {200: function (d) {
                self.render(d);
            }})


        },

        render: function (data) {
            var $ctx = this.$ctx,
                self = this;
            data.restlet = self.restlet;
            $ctx.html(self.dot.restlet(data));
            $('#display .mod').hide();
            $ctx.show();
        },
        onRestletNodeSelected:function(d){
            var $ctx = this.$ctx,
                self = this;
            $('#display .mod').hide();
            $ctx.show();
        },
        /**
         * Hook function to do all of your module stuff.
         *
         * @method on
         * @param {Function} callback function
         * @return void
         */
        on: function (callback) {
            var $ctx = this.$ctx,
                self = this;
            callback();
        },
        /**
         * Hook function to trigger your events.
         *
         * @method after
         * @return void
         */
        after: function () {
            var $ctx = this.$ctx,
                self = this;
        },
        init_restlet_api: function () {
            var $ctx = this.$ctx,
                self = this;
            //bind to ressource restlets
            self.rest.restlets = new Tc.zu.rest('/api/0/com.zuizz.apidoc/features/com.zuizz.apidoc/restlets/');

            //define fields
            self.rest.restlets.defineFields('*');

            //define expands
            self.rest.restlets.defineExpands('');

            //set mimetype
            //mimetype is json per default
        }
    });
})(Tc.$);