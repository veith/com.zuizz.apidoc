(function ($) {
    /**
     * Apidoc Feature Browser
     *
     * @author Veith Zäch
     * @namespace Tc.Module
     * @class Browse
     * @extends Tc.Module
     */
    Tc.Module.Viewer = Tc.Module.extend({

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
            self.tab = $('#APDTab > li.active > a').attr('id');

            // General Tab
            // wenn sich der inhalt ändert, save button zeigen
            $($ctx).on('change', '#APDtabGeneral', function () {
                $('button[name=edGeneral]', $ctx).show();

            });

            // button speichern auslösen
            $($ctx).on('click', 'button[name=edGeneral]', function () {
                self.saveGeneralTab();
            });

            $($ctx).on('click', 'a[name=saveParam]', function () {
                self.saveParameterTab($(this).data('param'));
                return false;
            });

            $($ctx).on('click', 'a[name=saveMime]', function () {
                self.saveMimetypeTab($(this).data('param'));
                return false;
            });       
            
            $($ctx).on('click', 'a[name=saveState]', function () {
                self.saveStateTab($(this).data('param'));
                return false;
            });        
            
            $($ctx).on('click', 'a[name=saveRole]', function () {
                self.saveRoleTab($(this).data('param'));
                return false;
            });


        },
        onShowDoc:function (data) {
            var self = this;
            self.node = data;
            self.tab = $('#APDTab > li.active > a').attr('id');
            $.ajax({
                url:'/rest/com.zuizz.apidoc.view.full/' + data.restlet + '.html',
                type:'GET',
                cache:false,
                success:function (response) {
                    // Inhalt einspielen
                    $('#APDcontent').html(response);
                    // aktuellen tab aktivieren
                    $('#APDtcGeneral').tab('show');
                    $('#' + self.tab).tab('show');
                }
            });

        },

        /**
         * Hook function to do all of your module stuff.
         *
         * @method on
         * @param {Function} callback function
         * @return void
         */
        on:function (callback) {
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
        after:function () {

        },
        // inhalt vom Tab general speichern
        saveGeneralTab:function () {
            var $ctx = this.$ctx,
                self = this;
            $.ajax({
                url:'/rest/com.zuizz.apidoc.restlet.general/' + APD.request + '.json',
                type:'PUT',
                data:{

                    f130description:$('#APDtabGeneral form [name=description]').val(), //string
                    f130method:APD.method, //string
                    f130version:APD.version, //numeric
                    f130title:$('#APDtabGeneral form [name=title]').val() //string
                },

                statusCode:{
                    200:function (response) {
                        //OK, Restlett sucessfull added

                        self.fire('ShowDoc', self.node);
                        self.onShowDoc(self.node);
                    }
                }
            });
        },
        // inhalt vom Tab Parameter speichern
        saveParameterTab:function (key) {
            var $ctx = this.$ctx,
                self = this;
            var content = $('#APDtabParameter [name=param' + key + ']').serializeArray();
            $.ajax({
                url:'/rest/com.zuizz.apidoc.restlet.parameter/' + APD.request + '.json',
                type:'PUT',
                data:{
                    f130method:APD.method, //string
                    f130version:APD.version, //numeric
                    f130data:content //string
                },

                statusCode:{
                    200:function (response) {
                        //OK, Restlett sucessfull added
                        self.onShowDoc(self.node);

                    }
                }
            });
        },
        // inhalt vom Tab Mimetype speichern
        saveMimetypeTab:function (key) {
            var $ctx = this.$ctx,
                self = this;
            var content = $('#APDtabMimetypes [name=mime' + key + ']').serializeArray();

            $.ajax({
                url:'/rest/com.zuizz.apidoc.restlet.mimetype/' + APD.request + '.json',
                type:'PUT',
                data:{
                    f130method:APD.method, //string
                    f130version:APD.version, //numeric
                    f130data:content //string
                },

                statusCode:{
                    200:function (response) {
                        //OK, Restlett sucessfull added
                        self.onShowDoc(self.node);

                    }
                }
            });
        }, // inhalt vom Tab Role speichern
        saveRoleTab:function (key) {
            var $ctx = this.$ctx,
                self = this;
            var content = $('#APDtabPermission [name=role' + key + ']').serializeArray();

            $.ajax({
                url:'/rest/com.zuizz.apidoc.restlet.role/' + APD.request + '.json',
                type:'PUT',
                data:{
                    f130method:APD.method, //string
                    f130version:APD.version, //numeric
                    f130data:content //string
                },

                statusCode:{
                    200:function (response) {
                        //OK, Restlett sucessfull added
                        self.onShowDoc(self.node);

                    }
                }
            });
        },
        // inhalt vom Tab State speichern
        saveStateTab:function (key) {
            var $ctx = this.$ctx,
                self = this;
            var content = $('#APDtabStates [name=state' + key + ']').serializeArray();

            $.ajax({
                url:'/rest/com.zuizz.apidoc.restlet.state/' + APD.request + '.json',
                type:'PUT',
                data:{
                    f130method:APD.method, //string
                    f130version:APD.version, //numeric
                    f130data:content //string
                },

                statusCode:{
                    200:function (response) {
                        //OK, Restlett sucessfull added
                        self.onShowDoc(self.node);
                    }
                }
            });
        }
    });
})(Tc.$);