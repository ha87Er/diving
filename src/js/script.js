
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる
//ドロワー表示
jQuery(".js-hamburger").on("click", function (e) {
    e.preventDefault();
    jQuery(".js-hamburger").toggleClass("is-active");
    jQuery(".js-drawer").toggleClass("is-active");
  });

//spナビクリックしたらドロワーが閉じる
	jQuery('.js-drawer a[href^="#"]').on("click", function (e) {
    jQuery(".js-hamburger").removeClass("is-active");
    jQuery(".js-drawer").removeClass("is-active");
});

//メインビジュアル　スライダー
const mainVisualSwiper = new Swiper('.js-mv-swiper', {
    loop: true,
    speed: 1500, // ループの時間
    allowTouchMove: true, // スワイプ有効
    autoplay: {
        delay: 3500, // 途切れなくループ
        disableOnInteraction: false, // 自動再生を止めない
    },

  });

//キャンペーン　スライダー
const campaignSwiper = new Swiper(".js-campaign-swiper", {
    loop: true, //ループさせる
    slidesPerView: 1.23, //一度に表示させる枚数
    centeredSlides : false, //アクティブなスライドを中央にしない
    spaceBetween: 24, // スライド間のスペース
    allowTouchMove: true, // スワイプ有効

    // Navigation arrows
    navigation: {
      nextEl: ".js-campaign-next",
      prevEl: ".js-campaign-prev",
    },
  
     //Responsive Breakpoint
     breakpoints:{
      768:{
        slidesPerView: 2.5,
        spaceBetween: 24, // スライド間のスペース
      },

      900:{
        slidesPerView: 3.15,
        spaceBetween: 24, // スライド間のスペース
      },

      1200:{
        slidesPerView: 3.45,
        spaceBetween: 40, // スライド間のスペース
      }

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
  // ページが読み込まれてから0.5秒後にクラスを追加
  setTimeout(function() {
    $(".loading__cover-left, .loading__cover-right").addClass("is-active");
  }, 500);

  // .loading__cover-left読み込み後に発火
  $(".loading__cover-left").on("animationend", function() {
    setTimeout(function() {
      $(".loading__title-wrap").css("z-index", 2002);
      $(".loading__title, .loading__sub-title").fadeIn(2000).css("color", "#fff");
    }, 800);
  });

  // .loading__cover-right読み込み後に発火
  $(".loading__cover-right").on("animationend", function() {
    $(".loading__title, .loading__sub-title").fadeOut(500);
  });

  // ページが読み込まれてから5秒後にloadingを非表示にする
  setTimeout(function() {
    $("#loading").fadeOut(2000);
  }, 7000);
});



});

