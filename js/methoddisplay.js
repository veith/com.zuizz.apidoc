(function ($) {
    /**
     * @author Veith Zäch
     * @namespace Tc.Module
     * @class TcTemplate
     * @extends Tc.Module
     */
    Tc.Module.Methoddisplay = Tc.Module.extend({

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
            self.registerEvents();
            self.bind = {};
            self.method = '';


        },

        registerEvents: function () {
            var $ctx = this.$ctx,
                self = this;


        },
        onMethodSelected: function (d) {
            var $ctx = this.$ctx,
                self = this;

            self.method = d;
            self.loadData(self.method);
        },

        loadData: function (method) {
            var $ctx = this.$ctx,
                self = this;

            self.init_method_api(self.method.href);
            self.rest.methods.list({200: function (d) {
                self.render(d);
            }, 405: function (d) {
                alert(d.responseText);
            }})


        },

        render: function (data) {
            var $ctx = this.$ctx,
                self = this;
            //console.dir(data)
            data.method = self.method;


            // General
            var general = {'description': data.description, 'title': data.title, 'request': data.request}
            self.bind.general = new Tc.zu.bind($ctx, 'general', general);
            self.bind.general.onChange = function (k, v) {
                // enable save button
                $('.tcb-saveGeneral', $ctx).show();
            };
            // general info
            self.bind.info = new Tc.zu.bind($ctx, 'info', data.info);

            // parameter with dot and bind
            self.bind.param = {};
            $('.parameterlist', $ctx).html('');
            for (index in data.parameters) {
                var pdata = data.parameters[index];
                $('.parameterlist', $ctx).append(self.dot.parameters(pdata));

                self.bind.param[index] = new Tc.zu.bind($ctx, 'P' + index, pdata);

                self.bind.param[index].onChange = function (k, v) {
                    var name = this.attributes.name;
                    $('.p' + name, $ctx).removeClass('well-inverse').addClass('well-danger');
                    $('.tcb-saveParameters', $ctx).show();

                    if (k == 'type') {
                        if (v == 5) {
                            // show regexp
                            $('.rex-' + name , $ctx).show();
                        }else{
                            $('.rex-' + name , $ctx).hide();
                        }
                    }

                };
            }
            ;


            $('#display .mod').hide();
            $ctx.show();
        },
        'tcb-saveGeneral': function (btn) {
            var $ctx = this.$ctx,
                self = this;

            self.rest.methods.set(self.bind.general.modified_attributes);
            // the version is the "id"
            self.rest.methods.Id = '.' + self.bind.info.get('version');
            self.rest.methods.save({200: function (r) {
                $('.tcb-saveGeneral', $ctx).hide();
            }});


        },
        'tcb-deleteParameter': function (btn) {
            var $ctx = this.$ctx,
                self = this;
            alert($(btn).data('parameter'));
            var rst = new Tc.zu.rest(self.method.href + '.' + self.bind.info.get('version') + '/parameters/');
            rst.destroy($(btn).data('parameter'));
            delete( self.bind.param[$(btn).data('parameter')],{202:function(){
                $(btn).parent().remove();
            }});

        },
        'tcb-saveParameters': function (btn) {
            var $ctx = this.$ctx,
                self = this;

            var rst = new Tc.zu.rest(self.method.href + '.' + self.bind.info.get('version') + '/parameters/');
            // find and loop updated parameters
            $.each(self.bind.param, function (parameter, data) {

                if (data.hasChanges) {
                    rst.Id = parameter;

                    rst.set(data.modified_attributes);
                    // the parameter name is the "id"

                    rst.save({202: function (r) {
                        $('.p' + parameter, $ctx).addClass('well-inverse').removeClass('well-danger');
                    }});

                }
            });
            $('.tcb-saveParameters', $ctx).hide();
        },

        onMethodNodeSelected: function (d) {
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
        init_method_api: function (uri) {
            var $ctx = this.$ctx,
                self = this;
            //bind to ressource methods
            self.rest.methods = new Tc.zu.rest(uri);

            //define fields
            self.rest.methods.defineFields('*');

            //define expands
            self.rest.methods.defineExpands('*');

            //set mimetype
            //mimetype is json per default
        }
    });
})(Tc.$);