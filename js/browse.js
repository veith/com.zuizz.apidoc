(function ($) {
    /**
     * Apidoc Feature Browser
     *
     * @author Veith Zäch
     * @namespace Tc.Module
     * @class Browse
     * @extends Tc.Module
     */
    Tc.Module.Browse = Tc.Module.extend({

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

            // Features übersicht initial laden
            $.ajax({
                url:'/rest/com.zuizz.apidoc.list.feature/.html',
                type:'GET',
                data:{

                    f0order:0 //numeric
                },

                statusCode:{
                    200:function (response) {
                        // assign content in response body to div
                        $('#APDtabNav').html(response);
                        $(".collapse",$ctx).collapse("hide");
                        $(".accordion-toggle",$ctx).on('click',function(){
                            var container = $($(this).attr('href'));
                            if(!container.hasClass('in')){
                            self.loadSub(container);
                            }else{
                                container.collapse('hide');
                            }

                            return false;
                        });

                    }
                }
            });




            // Sidebar Browse
            $('.restlet',$ctx).on('click', function () {
                this.fire('ShowDoc', [$(this).data('id')],'viewer');
            });



        },   loadSub:function(container){
            var $ctx = this.$ctx,
                self = this;
                var feature = container.data('feature');

            $.ajax({
                url:'/rest/com.zuizz.apidoc.list.feature/' +  feature + '.html',
                type:'GET',
                data:{

                    f0order:0 //numeric
                },

                statusCode:{
                    200:function (response) {
                        // assign content in response body to div
                        $('div.accordion-inner',container).eq(0).html(response);
                        $(".collapse",container).collapse('hide');
                        container.collapse('show');
                        container.css('height','');


                        // Sidebar Browse
                        $('.restlet',container).on('click', function () {

                            self.fire('showDoc',$(this).data(),['viewer'] );
                        });

                        $(".accordion-toggle",container).on('click',function(){
                            var container = $($(this).attr('href'));

                            if(!container.hasClass('in')){
                                self.loadSub(container);
                            }else{
                                container.collapse('hide');
                            }
                            return false;
                        });

                    }
                }
            });
        }   ,

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
        onFavoriteReload:function(){
            $.ajax({
                url:'/rest/com.zuizz.apidoc.favorites.list/.html',
                type:'GET',
                cache:false,
                success:function (response) {
                    // Inhalt einspielen
                    $('#APDtabFav').html(response);

                }
            });
        }
    });
})(Tc.$);