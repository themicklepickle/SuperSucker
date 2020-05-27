function inViewPort (elem) {
        //First get the scroll y position (how far the user scrolled down)
        var scrollY = document.body.scrollTop;
        //Now get the height of the viewport
        var screenH=document.body.clientHeight;
        //Also get the y position of the element
        var yPos=elem.offsetTop;
        //And now calculate the maximal y position for elem when it is still visible
        var maxY=scrollY+screenH;

        if (yPos>scrollY && yPos<maxY) {
          //It is in the users viewport
          return true;
        } else {
          //It isn't in the users viewport
          return false;
        }
      }

      function checkStart (videoName) {
        var elem = document.getElementById(videoName);
        if (inViewPort(elem)) {
          elem.load();
          elem.play();
        } else if (!elem.ended) {
          setTimeout("checkStart('"+videoName+"');", 100);
        }
      }

//FUNCTION TO GET AND AUTO PLAY YOUTUBE VIDEO FROM DATATAG
function autoPlayYouTubeModal(){
  var trigger = $("body").find('[data-toggle="modal"]');
  trigger.click(function() {
    var theModal = $(this).data( "target" ),
    videoSRC = $(this).attr( "data-thevideo" ),
    videoSRCauto = videoSRC+"?autoplay=1" ;
    $(theModal+' iframe').attr('src', videoSRCauto);
    $(theModal+' button.close').click(function () {
        $(theModal+' iframe').attr('src', videoSRC);
    });
  });
}

$(document).ready(function(){
  autoPlayYouTubeModal();
});

function sendForm() {

  // PRINT FEEDBACK TO CONSOLE TASKS (This slide)
  var serializedFormValues =   $("#feedbackForm").serialize();
  console.log("My serialized form", serializedFormValues);

  $('.error').remove(); // removes any previously added errors.
  var errorMessages = '';
  var nameValue = $('[name="name"]').val();
  var trimmedName = $.trim(nameValue);

  var emailValue = $('[name="email"]').val();
  var trimmedEmail = $.trim(emailValue);

  var textValue = $('[name="text"]').val();
  var trimmedText = $.trim(textValue);

  if (trimmedName === '') {
    errorMessages = errorMessages + '<p class="error">Name is required</>'
  }

  if (trimmedEmail === '') {
    errorMessages = errorMessages + '<p class="error">Email is required</>'
  }

  if (trimmedText === '') {
    errorMessages = errorMessages + '<p class="error">Feedback message is required</>'
  }

  if (errorMessages !== '') {
      $("#feedbackForm").prepend(errorMessages);
  } else {

    $.post('/feedback', serializedFormValues, function() {
      // Do stuffs after we get all good response
      console.log("Sent successfully!");
      // HIDE AND SHOW ELEMENTS TASKS (Previously)
      $('#feedback').children().hide();

      var $formTitle = $('#feedback2');
      $formTitle.fadeIn(500);
      $formTitle.text('Thank you for your feedback.');
    });
  }
};