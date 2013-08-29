(function ($) {
    /**
     * Apidoc Feature Browser
     *
     * @author Veith Zäch
     * @namespace Tc.Module
     * @class Browse
     * @extends Tc.Module
     */
    Tc.Module.Fullheight = Tc.Module.extend({

        /**
         * Initializes the Default module.
         *
         * @method init
         * @constructor
         * @param {jQuery} $ctx the jquery context
         * @param {Sandbox} sandbox the sandbox to get the resources from
         * @param {String} modId the unique module id
         */
        init:function ($ctx, sandbox, modId) {
            // call base constructor
            this._super($ctx, sandbox, modId);
            var self = this;



            var debounced = Zu.debounce(function(){self.setHeight();},500);
            debounced();

            $(window).bind("resize", function () {
                debounced();
            });


        },
        setHeight:function () {
            var $ctx = this.$ctx,
                self = this;
            // höhen setzen
            var topbot = $('#zu_bottompane').offset().top -5;
            var topthis = $ctx.offset().top;
            var height = topbot - topthis;

            $ctx.css('height',height);
            self.fire('heightSetted',$ctx);
        }
    });
})(Tc.$);