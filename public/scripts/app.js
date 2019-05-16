const data = [
  {
    user: {
      name: "Newton",
      avatars: {
        small: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        regular: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        large: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      handle: "@SirIsaac"
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants"
    },
    created_at: 1461116232227
  },
  {
    user: {
      name: "Descartes",
      avatars: {
        small: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        regular: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        large: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      handle: "@rd"
    },
    content: {
      text: "Je pense , donc je suis"
    },
    created_at: 1461113959088
  },
  {
    user: {
      name: "Johann von Goethe",
      avatars: {
        small: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        regular: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        large: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      handle: "@johann49"
    },
    content: {
      text: "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    created_at: 1461113796368
  },
  {
    user: {
      name: "Johann von Goethe",
      avatars: {
        small: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        regular: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        large: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      handle: "@johann49"
    },
    content: {
      text: "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    created_at: 1461113796368
  },
  {
    user: {
      name: "Johann von Goethe",
      avatars: {
        small: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        regular: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        large: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      handle: "@johann49"
    },
    content: {
      text: "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    created_at: 1461113796368
  }
];

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
    $('textarea').select();
  });
  
    $("form").on("submit", function(event) {
    event.preventDefault();
    const formData = $(this).serialize().split('=')[1];
  
    if (formData.length === 0) {
      $(".error").slideDown().text('Error: not enough characters');
    } else if (formData.length > 140) {
      $(".error").slideDown().text("Error: this exceeds the maximum character count");
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
        $('textarea').val('');
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

  // loadTweets()

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

    const $footer = $("<footer>").text(`10 days ago`);

    $article.append($footer);

    return $article;
  };

  renderTweets(data);
});
