var APD = {};
(function ($) {
    /**
     * Apidoc Feature Browser
     *
     * @author Veith Zäch
     * @namespace Tc.Module
     * @class Browse
     * @extends Tc.Module
     */
    Tc.Module.Titlebar = Tc.Module.extend({

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


            $($ctx).on('click', 'button[name=duplicate]' ,function () {
                self.duplicateRestlet();
            });

            $($ctx).on('click','button[name=newversion]',function () {
                alert('not implemented yet');
            });
            $($ctx).on('click','button[name=build]',function () {
                self.buildSource();
            });

            $('.content', $ctx).on('mouseover', function () {
                $('.buttons', $ctx).show();
            });

        },
        onShowDoc:function (data) {
            var self = this;
            var $ctx = self.$ctx;
            $.ajax({
                url:'/rest/com.zuizz.apidoc.view.full/' + data.restlet + '.json',
                type:'GET',
                cache:false,
                success:function (response) {
                    self.restlet = data.restlet;
                    self.rsttitle = response.title;
                    APD = response;
                    console.dir(APD);
                    $('DIV.content', $ctx).html(self.handlebar.block(response));
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

            this._initmoustache();
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
        moustache:{},
        handlebar:{},
        _initmoustache:function () {
            // moustaches und Handlebars aufbauen
            var $ctx = this.$ctx,
                self = this;
            $('script', $ctx).each(function (i, e) {
                var moustache = $(e);
                var name = moustache.attr('name');
                self.moustache[name] = moustache.html();
                self.handlebar[name] = Handlebars.compile((moustache.html()));
            });


        },
        duplicateRestlet:function(){
            var self = this;
            var $ctx = self.$ctx;
            $('#duplicateRESTlet').modal('show');
            $('#duplicateRESTlet [name=f130source]').val(self.restlet);
            $('#duplicateRESTlet [name=f130title]').val(self.rsttitle);
            $('#duplicateRESTlet span[name=source]').html(self.restlet);
        },
        buildSource:function(){
            var self = this;
            var $ctx = self.$ctx;
            $.ajax({
                url:'/rest/com.zuizz.apidoc.restlet.sources/' + self.restlet + '.json',
                type:'POST',
                data:{
                    language:'php'    //string
                },

                statusCode:{
                    201:function(response){
                        //Sourcecode is created
                       console.dir(response);

                    },
                    400:function(response){
                        //Sourcecode is created
                       alert(response.responseText);

                    }
                }
            });
        }
    });
})(Tc.$);