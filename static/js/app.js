/* ==========================================================================
   comment-docs-test
   ========================================================================== */

var html = $();
var families = {};
$.getJSON("/static/css/main.json", function(json) {
   var data = json;
   $.each(json, function(index, item){
       if ( item.docs.family !== undefined ) {
           if ( families[item.docs.family] === undefined ) {
               families[item.docs.family] = [];
               var $button = $('<button class="nav_btn"></button>');
               $button.text(item.docs.family);
               $button.data('family-key', item.docs.family);
               $button.data('index', index);
               $button.on('focus', function(){
                   var key = $(this).data('family-key');
                   var index = $(this).data('index');
                   $('#code').empty();
                   $('#markup').empty();
                   $.each(families[key], function(index, item){
                       var componentName = item.docs.name;
                       $('#code').append($('<div>').text(item.code).html());
                       $.each(item.docs.patterns, function(index, item){
                           if ( item.markup !== undefined ) {
                              var $component = $('<div class="component"></div>');
                               $component.append('<h1 class="component_name">'+componentName+': '+item.name+'</h1>');
                               $component.append('<div class="component_rendered">'+item.markup+'</div>');
                               $component.append('<pre class="component_markup"><code id="pattern-markup" class="language-markup">'+$('<div>').text(item.markup).html()+'</code></pre>');
                               $('#markup').append( $component );
                           }
                       });
                       // console.log(item);
                       Prism.highlightAll();
                   });
                   console.log('=============');
               });
               html = html.add($('<li class="nav_item">').append($button));
               families[item.docs.family].push(item);
           } else {
               families[item.docs.family].push(item);
           }
       }
   });
   $('#nav').append(html);
   $('#nav').find('.nav_btn').first().trigger('focus');
});
