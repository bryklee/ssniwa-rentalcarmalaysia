var scrollToTop = "scroll-to-top";

jQuery(window).scroll(function(){
  var scrOfX = 0, scrOfY = 0;
  if (typeof (window.pageYOffset) == "number") {
      //Netscape compliant
      scrOfY = window.pageYOffset;
      scrOfX = window.pageXOffset;
  } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
      //DOM compliant
      scrOfY = document.body.scrollTop;
      scrOfX = document.body.scrollLeft;
  } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
      //IE6 standards compliant mode
      scrOfY = document.documentElement.scrollTop;
      scrOfX = document.documentElement.scrollLeft;
  }

  var pos = scrOfY; //window.pageYOffset;
  if (pos >= 620) {
    jQuery("#" + scrollToTop).fadeIn(150); 
  } 
  else { 
    jQuery("#" + scrollToTop).fadeOut(150); 
  }
});

jQuery("#" + scrollToTop).click(function(){
  jQuery("body,html").animate({scrollTop: 0}, 500);
});