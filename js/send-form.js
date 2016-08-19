$("form").submit(processForm);

function processForm (event) {
  event.preventDefault();
  
  var $form = $("form");
  var url = $form.attr("action");
  
  
  $("#loading_overlay").css("visibility", "visible");
  overlayPadding();
  $("i.fa.fa-refresh.fa-fixed").toggleClass("animate");
  $("#submit_button").prop("disabled", true);
  
  $.ajax({
    type: "POST",
    url: url,
    data: $form.serialize(),
    dataType: "json",
    success: successDisplay,
    error: errorDisplay
  });
}

function successDisplay(result) {
  $("#overlay_background").css("height", $("#form_container").height());
  $("#form_container").animate({
    height: 0
  }, 500, "swing", function() {
    $("#form_container").html("<h2 id=\"success_message\">Your message was sent successfully!</h2>");
    $("#form_container").css("height", "auto");
    var containerHeight = $("#form_container").height();
    $("#form_container").css("height", 0);
    $("#form_container").animate({
      height: containerHeight
    }, 250, "swing");
  });
}

function errorDisplay(jqXHR, textStatus, errorThrown) {
  $("#loading_overlay").css("visibility", "hidden");
  $("i.fa.fa-refresh.fa-fixed").toggleClass("animate");
  $("#submit_button").prop("disabled", false);
  
  var errorHTMLString = "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\">\n<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
  for(i = 0; i < jqXHR.responseJSON.length; i++) {
    errorHTMLString += "<li>" + jqXHR.responseJSON[i] + "</li>";
  }
  errorHTMLString += "</div>";
    
  $("#form_container").prepend(errorHTMLString);
  
  $("form").submit(processForm);
}

function overlayPadding() {
  if($("#loading_overlay").css("visibility") == "visible") {
    padding = ($("#loading_overlay").outerHeight() * 0.3) - ($("i.fa.fa-refresh.fa-fixed").height() / 2);
    $("#loading_overlay").css("padding-top", padding);
  }
}

$(window).resize(overlayPadding);
      
$(document).ready(overlayPadding);