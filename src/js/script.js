jQuery(function ($) {
// ドロワー表示
$(".js-hamburger").on("click", function (e) {
  e.preventDefault();
  $(".js-hamburger").toggleClass("is-active");
  $(".js-header").toggleClass("is-open");
  $(".js-drawer").toggleClass("is-active");
  $("body").toggleClass("is-active"); // bodyにis-activeクラスの追加/削除をトグル

  if ($("body").hasClass("is-active")) {
    // bodyにis-activeクラスがある場合はoverflowをhiddenにし、heightを100%に設定する
    $("body").css({
      overflow: "hidden",
      height: "100%"
    });
  } else {
    // bodyにis-activeクラスがない場合はoverflowとheightのスタイルを削除する
    $("body").removeAttr("style");
  }
});

// spナビクリックしたらドロワーが閉じる
$(".js-drawer a[href^='#']").on("click", function (e) {
  $(".js-hamburger").removeClass("is-active");
  $(".js-drawer").removeClass("is-active");
  $(".js-header").removeClass("is-open");
  $("body").removeClass("is-active");

  // overflowとheightのスタイルを削除する
  $("body").removeAttr("style");
});

// ドロワーメニュー内の閉じるボタンをクリックしたらドロワーを閉じる
$(".js-drawer-close").on("click", function (e) {
  e.preventDefault();
  $(".js-hamburger").removeClass("is-active");
  $(".js-drawer").removeClass("is-active");
  $("body").removeClass("is-active");
  $("body").removeAttr("style"); // overflowとheightのスタイルを削除する
});

//メインビジュアル スライダー
const mainVisualSwiper = new Swiper('.js-mv-swiper', {
    loop: true,
    effect: 'fade',  
    speed: 2500, // ループの時間
    allowTouchMove: false, // スワイプ無効
    autoplay: {
        delay: 500, // 途切れなくループ
        disableOnInteraction: false, // 自動再生を止めない
    },

  });

//キャンペーン スライダー
const campaignSwiper = new Swiper(".js-campaign-swiper", {
    slidesPerView: 'auto', //スライドの枚数を自動調節
    allowTouchMove: true, // スワイプ有効
    grabCursor: true, //スライドをつかむ仕草
    loop: true, //ループを有効にする

    // Navigation arrows
    navigation: {
      nextEl: ".js-campaign-next",
      prevEl: ".js-campaign-prev",
    }
  });


// // topへ戻る
// jQuery('a[href^="#"]').on("click", function (e) {
//   e.preventDefault();
//   const speed = 300;
//   const id = jQuery(this).attr("href");
//   const target = jQuery("#" == id ? "html" : id);
//   const position = jQuery(target).offset().top;
//   jQuery("html, body").animate(
//     {
//       scrollTop: position,
//     },
//     speed,
//     "linear"
//   );
// });

//スムーズスクロール
$(function () {
  var pageHash = window.location.hash;
  if (pageHash) {
    var scrollToElement = $('[data-id="' + pageHash + '"]');
    if (!scrollToElement.length) return;
    $(window).on('load', function () {
      history.replaceState('', '', './');
      var locationOffset = scrollToElement.offset().top;
      var navigationBarHeight = $('.header').innerHeight();
      locationOffset = locationOffset - navigationBarHeight - 65;
      $('html, body').animate({
        scrollTop: locationOffset
      }, 300, 'swing');
    });
  }
});
$(function () {
  $('a[href*="#"]').on('click', function () {
    var scrollSpeed = 400;
    var navigationHeight = $(".header").innerHeight();
    var scrollToTarget = $(this.hash === '#' || this.hash === '' ? 'html' : this.hash);
    if (!scrollToTarget.length) return;
    var scrollPosition = scrollToTarget.offset().top - navigationHeight - 105;
    $('html, body').animate({
      scrollTop: scrollPosition
    }, scrollSpeed, 'swing');
    return false;
  });
});

jQuery(window).on("scroll", function () {
  if (100 < jQuery(window).scrollTop()) {
    jQuery("#js-pagetop").addClass("is-show");
  } else {
    jQuery("#js-pagetop").removeClass("is-show");
  }
});


jQuery(window).on("scroll", function () {
  var point = $(window).scrollTop();
  var docHeight = $(document.body).height();
  var dispHeight = $(window).height();
  var footer = $('.footer').innerHeight(); // footerの高さを取得

  if (point > docHeight - dispHeight - footer) {
    jQuery("#js-pagetop").addClass("is-hidden");
  } else {
    jQuery("#js-pagetop").removeClass("is-hidden");
  }
});


//画像の上のアニメーション
$('.inview').css({ 'opacity':'0'}); 
$('.inview').on('inview', function() {
  $(this).animate({'opacity':'1'},2000,'easeOutCirc'); 
});

//要素の取得とスピードの設定
var box = $('.colorbox'),
    speed = 700;
 
//.colorboxの付いた全ての要素に対して下記の処理を行う
box.each(function(){
    $(this).append('<div class="color"></div>')
    var color = $(this).find($('.color')),
    image = $(this).find('img');
    var counter = 0;
 
    image.css('opacity','0');
    color.css('width','0%');
    //inviewを使って背景色が画面に現れたら処理をする
    color.on('inview', function(){
        if(counter == 0){
        $(this).delay(200).animate({'width':'100%'},speed,function(){
                   image.css('opacity','1');
                   $(this).css({'left':'0' , 'right':'auto'});
                   $(this).animate({'width':'0%'},speed);
                })
            counter = 1;
          }
     });
});

//ローディングアニメーション
$(document).ready(function() {
  // ページが読み込まれてから0.3秒後にクラスを追加
  setTimeout(function() {
      $(".loading__cover-left, .loading__cover-right").addClass("is-active");
  }, 300);

  // .loading__cover-left読み込み後に発火
  $(".loading__cover-left").on("animationend", function() {
      // タイミングを遅らせてタイトルとサブタイトルを表示し、白色に変更
      setTimeout(function() {
          $(".loading__title").css("z-index", 2002);
          $(".main-title__title, .main-title__sub-title").fadeIn(500).css("color", "#fff");
      }, 1000); // タイミングを遅らせる
  });

  // .loading__cover-right読み込み後に発火
  $(".loading__cover-right").on("animationend", function() {
    $(".main-title__title, .main-title__sub-title").fadeOut;
  });

  // ページが読み込まれてから3秒後にloadingを非表示にする
  setTimeout(function() {
      $("#loading").fadeOut(2000);
  }, 3000);
});


//モーダルウィンドウ
$('.gallery img').click(function() {
  // クリックされた画像の外側のHTMLを取得
  var imageContainerHTML = $(this).parent().html();

  // クリックされた画像のアスペクト比を取得
  var aspectRatio = $(this).css('aspect-ratio');
  
  // モーダル内の画像を表示する要素を取得
  var modalImageContainer = $('.gallery__modal .modal__img');
  
  // モーダル内の画像にクリックされた画像の外側のHTMLを設定
  modalImageContainer.html(imageContainerHTML);

  // モーダル内の画像にアスペクト比を設定
  modalImageContainer.find('img').css('aspect-ratio', aspectRatio);

  // モーダルを表示
  $('.modal').css('display', 'block');

  // bodyにoverflow: hidden;を設定
  $('body').css('overflow', 'hidden');
});

$('.modal').click(function() {
  // モーダルを非表示にする
  $(this).css('display', 'none');
  
  // bodyからoverflow: hidden;を解除する
  $('body').css('overflow', 'auto');
});


//tableスタイルの切り替え
$(document).ready(function() {
  function adjustColspan() {
    if ($(window).width() > 600) {
      $('th.table__title').attr('rowspan', '10').removeAttr('colspan');
    } else {
      $('th.table__title').attr('colspan', '2').removeAttr('rowspan');
    }
  }

  // 初回実行
  adjustColspan();

  // ウィンドウリサイズ時に実行
  $(window).resize(function() {
    adjustColspan();
  });
});

//FAQ
jQuery(".js-accordion").on("click", function (e) {
  e.preventDefault();

  if (jQuery(this).parent().hasClass("is-open")) {
    jQuery(this).parent().removeClass("is-open");
    jQuery(this).next().slideUp();
  } else {
    jQuery(this).parent().addClass("is-open");
    jQuery(this).next().slideDown();
  }
});

//日付のスライド
jQuery(document).ready(function() {
  // 最初の要素を開いた状態にする
  jQuery(".archive__year:first").parent().addClass("is-open");
  jQuery(".archive__year:first").next().slideDown();

  // クリックしたときの処理
  jQuery(".archive__year").on("click", function (e) {
    e.preventDefault();

    if (jQuery(this).parent().hasClass("is-open")) {
      jQuery(this).parent().removeClass("is-open");
      jQuery(this).next().slideUp();
    } else {
      jQuery(this).parent().addClass("is-open");
      jQuery(this).next().slideDown();
    }
  });
});

//パラメーターの設定
$(function() {
  // パラメータ取得
  function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
 
  // ページ読み込み時のタブ切り替え
  let tabPram = ['ALL', 'tab1', 'tab2', 'tab3'];
  let pram = getParam('active-tab');
  if (pram && $.inArray(pram, tabPram) !== -1) {
    $('.js-tab-cts,.js-tab-switch').removeClass('is-active');
    $('[data-tab="' + pram + '"]').addClass('is-active');
    if (pram === 'ALL') { // pram が ALL の場合は全てのカードを表示
      $('.js-tab-cts').addClass('is-active').show(); // .show() を追加して要素を表示する
    }
  }
 
// ロード後のタブ切り替え
$('.js-tab-switch').on('click', function() {
  let dataPram = $(this).data('tab');
  if ($(this).hasClass('is-active')) { // クリックされたタブがすでにアクティブな場合
    $('.js-tab-cts').removeClass('is-active').hide(); // カードを非表示にしてアクティブな状態を解除
    $(this).removeClass('is-active'); // クリックされたタブからアクティブな状態を解除
  } else {
    $('.js-tab-cts,.js-tab-switch').removeClass('is-active');
    $('[data-tab="' + dataPram + '"]').addClass('is-active');
  }
});

  // "ALL" ボタンがクリックされたときの処理
  $('[data-tab="ALL"]').on('click', function() {
    $('.js-tab-cts').addClass('is-active').show(); // すべてのカードを表示
  });
});


});


