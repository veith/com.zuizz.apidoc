(function ($) {
    /**
     * Apidoc Feature Browser
     *
     * @author Veith Zäch
     * @namespace Tc.Module
     * @class Browse
     * @extends Tc.Module
     */
    Tc.Module.CreateRestlet = Tc.Module.extend({

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

            $($ctx).on('click', 'a[name=add]', function () {

                self.addRestlet();
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
        addRestlet:function () {
            var $ctx = this.$ctx,
                self = this;

            // neues Restlet erstellen

            // Prüfen ob alle Felder die benötigt sind ausgefüllt wurden
            var error = false;
            // Titel
            var title = $('[name=title]',$ctx);
            if (title.val() == '') {
                $(title).parents("div.control-group").addClass('error');
                error = true;
            } else {
                $(title).parents("div.control-group").removeClass('error');
            }

            // Element sub
            var element = $('[name=element]',$ctx);
            if (element.val() == '') {
                $(element).parents("div.control-group").addClass('error');
                error = true;
            } else {
                $(element).parents("div.control-group").removeClass('error');
            }


            if (!error) {

                // Daten an Server Senden
                $.ajax({
                    url:'/rest/com.zuizz.apidoc.restlet/',
                    type:'POST',
                    data:{
                        'title':title.val(),
                        'method':$('[name=method]',$ctx).val(),
                        'newfeature':$('[name=feature]',$ctx).val(),
                        'element':element.val(),
                        'source':$('[name=source]',$ctx).val()
                    },

                    statusCode:{
                        201:function (response) {
                            //Created, OK, Restlett sucessfull added
                            // Wenn alles OK ist....
                            // Restlet Laden; showDoc Publishen
                            self.fire('ShowDoc', response,['viewer']);
                            // Modalmaske schliessen
                            $('#addRESTlet').modal('hide');
                            $('#duplicateRESTlet').modal('hide');
                        },
                        400:function (response) {
                            //Bad, RESTlet already exists
                            alert(response.responseText)
                        },
                        500:function (response) {
                            //Server Error, Something went wrong
                            alert(response.responseText);
                        }
                    }
                });


            }
        }

    });
})(Tc.$);






