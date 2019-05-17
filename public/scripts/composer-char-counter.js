// This function is responsible for changing the (word) counter based on the amount
//of text input for each tweet
$(document).ready(function() {
  const selector = $("textarea");
  selector.bind("keyup", function() {
    const maxCount = 140;
    const countdown = maxCount - this.value.length;

    $("textarea")
      .closest("form")
      .find(".counter")
      .text(countdown);

    if (countdown < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }
  });
});
