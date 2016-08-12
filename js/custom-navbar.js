var bars = $(".icon-bar");
var menuButton = $("button.navbar-toggle");
menuButton.click(function(){
  bars.each(function(index, element) {
    $(this).toggleClass("animating");
  });
});
bars.each(function(index, element) {
  $(this).on("transitionend", function(event){
  if($(this).hasClass("animating")) {
    $(this).toggleClass("animating");
  }
});
});

var navBar = $("#header-navbar li");
navBar.click(function() {
  if(!$(this).hasClass("dropdown") && $("#site_navbar").hasClass("collapse") && $("#site_navbar").hasClass("in")) {
    $("button.navbar-toggle").click();
  }
});

$(document).ready(function() {
  var url = window.location.href;
  $(".navbar-nav>li").each(function(index, element) {
    var $child = $(element).children("a");
    if ($child[0].href == url || ($child.attr("href") == "#" && url.includes("projects"))) {
      $(element).addClass("active");
      var linkText = $child.html();
      var newText = linkText + "<span class=\"sr-only\">(current)</span>";
      $child.html(newText);
      return false;
    }
  });
});