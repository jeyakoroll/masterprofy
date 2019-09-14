// MAIN SCRIPT
$(document).ready(function() {
  // PRELOADER
  const preloader = () => {
    const preloader = document.querySelector('#preloader');
    preloader.style.opacity = '0';
    preloader.setAttribute('aria-busy', 'false');
    document.querySelector('#site').style.opacity = '1';
  };
  window.onload = preloader;
  // MUSTACHE TEMPLATE
  // PHONE
  let dataPhone = { phonetitle: 'Мы вам перезвоним!' };
  let tmplPhone = $('#forPhone').html();

  Mustache.parse(tmplPhone);
  let renderPhone = Mustache.render(tmplPhone, dataPhone);

  $('#body').append(renderPhone);
  // MENU
  let dataMenu = {
    menutext: [
      { text: 'О компании', path: '/masterprofy/' },
      { text: 'Каталог', path: '/masterprofy/catalog' },
      { text: 'Наши работы', path: '/masterprofy/raboty' },
      { text: 'Контакты', path: '/masterprofy/contacty' },
      { text: 'Партнеры', path: '/masterprofy/partnery' }
    ]
  };
  let tmplMenu = $('#forMenu').html();

  Mustache.parse(tmplMenu);
  let renderMenu = Mustache.render(tmplMenu, dataMenu);

  $('#body').append(renderMenu);

  // MASK for FORM
  $('.phone-mask').mask('(999) 999-9999');
  $('#rc-phone-input').mask('(999) 999-9999');
  // SEND DATA
  // MAIN FORM
  let pathname = window.location.pathname;
  let urlPath =
    pathname === '/masterprofy/'
      ? 'form.php'
      : pathname === '/masterprofy/catalog/' ||
        pathname === '/masterprofy/raboty/' ||
        pathname === '/masterprofy/partnery/' ||
        pathname === '/masterprofy/catalog/'
      ? '../form.php'
      : pathname === '/masterprofy/catalog/kirpich/' ||
        pathname === '/masterprofy/catalog/instrumenty/' ||
        pathname === '/masterprofy/catalog/smesi/'
      ? '../../form.php'
      : pathname === '/masterprofy/catalog/kirpich/licevoy/' ||
        pathname === '/masterprofy/catalog/kirpich/riadovoy/'
      ? '../../../form.php'
      : null;

  // console.log("относительно корня", window.location.pathname);
  // console.log("url to form.php", urlPath);

  $('#mainForm').on('submit', function(e) {
    let fd = new FormData(document.forms.person);

    fd.append('CustomField', 'This is some extra data');

    $.ajax({
      url: 'form.php',
      type: 'POST',
      data: fd,
      processData: false, // tell jQuery not to process the data
      contentType: false, // tell jQuery not to set contentType
      success: function(data) {
        console.log(data);
      }
    });
    // clear data in form
    nameInput.value = '';
    phoneInput.value = '';
    e.preventDefault();
  });
  // BUTTON PHONE
  $('.orderForm').on('submit', function(e) {
    var fd = new FormData(document.querySelector('.orderForm'));
    const phoneInput = document.getElementById('rc-phone-input');
    fd.append('CustomField', 'This is some extra data');

    $.ajax({
      url: urlPath,
      type: 'POST',
      data: fd,
      processData: false, // tell jQuery not to process the data
      contentType: false, // tell jQuery not to set contentType
      success: function(data) {
        console.log(data);
      }
    });
    phoneInput.value = '';
    e.preventDefault();
  });

  // sandwich menu
  $(function() {
    $('.menu-link').click(function(e) {
      e.preventDefault();
      $('.menu').toggleClass('open');
      $('.menu-overlay').toggleClass('open');
    });
    // $(".menu-overlay").click(function(e) {
    //   e.preventDefault();
    //   if ($(e.target).is(".menu-overlay") && !$(e.target).is(".menu-overlay a"))
    //     $(".menu").removeClass("open");
    //   $(".menu-overlay").removeClass("open");
    // });
  });

  // popup
  //open popup
  $('.cd-popup-trigger').on('click', function(e) {
    e.preventDefault();
    $('.cd-popup').addClass('is-visible');
  });

  //close popup
  $('.cd-popup').on('click', function(e) {
    if ($(e.target).is('.popup__close-wrap') || $(e.target).is('.cd-popup')) {
      e.preventDefault();
      $(this).removeClass('is-visible');
    }
  });
  //close popup when clicking the esc keyboard button
  $(document).keyup(function(e) {
    if (e.which == '27') {
      $('.cd-popup').removeClass('is-visible');
      $('.menu').removeClass('open');
      $('.menu-overlay').removeClass('open');
    }
  });

  // появление через время после захода на страницу
  setTimeout(function() {
    if ($(window).width() > 480) {
      $('#rc-phone-form')
        .animate({ width: '605%' })
        .removeClass('closed');
    } else {
      $('#rc-phone-form')
        .animate({ width: '455%' })
        .removeClass('closed');
    }
    $('#rc-phone-form-close').removeClass('closed');
    $('#rc-phone-icon').removeClass('fa-phone');
    $('#rc-phone-icon').addClass('fa-times');
  }, 11000);

  $('#rc-phone-icon').click(function() {
    if ($(this).hasClass('fa-times')) {
      $(this).removeClass('fa-times');
      $(this).addClass('fa-phone');
      $('#rc-phone-form').animate({ width: '50px' });
      setTimeout(function() {
        $('#rc-phone-form').addClass('closed');
      }, 600);
    }
  });
  $('#rc-phone-form').click(function() {
    if ($(this).hasClass('closed')) {
      $('#rc-phone-icon').removeClass('fa-phone');
      $('#rc-phone-icon').addClass('fa-times');
      if ($(window).width() > 480) {
        $('#rc-phone-form')
          .animate({ width: '605%' })
          .removeClass('closed');
      } else {
        $('#rc-phone-form')
          .animate({ width: '455%' })
          .removeClass('closed');
      }
      setTimeout(function() {
        $('#rc-phone-form').addClass('opened');
      }, 600);
    }
  });

  // go top
  $('.go-top_link').on('click', showTop);

  function showTop(e) {
    e.preventDefault();
    toTop($(this).data('top'), true);
  }

  function toTop(section, isAnimate) {
    let reqSection = $('.main').filter('[data-section="' + section + '"]'),
      reqSectionPos = reqSection.offset().top;

    if (isAnimate) {
      $('body, html').animate({ scrollTop: reqSectionPos }, 350);
    }
  }

  // slider
  let url = null,
    owl = $('.slider__wrap'),
    bgDrop = $('.bg-drop'),
    prev = $('#left'),
    next = $('#right');

  owl.owlCarousel({
    center: true,
    loop: true,
    items: 2,
    navigation: true,
    stagePadding: 20,
    margin: 0,
    responsive: {
      0: {
        items: 1,
        stagePadding: 20,
        margin: 10
      },
      640: {
        margin: 0,
        items: 1.4
      },
      1024: {
        margin: 0,
        items: 1.8
      }
    }
  });

  owl.on('changed.owl.carousel', function() {
    setTimeout(function() {
      let centerImg = owl.find('.center').find('div'),
        url = centerImg.css('background-image');
      console.log('url: ', url);
      bgDrop.css('background-image', url);
    }, 20);
  });

  next.on('click', function() {
    owl.trigger('next.owl.carousel');
  });
  $(document).on('keyup', function(e) {
    if (e.keyCode === 39) owl.trigger('next.owl.carousel');
  });
  prev.on('click', function() {
    owl.trigger('prev.owl.carousel');
  });
  $(document).on('keyup', function(e) {
    if (e.keyCode === 37) owl.trigger('prev.owl.carousel');
  });

  // instruments gallery
  $('#instruments-home').owlCarousel({
    loop: true,
    margin: 200,
    items: 1,
    center: true,
    dots: true,
    nav: true,
    autoWidth: true,
    navigation: true,
    navContainer: '.instruments__home',
    responsiveClass: true
  });
  $('#instruments-hybrid').owlCarousel({
    loop: true,
    margin: 200,
    items: 1,
    center: true,
    dots: true,
    nav: true,
    autoWidth: true,
    navigation: true,
    navContainer: '.instruments__hybrid',
    responsiveClass: true
  });
  $('#instruments-motor').owlCarousel({
    loop: true,
    margin: 200,
    items: 1,
    center: true,
    dots: true,
    nav: true,
    autoWidth: true,
    navigation: true,
    navContainer: '.instruments__motor',
    responsiveClass: true
  });
  $('#instruments-comp').owlCarousel({
    loop: true,
    margin: 200,
    items: 1,
    center: true,
    dots: true,
    nav: true,
    autoWidth: true,
    navigation: true,
    navContainer: '.instruments__comp',
    responsiveClass: true
  });

  // gallery in reviews area
  $('#colors-gallery').owlCarousel({
    animateOut: 'slideOutDown',
    animateIn: 'flipInX',
    loop: true,
    responsiveClass: true,
    nav: true,
    autoplay: false,
    autoplayTimeout: 4000,
    autoWidth: true,
    navContainer: '.colors__navs',
    responsive: {
      0: {
        items: 1,
        margin: 50,
        center: true,
        nav: false,
        dots: true
      },
      480: {
        margin: 200,
        items: 1,
        center: true,
        dots: false,
        nav: true,
        autoWidth: true
      },
      768: {
        margin: 200,
        items: 2,
        center: true,
        dots: false,
        nav: true,
        autoWidth: true
      },
      992: {
        loop: false,
        margin: 60,
        items: 3,
        center: false,
        dots: false,
        autoWidth: false
      }
    }
  });

  // fancybox
  // $('[data-fancybox="ang"]').fancybox({
  //   loop: true
  // });
});
