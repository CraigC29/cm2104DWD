$(function(){
  //document ready
  alert("document ready");

  $('#searchform').submit(function() {
    //get current value and add to items list
    var searchterms = $("#searchterms").val();
    //call our search youtube function
    getResultsFromOMDB(searchterms);
    return false;
  });
});

function getResultsFromOMDB(searchterms) {
  //call youtube api using ajax
  //build url for request
  var url = "http://www.omdbapi.com/?i=tt3896198&apikey=473dd41b&s=" + searchterms;
  //use jquery json shortcut
  $.getJSON(url, function(jsondata) {
    //handle the resultsbox
    printJSON(jsondata);
  });
}

function printJSON(jsondata) {
  //prints json to the screen
  var normal = JSON.stringify(jsondata);
  $('#resultsbox').append("<p>" + normal + "</p>");
}
