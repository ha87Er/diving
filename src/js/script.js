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

  // overflowとheightのスタイルを削除する
  $("body").removeAttr("style");
});



//メインビジュアル　スライダー
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

//キャンペーン　スライダー
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


// topへ戻る
jQuery('a[href^="#"]').on("click", function (e) {
  e.preventDefault();
  const speed = 300;
  const id = jQuery(this).attr("href");
  const target = jQuery("#" == id ? "html" : id);
  const position = jQuery(target).offset().top;
  jQuery("html, body").animate(
    {
      scrollTop: position,
    },
    speed,
    "linear"
  );
});

jQuery(window).on("scroll", function () {
  if (100 < jQuery(window).scrollTop()) {
    jQuery("#js-pagetop").addClass("is-show");
  } else {
    jQuery("#js-pagetop").removeClass("is-show");
  }

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

//inviewメソッド
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
          $(".loading__title-wrap").css("z-index", 2002);
          $(".loading__title, .loading__sub-title").fadeIn(500).css("color", "#fff");
      }, 1000); // タイミングを遅らせる
  });

  // .loading__cover-right読み込み後に発火
  $(".loading__cover-right").on("animationend", function() {
    $(".loading__title, .loading__sub-title").fadeOut(500);
  });

  // ページが読み込まれてから3秒後にloadingを非表示にする
  setTimeout(function() {
      $("#loading").fadeOut(2000);
  }, 3000);
});



});

