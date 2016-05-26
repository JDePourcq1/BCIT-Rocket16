/**
 * course.js
 *   Course select functions
 */
 /*
 $('#score').click(function() {
    $('#output').html(function(i, val) { return val*1+5 });
});

function myfunction(){
    var number = parseInt($('#output').text().trim(),10);
    if( number > 7){
        $("#test").html("<p>unlocking right</p>");
        $('#triangle-right').prop("disabled",false);
    }
}
*/

function disable(){
    $('#triangle-right').prop("disabled",true);
} 

function unlock(){
    $('#triangle-right').prop("disabled",false);
}