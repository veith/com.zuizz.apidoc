// tab content nur ein mal laden
var APDtabNavLoaded = false;



// Sidebar Browse
$('.apidocitem').live('click', function () {
    $.publish('ShowDoc', [$(this).data('id')]);
})



$('#sidenavtab a[data-toggle="tab"]').on('show', function (e) {

// für #APDtabNav
    if (e.target.hash == '#APDtabNav') {
        if (APDtabNavLoaded == false) {
            $.ajax({
                url:'/rest/com.zuizz.apidoc.list.all/.html',
                type:'GET',
                data:{

                    f0order:0 //numeric
                },

                statusCode:{
                    200:function (response) {
                        // assign content in response body to div
                        $('#APDtabNav').html(response);
                        $("#acc .accordion-body").collapse('hide');

                        APDtabNavLoaded = true;
                    }
                }
            });
        }
    }

})
