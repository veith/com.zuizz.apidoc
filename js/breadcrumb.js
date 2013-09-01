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
            self.level = 0;
            self.initDot();
            self.autobutton();
            self.current_method = '';
        },
        'onFeatureSelected': function (d) {
            var $ctx = this.$ctx,
                self = this;

            var l = $('.breadcrumb li', $ctx).length;
            for (var i = l; i >= 1; i--) {
                $('.breadcrumb li', $ctx).eq(i).remove();
            }
            $('.breadcrumb', $ctx).append('<li><a href="#" class="tcb tcb-feature" data-level="' + d.level + '">' + d.info.feature + '</a></li>')

        },

        'onRestletSelected': function (d) {
            var $ctx = this.$ctx,
                self = this;
            self.current_method = d.href;
            var l = $('.breadcrumb li', $ctx).length;

            for (var i = l; i >= d.level; i--) {
                $('.breadcrumb li', $ctx).eq(i).remove();
            }
            $('.breadcrumb', $ctx).append('<li><a href="#" class="tcb tcb-restlet" data-level="' + d.level + '">' + d.info.restlet + '</a></li>')
            self.level = d.level;
        },

        'onNavigationLevelBack': function (d) {
            var $ctx = this.$ctx,
                self = this;
            $('.breadcrumb li.active', $ctx).remove();
            var l = $('.breadcrumb li', $ctx).length;

            for (var i = l; i > d.level; i--) {
                $('.breadcrumb li', $ctx).eq(i).remove();
            }
        },

        'onMethodSelected': function (d) {
            var $ctx = this.$ctx,
                self = this;
            if (self.current_method != d.href) {
                self.current_method = d.href;
                $('.breadcrumb', $ctx).append('<li class="active"><a href="#" class="tcb tcb-method" data-level="' + d.level + '">[' + d.method + ']</a></li>')
            }
        },

        'tcb-rootnode': function (button) {
            var $ctx = this.$ctx,
                self = this;
            self.fire('rootNodeSelected', {'level': 0});
        },
        'tcb-feature': function (button) {
            var $ctx = this.$ctx,
                self = this;
            self.fire('featureNodeSelected', {'level': $(button).data('level')});
        },
        'tcb-restlet': function (button) {
            var $ctx = this.$ctx,
                self = this;
            self.fire('restletNodeSelected', {'level': $(button).data('level')});
        },
        'tcb-method': function (button) {
            var $ctx = this.$ctx,
                self = this;
            self.fire('methodNodeSelected', {'level': $(button).data('level')});
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