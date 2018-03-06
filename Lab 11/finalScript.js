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
    addResultTitles(jsondata);
  });
}

function addResultTitles(jsondata) {
  //create a string to contain our html code to inject

  var htmlstring = "";
  //iterate over the collection resultsbox
  for (var i=0; i <10; i++){
    var title = jsondata.Search[i].Title;
    htmlstring += "<li>" + title + "</li>";
  }

  $('#resultsbox').html(htmlstring);
}
