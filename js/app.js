$(document).ready(function() {
  const mobileNav = "<svg width='16px' height='14px' viewBox='0 0 16 14' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><!-- Generator: Sketch 49.3 (51167) - http://www.bohemiancoding.com/sketch --><desc>Created with Sketch.</desc><defs></defs><g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g id='Home-(smartphone)' transform='translate(-24.000000, -30.000000)' fill='#373F4F'><path d='M25,42 L39,42 C39.5522847,42 40,42.4477153 40,43 C40,43.5522847 39.5522847,44 39,44 L25,44 C24.4477153,44 24,43.5522847 24,43 C24,42.4477153 24.4477153,42 25,42 Z M25,36 L39,36 C39.5522847,36 40,36.4477153 40,37 C40,37.5522847 39.5522847,38 39,38 L25,38 C24.4477153,38 24,37.5522847 24,37 C24,36.4477153 24.4477153,36 25,36 Z M25,30 L39,30 C39.5522847,30 40,30.4477153 40,31 C40,31.5522847 39.5522847,32 39,32 L25,32 C24.4477153,32 24,31.5522847 24,31 C24,30.4477153 24.4477153,30 25,30 Z' id='Combined-Shape'></path></g></g></svg>";
  const mobileNavExpand = "<svg width='14px' height='14px' viewBox='0 0 14 14' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><!-- Generator: Sketch 49.3 (51167) - http://www.bohemiancoding.com/sketch --><desc>Created with Sketch.</desc><defs></defs><g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g id='Mobile-Menu-(smartphone)' transform='translate(-25.000000, -30.000000)' fill='#373F4F' fill-rule='nonzero'><path d='M38.7437076,31.4937748 C39.0854224,31.1520616 39.085432,30.5980253 38.7437292,30.2563002 C38.4020264,29.914575 37.8480071,29.9145654 37.5062924,30.2562786 L32,35.7625469 L26.4937076,30.2562786 C26.1519929,29.9145654 25.5979736,29.914575 25.2562708,30.2563002 C24.914568,30.5980253 24.9145776,31.1520616 25.2562924,31.4937748 L30.7625416,37 L25.2562924,42.5062252 C24.9145776,42.8479384 24.914568,43.4019747 25.2562708,43.7436998 C25.5979736,44.085425 26.1519929,44.0854346 26.4937076,43.7437214 L32,38.2374531 L37.5062924,43.7437214 C37.8480071,44.0854346 38.4020264,44.085425 38.7437292,43.7436998 C39.085432,43.4019747 39.0854224,42.8479384 38.7437076,42.5062252 L33.2374584,37 L38.7437076,31.4937748 Z' id='Combined-Shape'></path></g></g></svg>";

  $(".mobile-toggle").append(mobileNav);
  let scrollPosition = 0;

  navIsExpanded = false;
  $(".mobile-toggle").click(function() {
    if (!navIsExpanded) {
      expandNav();
    } else {
      collapseNav();
    }
  });

  function expandNav() {
    scrollPosition = $("html").scrollTop();
    $(".mobilenav-footer").addClass("mobile-nav-footer-isNav");
    $(".mobile-toggle").empty();
    $(".mobile-toggle").append(mobileNavExpand);
    $('.header-content').removeClass('logo-area-fixed');
    $(".main-content").css("display", "none");
    $(".copycolumn hr").css("display", "none");
    $(".login-signup-area").fadeIn(100);
    $("html").scrollTop(0);
    navIsExpanded = true;
  }

  function collapseNav() {
    $(".mobile-toggle").empty();
    $(".mobilenav-footer").removeClass("mobile-nav-footer-isNav");
    $(".mobile-toggle").append(mobileNav);
    $(".main-content").css("display", "block");
    $(".login-signup-area").css("display", "none");
    $(".copycolumn hr").css("display", "block");
    $('html, body').animate({
      scrollTop: scrollPosition
    }, 300);
    navIsExpanded = false;
    console.log("collapseNav")
  }



  // Screen sizes/Resizes:

  let largescreen = false;

  $(window).on('resize', () => {
    if ($(window).width() > 768) {
      largeScreenSize();
    } else {
      smallScreen();
    }
  });

  if ($(window).width() > 768) {
    largeScreenSize();
  } else {
    smallScreen();
  }

  function largeScreenSize() {
    if (!largescreen) {
      if (navIsExpanded) {
        collapseNav();
      }
      $(".mobile-toggle").css("display", "none");
      $(".mobile-signup-area").css("display", "flex");
      //whatever happens on large screen size here
      largescreen = true;
    }
  }
  // /largeScreenSize()

  function smallScreen() {
    console.log("smallScreen");
    if (largescreen) {
      $(".mobile-toggle").css("display", "block");
      //whatever happens on small screen size here
      largescreen = false;
    }
  }
  // /smallScreen()


  //SCROLLY HEADER:

  const mainHeaderHeight = $('header').outerHeight();
  let headerDropped = false;
  let didScroll = false;
  $(window).scroll(function() {
    didScroll = true;
  });

  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    //After scrolling 100px from the top...
    if ($(window).scrollTop() >= (mainHeaderHeight / 2)) {
      stickyHeader();
    }

    if ($(window).scrollTop() <= (mainHeaderHeight / 3) && headerDropped) {
      fixedHeader();
    }

    function fixedHeader() {
      if (!navIsExpanded) {
        $('.header-content').fadeOut("fast", function() {
          $('.header-content').removeClass('logo-area-fixed');
          $('.header-content').fadeIn("10");
        });
        console.log(headerDropped);
      }
      headerDropped = false;
    }
  }

  function stickyHeader() {
    if (!headerDropped && !navIsExpanded) {
      $('.header-content').css("display", "none");
      $('.header-content').fadeIn("150", function() {
        $('.header-content').addClass('logo-area-fixed');
        headerDropped = true;
      });
      console.log(headerDropped);
    }
  }




});
// /$(document).ready();
