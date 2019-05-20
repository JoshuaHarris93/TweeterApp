const url = "/tweets";

// All code within document ready prints to the page

$(document).ready(function() {
  $(".new-tweet").hide();

  function renderTweets(dataArray) {
    for (const el of dataArray) {
      const $tweet = createArticle(el);
      $("#oldTweets").prepend($tweet);
    }
  }

  // Compose button toggles new tweet box on click

  $("button").on("click", function(event) {
    $(".new-tweet").toggle();
    $("textarea").select();
  });

  /* Compose tweet box: Automatically selects text box on click, limits text entry to > 0 or < 140 characters
   (and returns appropriate error if one of those limitations is not met), uses and AJAX POST request to ensure each
   newly created tweet does not reload page upon submit.
*/

  $("form").on("submit", function(event) {
    event.preventDefault();
    const formData = $(this)
      .serialize()
      .split("=")[1];

    if (formData.length === 0) {
      $(".error").text("Error: not enough characters");
      $(".error").slideDown();
    } else if (formData.length > 140) {
      $(".error").text("Error: this exceeds the maximum character count");
      $(".error").slideDown();
    } else {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $(this).serialize()
      })

        .done(response => {
          $("#oldTweets").empty();
          loadTweets(url);
        })
        // Catching an error with the request
        .fail(error => {
          console.log(`Error`, error);
        })
        // This will always execute
        .always(() => {
          console.log("Request completed.");
        });
      $(".error").slideToggle();
      $("textarea").val("");
      $(".counter").html(140);
    }
  });

  // GET request for loading previously created tweets
  function loadTweets() {
    $.ajax({
      method: "GET",
      url: "/tweets"
    })
      .done(tweets => {
        renderTweets(tweets);
      })
      .fail(error => {
        console.log("Error");
      });
  }

  $("#oldTweets").on("mouseenter", "article", function(event) {
    $(this).css("opacity", 1);
    $(this)
      .find(".icons")
      .css("opacity", 1);
    // console.log("mouseenter")
  });

  $("#oldTweets").on("mouseleave", "article", function(event) {
    $(this).css("opacity", 0.5);
    $(this)
      .find(".icons")
      .css("opacity", 0);
    // console.log("mouseleave")
  });

  // Appending new sections, tags, html elements to page using jQuery
  const createArticle = data => {
    // Creating the article tag
    const $article = $("<article>");

    // Create header tag
    const $header = $("<header>");

    // Creating the header
    const $image = $("<img>").attr("src", data["user"]["avatars"].small);
    const $name = $("<h2>").text(data["user"].name);
    const $handle = $("<p>").text(data["user"].handle);

    // appending to the header
    $header.append($image);
    $header.append($name);
    $header.append($handle);

    // adding the header to the article element
    $article.append($header);

    // Creating the div for the content
    const $contentDiv = $("<div>").addClass("content");

    // Creating the UL list
    const $ul = $("<ul>");

    // Creating the first LI element for the species
    const $articleLi = $("<li>").text(data.type);
    const $articleSpan = $("<span>").text(data.content.text);
    $articleLi.prepend($articleSpan);
    $ul.append($articleLi);

    // Adding the UL list to the content div
    $contentDiv.append($ul);

    // Content div is added to the article

    $article.append($contentDiv);
    const $postDate = data.created_at;
    const $footer = $("<footer>").text(moment($postDate).fromNow());
    const $iconDiv = $("<div>").addClass("icons");
    const $flag = $("<i>").addClass("fas fa-flag");
    const $retweet = $("<i>").addClass("fas fa-retweet");
    const $like = $("<i>").addClass("fas fa-heart");

    $article.append($footer);
    $iconDiv
      .append($flag)
      .append($retweet)
      .append($like);
    $footer.append($iconDiv);

    return $article;
  };

  loadTweets();
});
