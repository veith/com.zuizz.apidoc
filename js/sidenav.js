(function ($) {
    /**
     * @author Veith Zäch
     * @namespace Tc.Module
     * @class TcTemplate
     * @extends Tc.Module
     */
    Tc.Module.Sidenav = Tc.Module.extend({

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
            self.init_features();
            self.initDot();
            self.autobutton();
            self.eventlistener();
            self.level = 0;
            self.restlet_data = []; //restlet data on level
            self.rest.features.list({200: function (d) {
                self.renderFeature(d.features);
            }})

        },
        eventlistener: function () {
            var $ctx = this.$ctx,
                self = this;

            $('.featurelist', $ctx).on('click', 'a', function () {
                $('.featurelist li', $ctx).removeClass('active');
                $(this).parent().addClass('active');
                self.rest.restlets = new Tc.zu.rest($(this).attr('href'));
                self.rest.restlets.list({200: function (d) {
                    self.restlet_data[self.level] = d;
                    self.renderFeatureDetails(d);
                }})
                return false;
            });

            $ctx.on('click', '.restletlist ul.restlets li a', function () {
                $('.restletlist ul.restlets li', $ctx).removeClass('active');
                $(this).parent().addClass('active');
                self.rest.restlets = new Tc.zu.rest($(this).attr('href'));
                self.rest.restlets.list({200: function (d) {
                    self.restlet_data[self.level + 1] = d;
                    self.renderRestlets(d);
                }})
                return false;
            });
            // click on method
            $ctx.on('click', '.restletlist ul.methods li a', function () {
                $('.restletlist ul.methods li', $ctx).removeClass('active');
                $(this).parent().addClass('active');
                self.fire('methodSelected', {'level': self.level, 'method': $(this).data('method'), 'href': $(this).attr('href')});

                return false;
            });

        },

        renderFeature: function (data) {
            var $ctx = this.$ctx,
                self = this;
            $('.featurelist', $ctx).html(self.dot.featurelist(data))
            $('.lvl-0').slideDown();


        },
        renderRestlets: function (data) {
            var $ctx = this.$ctx,
                self = this;
            data.level = self.level + 1;

            if ($('.lvl-' + (self.level + 1), $ctx).length == 0) {
                $('.lvl-' + (self.level), $ctx).after(self.dot.restletlist(data));
            } else {
                $('.lvl-' + (self.level + 1), $ctx).html(self.dot.restletlist(data));
            }

            self.level = self.level + 1;
            self.fire('restletSelected', {'level': self.level, 'info': data.info});
            $('.lvl', $ctx).slideUp();
            $('.lvl-' + self.level).delay(400).slideDown();
        },
        renderFeatureDetails: function (data) {
            var $ctx = this.$ctx,
                self = this;
            data.level = 1;

            $('.lvl', $ctx).slideUp();
            if ($('.lvl-1', $ctx).length == 0) {
                $('.lvl-0', $ctx).after(self.dot.featuredetail(data));
            } else {
                $('.lvl-1', $ctx).html(self.dot.featuredetail(data));
            }

            self.level = 1;
            self.fire('featureSelected', {'level': self.level, 'info': data.info});
            $('.lvl-' + self.level).delay(400).slideDown();

        },

        'tcb-back': function (button) {
            var $ctx = this.$ctx,
                self = this;
            self.level = $(button).data('level') - 1;
            self.fire('navigationLevelBack', {'level': self.level});
            $('.lvl').slideUp();
            $('.lvl-' + self.level).delay(400).slideDown();
        },

        onRootNodeSelected: function (d) {
            var $ctx = this.$ctx,
                self = this;
            //hide all and show lvl-0
            if (self.level != d.level) {
                self.level = d.level;
                $('.lvl').slideUp();
                $('.lvl-0').slideDown();
            }

        },

        onFeatureNodeSelected: function (d) {
            var $ctx = this.$ctx,
                self = this;
            //hide all and show lvl-0
            if (self.level != d.level) {
                self.level = d.level;
                $('.lvl').slideUp();
                $('.lvl-' + d.level).slideDown();
            }

        },
        onMethodNodeSelected: function (d) {
            var $ctx = this.$ctx,
                self = this;


            //hide all and show lvl-0
            if (self.level != d.level) {
                self.level = d.level;
                $('.lvl').slideUp();
                $('.lvl-' + d.level).slideDown();
            }

        },

        onRestletNodeSelected: function (d) {
            var $ctx = this.$ctx,
                self = this;
            //hide all and show lvl-0

            if (self.level != d.level) {
                self.level = d.level;
                $('.lvl').slideUp();
                $('.lvl-' + d.level).slideDown();
            }

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
        init_features: function () {
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