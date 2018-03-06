$(function(){
  //document ready
  //alert("document ready");

  var TMDBkey = "58a54ae83bf16e590e2ef91a25247707";

  $('#searchform').submit(function() {
    //get current value and add to items list
    var searchterms = $("#searchterms").val();
    //call our search youtube function
    // getResultsFromOMDB(searchterms);
    getResultsFromTMDB(searchterms);
    return false;
  });
});

$(document).ready(function () {
    $("#submit").click(function (e) {
        var validate = Validate();
        $("#message").html(validate);
        if (validate.length == 0) {
            CallAPI(1);
        }
    });
    function CallAPI(page) {
        $.ajax({
            url: "https://api.themoviedb.org/3/search/movie?&query=" + $("#searchInput").val() + "&page=" + page + "&include_adult=false",
            data: { "api_key": "58a54ae83bf16e590e2ef91a25247707" },
            dataType: "json",
            success: function (result, status, xhr) {
                var resultHtml = $("<div class=\"resultDiv\"><p>Movies</p>");
                for (i = 0; i < result["results"].length; i++) {

                    var image = result["results"][i]["poster_path"] == null ? "Image/no-image.png" : "https://image.tmdb.org/t/p/w500/" + result["results"][i]["poster_path"];

                    resultHtml.append("<div class=\"result\" resourceId=\"" + result["results"][i]["title"] + "\">" + "<img src=\"" + image + "\" />" + "<p><a>" + result["results"][i]["title"] + "</a></p></div>")
                }

                resultHtml.append("</div>");
                $("#message").html(resultHtml);

                Paging(result["total_pages"]);
            },
            error: function (xhr, status, error) {
                $("#message").html("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
            }
        });
    }

    function Validate() {
        var errorMessage = "";
        if ($("#searchInput").val() == "") {
            errorMessage += "Please Enter Search Text";
        }
        return errorMessage;
    }

    function Paging(totalPage) {
        var obj = $("#pagination").twbsPagination({
            totalPages: totalPage,
            visiblePages: 5,
            onPageClick: function (event, page) {
                CallAPI(page);
            }
        });
    }
    $(document).ajaxStart(function () {
        $(".imageDiv img").show();
    });

    $(document).ajaxStop(function () {
        $(".imageDiv img").hide();
    });
});



// function getResultsFromOMDB(searchterms) {
//   //call youtube api using ajax
//   //build url for request
//   var url = "http://www.omdbapi.com/?i=tt3896198&apikey=473dd41b&s=" + searchterms;
//   //use jquery json shortcut
//   $.getJSON(url, function(jsondata) {
//     //handle the resultsbox
//     addResultTitles(jsondata);
//   });
// }

// function addResultTitles(jsondata) {
//   //create a string to contain our html code to inject
//
//   var htmlstring = "";
//   //iterate over the collection resultsbox
//   for (var i=0; i <10; i++){
//     var title = jsondata.Search[i].Title;
//     var type = jsondata.Search[i].type;
//     htmlstring += "<li>" + title + " Type: " + type + "</li>";
//   }
//
//   $('#resultsbox').html(htmlstring);
// }
