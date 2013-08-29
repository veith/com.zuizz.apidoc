
/*
 *  Automatischer aufbau der Suche und beim Auswählen eines Eintrages ([Tab] oder [Enter]) den Event ShowDoc abfeuern mit der Apidoc ID
 *
 */

    var autocomplete = $('#searchinput').typeahead({items:20})

        .on('keyup', function (ev) {

            ev.stopPropagation();
            ev.preventDefault();
            var apidocID = 0;

            // catch enter and tab to publish id
            switch (ev.keyCode) {
                case 9: case 13: // tab und enter
                    apidocID = $(this).data('typeahead').indexarr[$(this).data('typeahead').$menu.find('.active').index()];
                    break
            }
            if(apidocID != 0){
                $.publish('ShowDoc',[apidocID]);
            }

            //filter out up/down, tab, enter, and escape keys
            if ($.inArray(ev.keyCode, [40, 38, 9, 13, 27]) === -1) {

                var self = $(this);

                //set typeahead source to empty
                self.data('typeahead').source = [];


                //active used so we aren't triggering duplicate keyup events
                if (!self.data('active') && self.val().length > 1) {

                    self.data('active', true);
                    var method = $('#method');
                    var method = $('#method');
                    $.ajax({
                        url:'/rest/com.zuizz.apidoc.list.ac/0.json',
                        dataType:'json',
                        data:{f130request:$(this).val(),f130items:20,f130method:method.val()},
                        success:function (response) {
                            //set this to true when your callback executes
                            self.data('active', true);
                            self.data('response', response);

                            //Filter out your own parameters. Populate them into an array, since this is what typeahead's source requires
                            var arr = [], indexarr = [],
                                i = response.results.length;
                            while (i--) {
                                arr[i] = response.results[i].request ;
                                indexarr[i] = response.results[i].id;
                            }
                            //set your results into the typehead's source
                            self.data('typeahead').source = arr;
                            self.data('typeahead').indexarr = indexarr;

                            //trigger keyup on the typeahead to make it search
                            self.trigger('keyup');

                            //All done, set to false to prepare for the next remote query.
                            self.data('active', false);

                        }
                    });


                }
            }
        });

    $('.typeahead').on('click',function(){
       var apidocID = autocomplete.data('typeahead').indexarr[autocomplete.data('typeahead').$menu.find('.active').index()];
        if(apidocID != 0){
                        $.publish('ShowDoc',[apidocID]);
                    }
    });




