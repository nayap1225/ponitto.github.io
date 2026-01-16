$(function () {

	if($('.mansonry_grid').length) {
		masonryLayout();    
	};

	if($('.slide_layer_wrap').length) {
		$('.btn_open_slide').on('click', slidePopup);
		slidePopClose ();
	}

	$('.btn_search').on('click', function () {
		$('.search_layer_wrap').show();
	});
	$('.search_layer_wrap').on('click','.btn_close_pop', function () {
		$('.search_layer_wrap').find('.input_text').val('');
		$('.search_layer_wrap').hide();
	});
	
	$('.fold_box .btn_open').on('click', contFoldFn);
	$('.fold_box .btn_close').on('click', contFoldFn);

	$('.tgl_title').on('click', toggleFn);
	$('.btn_layer_pop').on('click', layerPopup);
	$('.btn_ab_layer_pop').on('click', layerPopupScroll);
	$('.alert_layer_wrap .btn_close_pop, .layer_wrap .btn_close_pop , .alert_layer_wrap .dimmed, .layer_wrap .dimmed').on('click', layerClose);

	$('.sort_list_box .btn_dropdown').on('click', function () {
		var $this = $(this);
		$this.hasClass('on') ? $this.removeClass('on').siblings('.dropdown_list').removeClass('on') : $this.addClass('on').siblings('.dropdown_list').addClass('on');
	});
	$('.sort_list_box .dropdown_list').on('click','button', function () {
		var $this = $(this)
			$parent = $this.parent('li'),
			$wrap = $this.closest('.prod_sort_area'),
			$items = $wrap.find('.dropdown_list'),
			$dropdownBtn = $wrap.find('.btn_dropdown'),
			$selectText = $wrap.find('.selected_text')
			_text = $this.text();
		$parent.addClass('selected').siblings().removeClass('selected');
		$items.removeClass('on');
		$dropdownBtn.removeClass('on');
		$selectText.text(_text);
	});

	$('.image_upload_wrap').on('click','.btn_select' , function () {
		if(!$(this).hasClass('selected')) {
			$(this).closest('.section_image_upload').find('.btn_select').removeClass('selected');
			$(this).addClass('selected');
		}else {
			$(this).removeClass('selected');
		};
	});
	$('.image_upload_wrap').on('click','.btn_del' , function () {
		$(this).closest('li').remove();
	});

	$(document).mouseup(function (e) {
		if($('.sort_list_box .btn_dropdown.on').length && !$('.sort_list_box').has(e.target).length) {
			$('.sort_list_box .btn_dropdown').removeClass('on').siblings('.dropdown_list').removeClass('on');
		};
	});
});

$(window).on('resize',function () {

	if($('.mansonry_grid').length) {
		masonryLayout();    
	};
});

$(window).on('load',function () {

	if($('.cate_list_wrap').length) {
		cateSwiperFn ();
	};
});

// toggle
function toggleFn () {
	var $el = $(this),
		$tglWrap = $el.closest('.toggle_box'),
		$tglCont = $tglWrap.find('.tgl_cont');
	$el.hasClass('on') ? $el.removeClass('on') : $el.addClass('on');
	$tglCont.slideToggle(300);
};

/* dropdown */
function dropdown () {

}

// mansonry 정렬
function masonryLayout() {
	const gridItemsStyle = getComputedStyle(
		document.querySelector(".mansonry_grid .grid_items")
	);
	const columnGap = parseInt(
		gridItemsStyle.getPropertyValue("column-gap")
	);
	const autoRows = parseInt(
		gridItemsStyle.getPropertyValue("grid-auto-rows")
	);
	document.querySelectorAll(".mansonry_grid .item").forEach((elt) => {
		elt.style.gridRowEnd = `span ${Math.ceil(
			elt.querySelector(".item_inner").scrollHeight / autoRows + columnGap / autoRows + 2
		)}`;

	});
};

// layerpopup
function layerPopup () {
	var $el = $(this),
		_href = $el.attr('href'),
		$target = $(_href),
		$closest = $target.closest('[class*=_layer_wrap]');

	$closest.fadeIn(100, function () {
		$target.addClass('on');
		$closest.find('.dimmed').addClass('on');
	});
};

// layerpopup
function layerPopupScroll (e) {
	e.preventDefault();
	var $el = $(this),
		_href = $el.attr('href'),
		$target = $(_href),
		$closest = $target.closest('.layer_wrap');

	$closest.fadeIn(100, function () {
		$target.addClass('on');
		$closest.find('.dimmed').addClass('on');
	});

	var st = $(window).scrollTop(),
		wh = $(window).height(),
		th = $target.outerHeight();
		sl = $(window).scrollLeft(),
		ww = $(window).width(),
		tw = $target.outerWidth();
	var targetY = wh > th ? st + (wh/2 - th/2) : st + 20;

	$target.css({
		'top' : targetY
	});
};

var _winScrollTop = 0;

function slidePopup() {
	var $el = $(this),
		$target = $el.attr('href');
	_winScrollTop = $(window).scrollTop();
	$($target).addClass('open');
	$('body').css({
		'position': 'fixed',
		'top' : -_winScrollTop,
		'overflow' : 'hidden'
	});
	$($target).siblings('.dimmed').addClass('on');
	console.log(_winScrollTop)
};

/* 하단 슬라이드 팝업 */
function slidePopClose () {

	var dy = 0;
	var tabx = 0;
	var my = 0;
	var limit = 0;
	var $wrap;
	$(".slide_bottom_layer .slide_touch_area").bind('touchstart', function(e) {
		var event = e.originalEvent;
		dy = event.touches[0].screenY;
		$this = $(this);
		$wrap = $this.closest(".slide_layer_wrap");
		limit = $wrap.outerHeight();
		tabx = $wrap.css("transform").replace(/[^0-9\-.,]/g, '').split(',')[5];
	});

	$(".slide_bottom_layer .slide_touch_area").bind('touchmove', function(e) {
		var event = e.originalEvent;
		my = parseInt(tabx) + parseInt(event.touches[0].screenY - dy);
		if(my > 0) {
			$wrap.css("transform", "translateY(" + my + "px)");
		}else {
			$wrap.css("transform", "translateY(0)");
		}
		event.preventDefault();
	});
	$(".slide_bottom_layer .slide_touch_area").bind('touchend', function(e) {
		if ((my > limit / 2)) {
			$wrap.css("transform", "translateY(calc(101%)");
			$wrap.closest('.slide_layer_wrap.open').removeClass('open');
			$wrap.removeAttr('style');
			$('body').removeAttr('style');
			$('body,html').scrollTop(_winScrollTop);
			$wrap.siblings('.dimmed').removeClass('on');
		}else {
			$wrap.css("transform", "translateY(0)");
		}
		console.log(my, limit)
	});

	$('.slide_bottom_layer .dimmed, .slide_bottom_layer .btn_close_popup').on('click',function () {
		var $wrap = $(this).closest('.slide_bottom_layer').find('.slide_layer_wrap');
		$wrap.css("transform", "translateY(calc(101%)");
		$wrap.closest('.slide_layer_wrap.open').removeClass('open');
		$wrap.removeAttr('style');
		$('body').removeAttr('style');
		$('body,html').scrollTop(_winScrollTop);
		$wrap.siblings('.dimmed').removeClass('on');
	});
}

function layerClose () {
	var $el = $(this),
		$closest = $el.closest('[class*=layer_wrap]');

	$closest.find('[class*=layer_popup]').removeClass('on');
	$closest.find('.dimmed').removeClass('on');
	$closest.fadeOut(200);
};


/* 카테고리 */
function cateSwiperFn () {
	var setCateSwiper1 = {
		slidesPerView: 'auto',
		loop: false,
		centeredSlides: false,
		freeMode : true,
		freeModeMomentumBounce: false,
		navigation: {
			nextEl: '.cate_list_dep1 .swiper-button-next',
		},
	}
	var setCateSwiper2 = {
		slidesPerView: 'auto',
		loop: false,
		centeredSlides: false,
		freeMode : true,
		freeModeMomentumBounce: false,
		observer:true, 
		observeParents:true,
		observeSlideChildren:true
	}
	var cateSwiperDep1 = new Swiper($('.cate_list_dep1 .swiper-container'),setCateSwiper1);
	var cateSwiperDep2 = new Swiper($('.cate_list_dep2 .swiper-container'),setCateSwiper2);
	
	$('[class*=cate_list_dep] .swiper-wrapper').on('click','a',function(){
		var $this = $(this).addClass('on').parent().siblings().find('a').removeClass('on');
	});
}

function mouseScrollFn () {
	const slider = document.querySelector('.scroll_x_box .scroll_content');
	let isMouseDown = false;
	let startX, scrollLeft;

	slider.addEventListener('mousedown', (e) => {
	  isMouseDown = true;
	  slider.classList.add('active');
  
	  startX = e.pageX - slider.offsetLeft;
	  scrollLeft = slider.scrollLeft;

	});
	
	slider.addEventListener('mouseleave', () => {
	  isMouseDown = false;
	  slider.classList.remove('active');
	});
	
	slider.addEventListener('mouseup', () => {
	  isMouseDown = false;
	  slider.classList.remove('active');
	});
  
	slider.addEventListener('mousemove', (e) => {
	  if (!isMouseDown) return;
  
	  e.preventDefault();
	  const x = e.pageX - slider.offsetLeft;
	  const walk = (x - startX) * 1;
	  slider.scrollLeft = scrollLeft - walk;
	});
};

function contFoldFn() {
	var $this = $(this),
		$wrap = $this.closest('.fold_box'),
		$cont = $wrap.find('.fold_cont');

	if($this.hasClass('btn_open')) {
		$cont.slideDown();
	}else if($this.hasClass('btn_close')) {
		$cont.slideUp();
	}
}

function setCookie(name, value, expiredays) {
	var todayDate = new Date();
	todayDate.setTime(todayDate.getTime() + 0);
	if(todayDate > expiredays){
		document.cookie = name + "=" + escape(value) + "; path=/; expires=" + expiredays + ";";
	}else if(todayDate < expiredays){
		todayDate.setDate(todayDate.getDate() + expiredays);
		document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";";
	}
	//console.log(document.cookie);
}

function getCookie(Name) {
	var search = Name + "=";
	//console.log("search : " + search);
	
	if (document.cookie.length > 0) { // 쿠키가 설정되어 있다면 
		offset = document.cookie.indexOf(search);
		//console.log("offset : " + offset);
		if (offset != -1) { // 쿠키가 존재하면 
			offset += search.length;
			// set index of beginning of value
			end = document.cookie.indexOf(";", offset);
			//console.log("end : " + end);
			// 쿠키 값의 마지막 위치 인덱스 번호 설정 
			if (end == -1)
				end = document.cookie.length;
			//console.log("end위치  : " + end);
			
			return unescape(document.cookie.substring(offset, end));
		}
	}
	return "";
}

function addComma(value){
	value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return value; 
}

function removeComma(value){
	value = value.replace(/[^\d]+/g, "");
	return value; 
}

function calInterest(price, month, rate){
	var a, b, c, d, e, f, y;

	a = parseFloat(price);
	b = parseFloat(month);
	y = parseFloat(rate);

	if (y > 0){
		y = y / 100;
	}else{
		y = 0.059;
	}

	c = parseFloat(y / 12); //월이자율
	d = (a * c * ((Math.pow(1+c , b)) / (Math.pow(1+c , b) -1))); //매월 청구금액
	e = d * b; //총납부 할부금
	f = e - a; //총 이자 금액

	d = Math.round(d);
	e = Math.round(e);
	f = Math.round(f);

	var rst = {
		 'month_interest_rate':c //월이자율
		,'month_claim_amt':d //매월 청구금액
		,'total_amt':e //총납부 할부금
		,'total_interest':f //총 이자 금액
	};

	return rst;
}

$(document).on('propertychange change keyup paste input', '.form-text.number', function(){
	var currentVal = $(this).val();
	currentVal = currentVal.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
	$(this).val(currentVal);
});