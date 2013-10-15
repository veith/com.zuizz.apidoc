(function ($) {
    /**
     * @author Veith Zäch
     * @namespace Tc.Module
     * @class TcTemplate
     * @extends Tc.Module
     */
    Tc.Module.Contextbuttons = Tc.Module.extend({

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
            self.restlet_data = {}; // store level based information
            self.current_level = 0;
            // call base constructor
            this._super($ctx, sandbox, modId);
            self.autobutton();

            self.api = {};
            self.api.restlet = new Tc.zu.rest('/api/0/com.zuizz.apidoc.features.restlets/');
            self.api.method = new Tc.zu.rest('/api/0/com.zuizz.apidoc.features.restlets.methods/');

        },
        onFeatureSelected: function (d) {
            var $ctx = this.$ctx,
                self = this;

            self.restlet_data[d.level] = d.info;
            self.showAddRestlet();
            self.current_level = d.level;

        },
        onFeatureNodeSelected: function (d) {
            var $ctx = this.$ctx,
                self = this;

            self.showAddRestlet();
            self.current_level = d.level;
        },
        onRestletSelected: function (d) {
            var $ctx = this.$ctx,
                self = this;
            self.restlet_data[d.level] = d.info;
            self.current_level = d.level;

        },
        onRestletNodeSelected: function (d) {
            var $ctx = this.$ctx,
                self = this;
            self.current_level = d.level;



        },

        'tcb-addRestlet': function (button) {
            var $ctx = this.$ctx,
                self = this;
            var n = prompt('Please enter the name of the restlet');

            //Post data

            var i = self.restlet_data[self.current_level];
            var data = {'feature': i.feature, 'path': i.restlet_path, 'name': n}
            self.api.restlet.add(data, {201: function (r) {
                self.fire('reloadCurrentLevel',{'level':self.current_level});
            }})

            //reload sidenav
            //select restlet

        },
        showAddRestlet: function () {
            var $ctx = this.$ctx,
                self = this;
            // hide method button
            $('.methodButtons', $ctx).hide();
            // show restlet button
            $('.tcb-addRestlet', $ctx).show();
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