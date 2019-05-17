const url = "/tweets";

$(document).ready(function() {
  $(".new-tweet").hide();

  function renderTweets(dataArray) {
    for (const el of dataArray) {
      const $tweet = createArticle(el);
      $("#oldTweets").prepend($tweet);
    }
  }

  $("button").on("click", function(event) {
    $(".new-tweet").toggle();
    $("textarea").select();
  });

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
      $(".error").slideUp();
      $("textarea").val("");
      $(".counter").html(140);
    }
  });

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

  const createArticle = data => {
    // Creating the article tag
    const $article = $("<article>");

    // Create header tag
    const $header = $("<header>");

    // Creating the h2
    const $image = $("<img>").attr("src", data["user"]["avatars"].small);
    const $name = $("<h2>").text(data["user"].name);
    const $handle = $("<p>").text(data["user"].handle);

    // adding the h2 to the header
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

    $article.append($footer);

    return $article;
  };

  loadTweets();
});
