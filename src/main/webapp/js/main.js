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

jQuery(document).ready(function() {
  var pageTitle = document.title; //HTML page title
  var pageUrl = location.href; //Location of the page
    
  //user hovers on the share button 
  jQuery("#share-wrapper li").hover(function() {
    var hoverEl = $(this); //get element
    
    //browsers with width > 699 get button slide effect
    if($(window).width() > 699) { 
      if (hoverEl.hasClass('visible')){
        hoverEl.animate({"margin-left":"-110px"}, "fast").removeClass('visible');
      } else {
        hoverEl.animate({"margin-left":"0px"}, "fast").addClass('visible');
      }
    }
  });
  
  //user clicks on a share button
  jQuery(".button-wrap").click(function(event) {
      var shareName = $(this).attr('class').split(' ')[0]; //get the first class name of clicked element
      
      switch (shareName) //switch to different links based on different social name
      {
        case 'facebook':
          var openLink = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(pageUrl) + '&amp;t=' + encodeURIComponent(pageTitle);
          break;
        case 'twitter':
          var openLink = 'http://twitter.com/home?status=' + encodeURIComponent(pageTitle + ' ' + pageUrl);
          break;
        case 'google':
          var openLink = 'https://plus.google.com/share?url=' + encodeURIComponent(pageUrl) + '&amp;title=' + encodeURIComponent(pageTitle);
          break;
      }
    
    //Parameters for the Popup window
    winWidth  = 650;  
    winHeight = 450;
    winLeft     = ($(window).width()  - winWidth)  / 2,
    winTop      = ($(window).height() - winHeight) / 2, 
    winOptions   = 'width='  + winWidth  + ',height=' + winHeight + ',top='    + winTop    + ',left='   + winLeft;
    
    //open Popup window and redirect user to share website.
    window.open(openLink,'Share This Page',winOptions);
    return false;
  });
});