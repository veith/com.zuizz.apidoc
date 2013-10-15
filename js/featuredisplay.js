(function ($) {
    /**
     * @author Veith Zäch
     * @namespace Tc.Module
     * @class TcTemplate
     * @extends Tc.Module
     */
    Tc.Module.Featuredisplay = Tc.Module.extend({

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
            self.init_feature_api();
            self.initDot();
            self.autobutton();

            self.feature = '';
            self.api = {};
            self.api.method = new Tc.zu.rest('/api/0/com.zuizz.apidoc.features.restlets.methods/');
        },

        onFeatureSelected: function (d) {
            var $ctx = this.$ctx,
                self = this;
            self.feature = d.info.feature;
            self.loadData(self.feature);
        },

        loadData: function (feature) {
            var $ctx = this.$ctx,
                self = this;
            self.rest.features.get(feature, {200: function (d) {
                self.render(d);
            }})


        },

        render: function (data) {
            var $ctx = this.$ctx,
                self = this;

            data.feature = self.feature;
            $ctx.html(self.dot.feature(data));
            $('#display .mod').hide();
            $ctx.show();
        },
        onFeatureNodeSelected:function(d){
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
        init_feature_api: function () {
            var $ctx = this.$ctx,
                self = this;
            //bind to ressource features
            self.rest.features = new Tc.zu.rest('/api/0/com.zuizz.apidoc/features/');

            //define fields
            self.rest.features.defineFields('*');

            //define expands
            self.rest.features.defineExpands('');

            //set mimetype
            //mimetype is json per default
        }
    });
})(Tc.$);