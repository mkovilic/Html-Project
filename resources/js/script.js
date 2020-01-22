$(document).ready(function() {
     /*sticky nav*/ 
    $('.js--section-features').waypoint(function(direction){
        if (direction == "down"){
        $('nav').addClass('sticky');
        }
        else {
        $('nav').removeClass('sticky');
        }
    }, {
        offset: '60px;'
    }); 
    /*scrolling */

    $('.js--scroll-to-plans').click(function(){
        $('html, body').animate({scrollTop:$('.js--section-plans').offset().top}, 1000)
    });
    $('.js--scroll-to-start').click(function(){
        $('html, body').animate({scrollTop:$('.js--section-features').offset().top}, 1000)
    });



  });
    /* navigation scroll */

  /*  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
        && 
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            };
          });
        }
      }
    });  */
    /*animations on scroll */
    $('.js--wp-1').waypoint(function(direction){
        $('.js--wp-1').addClass('animated fadeIn');
    }, {offset: '50%;'});
    $('.js--wp-2').waypoint(function(direction){
        $('.js--wp-2').addClass('animated fadeInUp');
    }, {offset: '50%;'});
    $('.js--wp-3').waypoint(function(direction){
        $('.js--wp-3').addClass('animated fadeIn');
    }, {offset: '50%;'});
    $('.js--wp-4').waypoint(function(direction){
        $('.js--wp-4').addClass('animated pulse');
    }, {offset: '50%;'});
    /*mobile nav */
    $('.js--nav-icon').click(function(){
        var nav = $('.js--main-nav');
        var icon= $('.js--nav-icon i');
        nav.slideToggle(200);/*0.2s */
        if(icon.hasClass('ion-navicon-round'))
        {
            icon.addClass('ion-close-round');
            icon.removeClass('ion-navicon-round');
        }
        else{
            icon.addClass('ion-navicon-round');
            icon.removeClass('ion-close-round');
        }

    });


    // smooth scroll
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();
    
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });


    // nav > order
    $("a#order.navbar-link").click(function(){
        $('html').addClass('lb-disable-scrolling');
        $('div#shcart').fadeIn();


        
        if (receivedJSON == null) {
            document.querySelector('div#loading p#loadingText').innerHTML = 'Učitavanje...';
            $.getJSON("http://www.fulek.com/VUA/SUPIT/GetCategoriesAndFoods", function(result){
                receivedJSON = result;
                // document.querySelector('div#shcart > div.stupacParent > div.Child:first-child').innerHTML = getOffersHTML(result);
                $('div#shcart > div.Parent > div.Child:first-child').append(getOffersHTML(result));
                $('div#dynOfferDiv').fadeOut(10);
                $('div#loading').fadeOut(800, function() {
                    $('div#dynOfferDiv').fadeIn(800);
                });
                // break;
            }).fail(function() {
                document.querySelector('div#loading p#loadingText').innerHTML = 'Pogreška... Pokušajte ponovno.';
                });
        }

       
});
