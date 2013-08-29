(function ($) {
    /**
     * @author Veith Zäch
     * @namespace Tc.Module
     * @class TcTemplate
     * @extends Tc.Module
     */
    Tc.Module.Breadcrumb = Tc.Module.extend({

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
            self.initDot();
            self.autobutton();


        },
        'onFeatureSelected': function (d) {
            var $ctx = this.$ctx,
                self = this;

            $('.breadcrumb', $ctx).append('<li><a href="#" class="tcb tcb-navigation">' + d.info.feature + '</a></li>')
        },

        'onRestletSelected': function (d) {
            var $ctx = this.$ctx,
                self = this;
            $('.breadcrumb', $ctx).append('<li><a href="#" class="tcb tcb-navigation">' + d.info.restlet + '</a></li>')
        },
        'onNavigationLevelBack':function(){
            var $ctx = this.$ctx,
                self = this;
            $('.breadcrumb li.active', $ctx).remove();
            $('.breadcrumb li', $ctx).last().remove();
        },


        'onMethodSelected':function(d){
            var $ctx = this.$ctx,
                self = this;
            $('.breadcrumb', $ctx).append('<li class="active">[' + d.method + ']</li>')
        },


        'tcb-navigation': function (button) {
            var $ctx = this.$ctx,
                self = this;

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
        }

    });
})(Tc.$);