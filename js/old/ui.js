$(document).ready(function () {


})
;

// Event Listener
// Modal Link
$('#modal_link').click(function () {
    $('#dialog-message').dialog('open');
    return false;
});


// RESTful Logout
$('#APDlogout').click(function () {

    $.ajax({
                url:'/rest/com.zuizz.auth.terminate/',
                type:'GET',
                cache:false,
                success:function (response) {
                    window.location.href = '/';
                }
            });

});

// Sidebar History
$('#APDtabLast div.well').live('click', function () {
    $.publish('ShowDoc', [$(this).data('id')]);
});

// Sidebar Favoriten
$('#APDtabFav div.well').live('click', function () {
    $.publish('ShowDoc', [$(this).data('id')]);
})


// Event Subscriber
// Inhalt zeigen
$.subscribe('ShowDoc', function (apidocID) {

    if (apidocID > 0) {
        // Mainview
        // Aktuellen Tab ermitteln
        var tab = $('#APDTab > li.active > a').attr('id');

        $.ajax({
            url:'/rest/com.zuizz.apidoc.view.full/' + apidocID + '.html',
            type:'GET',
            cache:false,
            success:function (response) {
                // Inhalt einspielen
                $('#APDcontent').html(response);
                // aktuellen tab aktivieren
                $('#APDtcGeneral').tab('show');
                $('#' + tab)    .tab('show');
            }
        });

        // history
        $.ajax({
            url:'/rest/com.zuizz.apidoc.last/' + apidocID + '.json',
            type:'GET',
            cache:false,
            statusCode:{200:function () {
                // Liste last seen aktualisieren
                $.ajax({
                    url:'/rest/com.zuizz.apidoc.last.list/' + apidocID + '.html',
                    type:'GET',
                    cache:false,
                    success:function (response) {
                        // Inhalt einspielen
                        $('#APDtabLast').html(response);

                    }
                });
            }
            }
        });


    }
})


// aktuelles element wird in apidoc abgelegt / kopiert
var apidoc = {};
var methods = ["GET", "HEA", "PUT", "DEL", "POS", "OPT", "TRA", "CON"];