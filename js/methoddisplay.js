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

            self.rest.stateheaders = new Tc.zu.rest('/api/0/com.zuizz.apidoc/states/');
            self.rest.stateheaders.list({200:function(r){
                self.stateheaders = r;

            }})

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


        },render: function (data) {
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
            self.parameters = data.parameters;
            self.mimetypes = data.mimetypes;
            self.states = data.states;
            self.permissions = data.permissions;
            this.renderParameters(self, $ctx, self.parameters);
            this.renderMimetypes(self, $ctx, self.mimetypes);
            this.renderStates(self, $ctx, self.states);
            this.renderPermissions(self, $ctx, self.permissions);

            $('#display .mod').hide();
            $ctx.show();
        },

        renderParameters: function (self, $ctx, parameters) {
            // parameter with dot and bind
            self.bind.param = {};
            $('.parameterlist', $ctx).html('');
            for (index in parameters) {
                var pdata = parameters[index];
                $('.parameterlist', $ctx).append(self.dot.parameters(pdata));
                self.bind.param[index] = new Tc.zu.bind($ctx, 'P' + index, pdata);
                self.bind.param[index].onChange = function (k, v) {
                    var name = this.attributes.name;
                    $('.p' + name, $ctx).removeClass('well-inverse').addClass('well-danger');
                    $('.tcb-saveParameters', $ctx).show();

                    if (k == 'type') {
                        if (v == 5) {
                            // show regexp
                            $('.rex-' + name, $ctx).show();
                        } else {
                            $('.rex-' + name, $ctx).hide();
                        }
                    }

                };


                self.bind.param['newParameter'] = new Tc.zu.bind($ctx, 'newParameter', true);
                // read form

                self.bind.param['newParameter'].onChange = function (k, v) {
                    var name = this.attributes.name;
                    $('.newParameter', $ctx).removeClass('well-inverse').addClass('well-danger');


                    if (k == 'type') {
                        if (v == 5) {
                            // show regexp
                            $('.rex-newParameter', $ctx).show();
                        } else {
                            $('.rex-newParameter', $ctx).hide();
                        }
                    }

                };
            }
        }, 
        renderMimetypes: function (self, $ctx, mimetypes) {
            // mimetype with dot and bind
            self.bind.mimetypes = {};
            $('.mimetypelist', $ctx).html('');
            for (index in mimetypes) {
                var pdata = mimetypes[index];
                $('.mimetypelist', $ctx).append(self.dot.mimetypes(pdata));
                self.bind.mimetypes[index] = new Tc.zu.bind($ctx, 'M' + index, pdata);
                self.bind.mimetypes[index].onChange = function (k, v) {
                    var name = this.attributes.name;
                    $('.p' + name, $ctx).removeClass('well-inverse').addClass('well-danger');
                    $('.tcb-saveMimetypes', $ctx).show();

                };


                self.bind.mimetypes['newMimetype'] = new Tc.zu.bind($ctx, 'newMimetype', true);
                // read form

                self.bind.mimetypes['newMimetype'].onChange = function (k, v) {
                    var name = this.attributes.name;
                    $('.newMimetype', $ctx).removeClass('well-inverse').addClass('well-danger');

                };
            }
        }, renderStates: function (self, $ctx, states) {
            // state with dot and bind
            self.bind.states = {};
            $('.statelist', $ctx).html('');
            for (index in states) {
                var pdata = states[index];
                $('.statelist', $ctx).append(self.dot.states(pdata));
                self.bind.states[index] = new Tc.zu.bind($ctx, 'S' + index, pdata);
                self.bind.states[index].onChange = function (k, v) {
                    var name = this.attributes.code;
                    $('.p' + name, $ctx).removeClass('well-inverse').addClass('well-danger');
                    $('.tcb-saveStates', $ctx).show();
                };


                self.bind.states['newState'] = new Tc.zu.bind($ctx, 'newState', true);
                // read form

                self.bind.states['newState'].onChange = function (k, v) {
                    var name = this.attributes.code;
                    $('.newState', $ctx).removeClass('well-inverse').addClass('well-danger');

                };
                self.bind.states['newState'].fields['code'] = {'onChange':function(k,v){

                    self.bind.states['newState'].set('message',self.stateheaders[v]);
                }};

            }
        }, renderPermissions: function (self, $ctx, permissions) {
            // permission with dot and bind
            self.bind.permissions = {};
            $('.permissionlist', $ctx).html('');
            for (index in permissions) {
                var pdata = permissions[index];

                $('.permissionlist', $ctx).append(self.dot.permissions(pdata));

                self.bind.permissions[index] = new Tc.zu.bind($ctx, 'PM' + index, pdata);

                self.bind.permissions[index].onChange = function (k, v) {
                    var name = this.attributes.role;

                    $('.p' + name, $ctx).removeClass('well-inverse').addClass('well-danger');
                    $('.tcb-savePermissions', $ctx).show();

                };


                self.bind.permissions['newPermission'] = new Tc.zu.bind($ctx, 'newPermission', true);
                // read form

                self.bind.permissions['newPermission'].onChange = function (k, v) {
                    var name = this.attributes.role;
                    $('.newPermission', $ctx).removeClass('well-inverse').addClass('well-danger');

                };
            }
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
            var rst = new Tc.zu.rest(self.method.href + '.' + self.bind.info.get('version') + '/parameters/');
            rst.destroy($(btn).data('parameter'),
             {202: function () {
               delete(self.parameters[$(btn).data('parameter')]);
                self.renderParameters(self, $ctx, self.parameters);
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
        'tcb-addParameter': function (btn) {
            var $ctx = this.$ctx,
                self = this;

            var rst = new Tc.zu.rest(self.method.href + '.' + self.bind.info.get('version') + '/parameters/');
            // the parameter name is the "id"
            rst.Id = self.bind.param['newParameter'].get('name');
            rst.set(self.bind.param['newParameter'].modified_attributes);

            rst.save({202: function (r) {
                $('.newParameter', $ctx).addClass('well-inverse').removeClass('well-danger');
                $('.parameterlist', $ctx).append(self.dot.parameters(r));

                self.parameters[r.name] = r;
                self.renderParameters(self, $ctx, self.parameters);
            }});


        },
        'tcb-deletePermission': function (btn) {
            var $ctx = this.$ctx,
                self = this;
            var rst = new Tc.zu.rest(self.method.href + '.' + self.bind.info.get('version') + '/permissions/');
            rst.destroy($(btn).data('permission'),
             {202: function () {
               delete(self.permissions[$(btn).data('permission')]);
                self.renderPermissions(self, $ctx, self.permissions);
            }});

        },
        'tcb-savePermissions': function (btn) {
            var $ctx = this.$ctx,
                self = this;
            var rst = new Tc.zu.rest(self.method.href + '.' + self.bind.info.get('version') + '/permissions/');
            // find and loop updated permissions
            $.each(self.bind.permissions, function (permission, data) {

                if (data.hasChanges) {
                    rst.Id = permission;

                    rst.set(data.modified_attributes);
                    // the permission name is the "id"

                    rst.save({202: function (r) {
                        $('.p' + permission, $ctx).addClass('well-inverse').removeClass('well-danger');


                    }});

                }
            });
            $('.tcb-savePermissions', $ctx).hide();
        },
        'tcb-addPermission': function (btn) {
            var $ctx = this.$ctx,
                self = this;

            var rst = new Tc.zu.rest(self.method.href + '.' + self.bind.info.get('version') + '/permissions/');
            // the permission name is the "id"
            rst.Id = self.bind.permissions['newPermission'].get('role');
            rst.set(self.bind.permissions['newPermission'].modified_attributes);

            rst.save({202: function (r) {
                $('.newPermission', $ctx).addClass('well-inverse').removeClass('well-danger');
                $('.permissionlist', $ctx).append(self.dot.permissions(r));

                self.permissions[r.name] = r;
                self.renderPermissions(self, $ctx, self.permissions);
            }});


        },
        'tcb-deleteState': function (btn) {
            var $ctx = this.$ctx,
                self = this;
            var rst = new Tc.zu.rest(self.method.href + '.' + self.bind.info.get('version') + '/states/');
            rst.destroy($(btn).data('state'),
             {202: function () {
               delete(self.states[$(btn).data('state')]);
                self.renderStates(self, $ctx, self.states);
            }});

        },
        'tcb-saveStates': function (btn) {
            var $ctx = this.$ctx,
                self = this;
            var rst = new Tc.zu.rest(self.method.href + '.' + self.bind.info.get('version') + '/states/');
            // find and loop updated states

            $.each(self.bind.states, function (state, data) {

                if (data.hasChanges) {
                    rst.Id = state;

                    rst.set(data.modified_attributes);
                    // the state name is the "id"

                    rst.save({202: function (r) {
                        $('.p' + state, $ctx).addClass('well-inverse').removeClass('well-danger');


                    }});

                }
            });
            $('.tcb-saveStates', $ctx).hide();
        },
        'tcb-addState': function (btn) {
            var $ctx = this.$ctx,
                self = this;

            var rst = new Tc.zu.rest(self.method.href + '.' + self.bind.info.get('version') + '/states/');
            // the state name is the "id"
            rst.Id = self.bind.states['newState'].get('code');
            rst.set(self.bind.states['newState'].modified_attributes);

            rst.save({202: function (r) {
                $('.newState', $ctx).addClass('well-inverse').removeClass('well-danger');
                $('.statelist', $ctx).append(self.dot.states(r));

                self.states[r.code] = r;
                self.renderStates(self, $ctx, self.states);
            }});


        },
        'tcb-deleteMimetype': function (btn) {
            var $ctx = this.$ctx,
                self = this;
            var rst = new Tc.zu.rest(self.method.href + '.' + self.bind.info.get('version') + '/mimetypes/');
            rst.destroy($(btn).data('mimetype'),
             {202: function () {
               delete(self.mimetypes[$(btn).data('mimetype')]);
                self.renderMimetypes(self, $ctx, self.mimetypes);
            }});

        },
        'tcb-saveMimetypes': function (btn) {
            var $ctx = this.$ctx,
                self = this;
            var rst = new Tc.zu.rest(self.method.href + '.' + self.bind.info.get('version') + '/mimetypes/');
            // find and loop updated mimetypes
            $.each(self.bind.mimetypes, function (mimetype, data) {

                if (data.hasChanges) {
                    rst.Id = mimetype;

                    rst.set(data.modified_attributes);
                    // the mimetype name is the "id"

                    rst.save({202: function (r) {
                        $('.p' + mimetype, $ctx).addClass('well-inverse').removeClass('well-danger');


                    }});

                }
            });
            $('.tcb-saveMimetypes', $ctx).hide();
        },
        'tcb-addMimetype': function (btn) {
            var $ctx = this.$ctx,
                self = this;

            var rst = new Tc.zu.rest(self.method.href + '.' + self.bind.info.get('version') + '/mimetypes/');
            // the mimetype name is the "id"
            rst.Id = self.bind.mimetypes['newMimetype'].get('name');
            rst.set(self.bind.mimetypes['newMimetype'].modified_attributes);

            rst.save({202: function (r) {
                $('.newMimetype', $ctx).addClass('well-inverse').removeClass('well-danger');
                $('.mimetypelist', $ctx).append(self.dot.mimetypes(r));

                self.mimetypes[r.name] = r;
                self.renderMimetypes(self, $ctx, self.mimetypes);
            }});


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


        }
    });
})(Tc.$);