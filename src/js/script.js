
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる
//ドロワー表示
jQuery(".js-hamburger").on("click", function (e) {
    e.preventDefault();
    jQuery(".js-hamburger").toggleClass("is-active");
    jQuery(".js-drawer").toggleClass("is-active");
	jQuery("body").addClass("is-active");
  });

//spナビクリックしたらドロワーが閉じる
	jQuery('.js-drawer a[href^="#"]').on("click", function (e) {
    jQuery(".js-hamburger").removeClass("is-active");
    jQuery(".js-drawer").removeClass("is-active");
	jQuery("body").removeClass("is-active");
});

//メインビジュアル　スライダー
const mainVisualSwiper = new Swiper('.js-mv-swiper', {
    loop: true,
    speed: 1500, // ループの時間
    allowTouchMove: true, // スワイプ有効
    autoplay: {
        delay: 3500, // 途切れなくループ
        disableOnInteraction: false, // 自動再生を止めない
    }
  });

//キャンペーン　スライダー
const campaignSwiper = new Swiper(".js-campaign-swiper", {
    loop: true, //ループさせる
    slidesPerView: 1.3, //一度に表示させる枚数
    centeredSlides : false, //アクティブなスライドを中央にしない
    spaceBetween: 24, // スライド間のスペース
    allowTouchMove: true, // スワイプ有効
  
     //Responsive Breakpoint
     breakpoints:{
      768:{
        slidesPerView: 3.3,
        spaceBetween: 40, // スライド間のスペース
      }
    },
  });


});
