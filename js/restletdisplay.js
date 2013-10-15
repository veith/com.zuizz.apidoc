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
            self.restlet_data = {}; // store level based information
            self.current_level = 0;
            // call base constructor
            this._super($ctx, sandbox, modId);
            self.autobutton();

            self.api = {};

            self.api.method = new Tc.zu.rest('/api/0/com.zuizz.apidoc.features.restlets.methods/');
            self.initDot();
            self.allButtons = $('.methodButtons', $ctx).html();
        },

        onRestletSelected: function (d) {
            var $ctx = this.$ctx,
                self = this;
            self.restlet_data[d.level] = d.info;
            self.restlet_data[d.level].methods = d.methods;
            self.showAddRestletAndMethods(self.restlet_data[d.level].methods);
            self.current_level = d.level;

            self.restlet = d.info.restlet;
            self.loadData(self.restlet);

            $('#display .mod').hide();
            $ctx.show();
        },
        onRestletNodeSelected: function (d) {
            var $ctx = this.$ctx,
                self = this;
            self.showAddRestletAndMethods(self.restlet_data[d.level].methods);
            self.current_level = d.level;

            self.loadData(self.restlet_data[d.level].restlet);
            $('#display .mod').hide();
            $ctx.show();

        },
        'tcb-addGet': function (button) {
            var $ctx = this.$ctx,
                self = this;
            var i = self.restlet_data[self.current_level];
            var data = {'feature': i.feature, 'path': i.restlet_path, 'method': 'get'}
            self.api.method.add(data, {201: function (r) {
                self.fire('reloadCurrentLevel',{'level':self.current_level});
            }})

        },
        'tcb-addPut': function (button) {
            var $ctx = this.$ctx,
                self = this;
            var i = self.restlet_data[self.current_level];
            var data = {'feature': i.feature, 'path': i.restlet_path, 'method': 'put'}
            self.api.method.add(data, {201: function (r) {
                self.fire('reloadCurrentLevel',{'level':self.current_level});
            }})

        }, 'tcb-addPost': function (button) {
            var $ctx = this.$ctx,
                self = this;
            var i = self.restlet_data[self.current_level];
            var data = {'feature': i.feature, 'path': i.restlet_path, 'method': 'post'}
            self.api.method.add(data, {201: function (r) {

                self.fire('reloadCurrentLevel',{'level':self.current_level});
            }})

        }, 'tcb-addDelete': function (button) {
            var $ctx = this.$ctx,
                self = this;

            var i = self.restlet_data[self.current_level];
            var data = {'feature': i.feature, 'path': i.restlet_path, 'method': 'delete'}
            self.api.method.add(data, {201: function (r) {

                self.fire('reloadCurrentLevel',{'level':self.current_level});
            }})

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
        showAddRestletAndMethods: function (existingMethods) {
            var $ctx = this.$ctx,
                self = this;
            $('.methodButtons', $ctx).html(self.allButtons);

            $(existingMethods).each(function (i, m) {
                $('.' + existingMethods[i].method, $ctx).remove();
            })

            // hide restlet buttons
            $('.tcb-addRestlet', $ctx).show();
            // show method button
            $('.methodButtons', $ctx).show();
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

        loadData: function (restlet) {
            var $ctx = this.$ctx,
                self = this;
            self.api.restlet = new Tc.zu.rest('/api/0/com.zuizz.apidoc/features/' + self.restlet_data[self.current_level]['feature'] + '/restlets/');
            self.api.restlet.get(restlet, {200: function (d) {
                d.restlet = restlet;
                self.render(d);
            }})


        },


        render: function (data) {
            var $ctx = this.$ctx,
                self = this;


            $('#APIDOCInfo',$ctx).html(self.dot.restlet(data));

        }

    });
})(Tc.$);