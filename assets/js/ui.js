$(function () {

  fontResponsive(10, 1080, 990, 580, 360);
  gnbMenu ();
  toggleFn ();
  layerPopup ();
  accoridonFn ();

  $('body').on('click', '.btn-top' , function () {
    $('body,html').stop().animate({'scrollTop' : 0},400)
  });

  $('.btn-cont-open').on('click',function () {
    var _btntext = $(this).data('text').split(',');
    //console.log(_btntext)
    if(!$(this).hasClass('open')) {
      $(this).find('span').text(_btntext[1]);
      $(this).addClass('open');
      $(this).siblings('.toggle-box').addClass('open');
    }else {
      $(this).find('span').text(_btntext[0]);
      $(this).removeClass('open');
      $(this).siblings('.toggle-box').removeClass('open');
    }
  });


  // 20220826  추가
  $('.select-list__items').on('click','.item',function () {
    $(this).addClass('active').siblings().removeClass('active');
  });

  // 20220826  추가
  $('.review-write__rate').on('click','.btn-rate', function () {
    var $this = $(this);
    var $closest = $this.closest('.review-write__rate');
    var _CurrentIndex = $this.index();
    $(this).siblings().removeClass('on');
    
    $closest.find('.btn-rate').each(function () {
      var _dataIdx = $(this).data('index')
      if(_dataIdx <= _CurrentIndex) {
        $(this).addClass('on');
      }
    });
  });

});

$(window).on('resize', function () {
	fontResponsive(10, 1080, 990, 580, 360);
	gnbMenu ();
	if($(window).outerWidth() < 991) {
		$('.header__nav--item.has-sub .heder__nav--dep1-link').off('mouseenter');
		$('.header__nav--item.has-sub').off('mouseleave');
		$('.header__nav--item.has-sub .heder__nav--dep1-link').on('click');
	}else {
		$('.header__nav--item.has-sub .heder__nav--dep1-link').on('mouseenter');
		$('.header__nav--item.has-sub').on('mouseleave');
		$('.header__nav--item.has-sub .heder__nav--dep1-link').off('click');
	}
	$('.header__content--menu').removeClass('open');
	$('.header__nav--dep2').removeClass('open');

})

/* gnb */
function gnbMenu () {
	var $btnOpenMenu = $('.btn__menu--open'),
		$btncloseMenu = $('.btn__close--menu'),
		$headerDim = $('.header__dimmed');
		$header = $('#header');

	$btnOpenMenu.on('click',function  () {
		$closest = $header.find('.header__content--menu');
		$closest.addClass('open');
	});
	$btncloseMenu.on('click',function  () {
		$closest = $header.find('.header__content--menu');
		$closest.removeClass('open');
	});
	$headerDim.on('click',function  () {
		$closest = $header.find('.header__content--menu');
		$closest.removeClass('open');
	});

	if($(window).outerWidth() < 991) {
		$('.header__nav--item.has-sub .heder__nav--dep1-link').on('click',function (e) {
			e.preventDefault();
			if($(this).siblings('.header__nav--dep2').hasClass('open')) {
				$(this).siblings('.header__nav--dep2').removeClass('open');  
			}else {
				$(this).parent().siblings().find('.header__nav--dep2').removeClass('open');
				$(this).siblings('.header__nav--dep2').addClass('open');
			};
		});
	}else {
		$('.header__nav--item.has-sub .heder__nav--dep1-link').on('mouseenter',function (e) {
			e.preventDefault();
			$(this).parent().siblings().find('.header__nav--dep2').removeClass('open');
			$(this).siblings('.header__nav--dep2').addClass('open');
		});
		$('.header__nav--item.has-sub').on('mouseleave',function (e) {
			$(this).find('.header__nav--dep2').removeClass('open');
		});
	}
}

/* toggle */
function toggleFn () {
	/*
	$('.button__toggle').on('click',function () {
		var $question = $(this).closest('.question');
		var $titAll = $question.siblings('.question');
		var $answer = $question.next('.answer');
		var $contAll = $answer.siblings('.answer');

		if($question.hasClass('active')) {
			$question.removeClass('active');
			$answer.slideUp(200);
		}else {
			$question.addClass('active');
			$answer.slideDown(200);
			$titAll.removeClass('active');
			$contAll.slideUp(200);
		};
	});
	*/
	$(document).on('click', '.button__toggle', function(){
		var $question = $(this).closest('.question');
		var $titAll = $question.siblings('.question');
		var $answer = $question.next('.answer');
		var $contAll = $answer.siblings('.answer');

		if($question.hasClass('active')) {
			$question.removeClass('active');
			$answer.slideUp(200);
		}else {
			$question.addClass('active');
			$answer.slideDown(200);
			$titAll.removeClass('active');
			$contAll.slideUp(200);
		};
	});
};


/* accordion */
function accoridonFn () {
	$('.accordion__heading').on('click','button',function () {
		var $this = $(this),
			$box = $this.closest('.accordion__panel'),
			$parent = $this.parent('.accordion__heading'),
			$li = $this.closest('li'),
			$cont = $this.siblings('.accordion__body');

		if($parent.hasClass('on')) {
			$parent.removeClass('on').siblings('.accordion__body').slideUp(200);
		}else {
			$parent.addClass('on').siblings('.accordion__body').slideDown(200);
			$li.siblings().find('.accordion__heading').removeClass('on').siblings('.accordion__body').slideUp(200);
		}
	});
}

/* fontsize */
function fontResponsive($fontsize, $max, $size1, $size2, $size3) {
	if($(window).innerWidth() < $max && $(window).innerWidth() > $size1) {
		$(document).find("html").animate({fontSize:($(window).innerWidth())*10/$max},0);
	}else if($(window).innerWidth() < $size2 && $(window).innerWidth() > $size3) {
		$(document).find("html").animate({fontSize:($(window).innerWidth())*19/$max},0);
	}else if ($(window).innerWidth() <= $size3) {
		$(document).find("html").css({fontSize: $fontsize/1.5 + 'px'});
	}else {
		$(document).find("html").css({fontSize: $fontsize + 'px'});
	};
}

/* layerpopup */
function layerPopup() {
	var $popupOpen = $('.btn__popup-open');
	var $dimmed = $('.popup__layer--dimmed');
	var $wrap = $('.popup__layer');
	var $popupClose = $('.btn__popup-close');
	var _st;
	$popupOpen.on('click', function (e) {
		e.preventDefault();
		var go_url = $(this).attr("go_url");
		if(go_url == undefined){
			go_url = "";			
		}
		$dimmed.attr("go_url", go_url);
		var popup_name = $(this).attr('popup_name');
		var _target = $('#' + popup_name);		
		if (popup_name == 'process_info'){
			//중고폰 보상금액 평가 기준 팝업시 에니메이션 없이 바로 보여줌
			_target.show();
			$dimmed.show();
		}else if (popup_name == 'estimatePrice'){
			_target.show(100);
			$dimmed.show(100);
		}else{
			_st = $(window).scrollTop();
			_target.show(100);
			$dimmed.show(100);
		}
		$wrap.addClass('open');
		$('body').addClass('bodyFixed');

		if (popup_name == 'process_info'){
		}else if (popup_name == 'estimatePrice'){
		}else if (popup_name == 'yogeumje_popup'){
			//tariff-plan__itmes
			var $tariff_plan_itmes = $(".tariff-plan__itmes");
			var $sel_yogeumje = $(".sel-yogeumje");
			if($sel_yogeumje.length){
				var syt = $sel_yogeumje.parent().position().top; // + $tariff_plan_itmes.scrollTop();
				//console.log(syt);
				$tariff_plan_itmes.stop().animate({scrollTop  : (syt - 50) + "px"}, 0);
			}
		}else{
			//위 팝업은 스크롤 수정을 하지 않음.
			$('body').css('top', -_st);
		}
	})
	$popupClose.on('click', function (e) {
		e.preventDefault();

		var go_url = $(this).attr("go_url");
		if(go_url === undefined){		
			$wrap.removeClass('open');
			$('.popup__layer--panel').hide(500);
			$dimmed.hide(500);
			$('body').removeClass('bodyFixed');
			$('body').removeAttr('style');
			$('body,html').scrollTop(_st);
		}else{
			location.href = go_url;
		}
	});
	$dimmed.on('click', function (e) {
		e.preventDefault();
		
		var go_url = $(this).attr("go_url");
		if(go_url === undefined || go_url == ""){
			$wrap.removeClass('open');
			$('.popup__layer--panel').hide(500);
			$dimmed.hide(500);
			$('body').removeClass('bodyFixed');
			$('body').removeAttr('style');
			$('body,html').scrollTop(_st);
		}else{
			location.href = go_url;
		}
	});
}

$.fn.GgangCircleDraw=function(e){var t,r=e.com[0],a=3.6*e.com[1],i=e.com[2],o=e.reverse,c=e.backCircle[0],n=e.backCircle[1],l=e.backCircle[2],h=e.backCircle[3],d=e.frontCircle[0],C=e.frontCircle[1],f=e.frontCircle[2],k=e.frontCircle[3],s=$(this)[0],S=$(s).parent().children().eq(1),b=s.getContext("2d"),g=s.width/2,p=s.height/2,v=1.25,I=0,P=0,M=360;b.lineCap=i,t=setInterval(function(){I=o?--I:I+=1,b.clearRect(0,0,s.width,s.height),function(){b.clearRect(0,0,s.width,s.height),b.beginPath();var e=b.createLinearGradient(0,0,1e3,0);e.addColorStop("0",n),e.addColorStop("0.5",l),b.strokeStyle=e,b.arc(g,p,c,Math.PI/180,Math.PI/180*(r+M)),b.strokeStyle=n,b.lineWidth=h,b.stroke()}(),function(){b.beginPath();var e=b.createLinearGradient(0,0,1e3,0);e.addColorStop("0",C),e.addColorStop("0.6",f),b.strokeStyle=e,b.lineWidth=k,b.arc(g,p,d,Math.PI/180*r,Math.PI/180*(r+I)),b.stroke()}(),P=o?100-I/-M*100:I/M*100,S.text(Math.floor(P)),(I<=-(a-1)&&o||a<=I&&!o)&&clearInterval(t)},v)};
