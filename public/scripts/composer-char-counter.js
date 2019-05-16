// $(document).ready( function() {
//     let selector = $("textarea"); 
//     selector.bind("keyup", function() {
       
//     const maxCount = 140;
//     let countdown = maxCount - this.value.length;
//     let form = $('textarea').closest('form');
//     let counter = form.find('.counter');
//     let numbers = counter.text(countdown);
//        if (countdown < 0) {
//           $('.counter').css("color", "red");
//        }
//        else {
//         $('.counter').css("color", "black");
//        }
//     }) 
//     // count.selector(maxCount - countdown); 
//   });


$(document).ready( function() {
    const selector = $("textarea"); 
    selector.bind("keyup", function() {
        const maxCount = 140;
        const countdown = maxCount - this.value.length;
        
        $('textarea').closest('form').find('.counter').text(countdown);

        if (countdown < 0) {
            $('.counter').css("color", "red");
        }
        else {
            $('.counter').css("color", "black");
        }
    }) 
  });