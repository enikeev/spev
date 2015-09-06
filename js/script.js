$(function(){

	$('.js-content-slide').click(function(){
		var $box = $('.content');
		$box.toggleClass('opened closed');
	});

	bgSlide();
	menuUnderline();

	$('.js-screen-scroller').mCustomScrollbar();

	$('.js-content-scroller').mCustomScrollbar({
		callbacks:{
			whileScrolling:function (){

			//	$(this).mouseover(function(e){

					var scrolltop = -this.mcs.top + 1;
					if ( $('[data-tab-item]').size() ){
						var $head = $('.content-header__menu');
						var $body = $('.content-body');

						var $box = $body.find('[data-tab-box]').filter(function(){
							return $(this).position().top <= scrolltop && ( $(this).position().top + $(this).height() > scrolltop );
						});

						if ( !$box.hasClass('active') ){
							$body.find('[data-tab-box]').removeClass('active');
							$box.addClass('active');

							$head.find('[data-tab-item]').removeClass('active');
							$head.find('[data-tab-item='+ $box.data('tab-box') +']').addClass('active');

							menuUnderline();
						}

					}
		//		});
			}
		}
	});
	$('.js-nav-scroller').mCustomScrollbar({
		scrollButtons:{enable:true},
		scrollbarPosition:"outside",
		callbacks:{
			onInit:function(){
				arrowCheck(this)
			},
			whileScrolling:function(){
				arrowCheck(this)
			}
		}
	});


	$('.js-menu-scroller').mCustomScrollbar({
		scrollButtons:{enable:true},
		scrollbarPosition:"outside",
		callbacks:{
			onInit:function(){
				arrowCheck(this)
			},
			whileScrolling:function(){
				arrowCheck(this)
			}
		}
	});

	function arrowCheck(el){
		var scrolltop = -el.mcs.top;
		var heightWrap = $(el).height();
		var heightLine = $(el).find('.mCSB_container ul').height();
		var up = $(el).find('.mCSB_buttonUp');
		var down = $(el).find('.mCSB_buttonDown');

		if ( scrolltop <=5 && !up.hasClass('disable') ){
			up.addClass('disable');
		} else if (scrolltop + heightWrap - 5 >= heightLine && !down.hasClass('disable')){
			down.addClass('disable');
		} else if ( scrolltop > 5 && scrolltop + heightWrap - 5 < heightLine && ( up.hasClass('disable') || down.hasClass('disable') ) ){
			up.removeClass('disable');
			down.removeClass('disable');
		}
	}

	$('select').selectbox();

	$('.js-tabs-wrap').on('click', '[data-tab-item]', function(e){
		e.preventDefault();
		var $t = $(this),
			$w = $t.closest('.js-tabs-wrap'),
			$item = $w.find('[data-tab-item]'),
			$box = $w.find('[data-tab-box]'),
			ind = $t.data('tab-item'),
			$box_targ = $w.find('[data-tab-box=' + ind + ']');

		$item.filter('.active').removeClass('active');
		$t.addClass('active');

		$('.js-content-scroller').mCustomScrollbar('scrollTo', $box_targ);

		menuUnderline();
	});

	$('.js-photo-tooltip').hover(function(e){
		var src = $(this).attr('href');
		photoTooltip(src, e.pageY, e.pageX)
	}, function(){
		$('.photo-tooltip').remove();
	}).click(function(e){e.preventDefault();});


	contentHendker();
	screenSlider();

});



function photoTooltip(src, top, left) {
	$('<img class="photo-tooltip" src="'+ src +'">').load(function() {

		var $t = $(this);

		$t.appendTo('.wrapper');

		var winW = $(window).width(),
			winH = $(window).height(),
			W = $t.width(),
			H = $t.height(),
			t = top + H + 40 >= winH ? top - H - 20 : top + 20,
			l = left + W + 40 >= winW ? left - W - 20 : left + 20;

		$t.css({
			top: t + 'px',
			left: l + 'px'
		})

	});
}


function menuUnderline(){
	var b = $('.content-header');
	var $el = $('.menu-slider');
	var $item = b.find('.menu-link.active');

	if ( $el.size() && $item.size() ){
		var $act = $item.parent();

		var l = $act.position().left;
		var w = $act.width();

		$el.css({
			width:w+'px',
			left: l+'px'
		});
	}
}

function contentHendker(){
	var $c = $('.content');

	if ( $c.size() ){
		$c.addClass('closed');
	}
}

function screenSlider(){
	var $slider = $('.screen-slider');

	if ( $slider.size() ){
		var slide = $slider.find('.screen-slide');
		slide.eq(slide.length - 1).addClass('active');
	}

}

function bgSlide(){
	var $slide = $('.screen-slide');
	var num = $slide.length;

	setInterval(function(){
		var $cur = $slide.filter('.active');
		var n = $cur.index();

		/*$cur.fadeOut(600, function(){
			$(this).removeClass('active');
			$slide.eq((n + 1) % num).fadeIn(600, function(){
				$(this).addClass('active');
			})
		})*/
		$cur.removeClass('active');
		$slide.eq((n + 1) % num).addClass('active');

	}, 8000);
}



/*video*/
/*
$(function(){

	var Preloader = function (element) {
		var video =  document.getElementById(element);

		if ( $(video).size() ){

			//	preloader = document.getElementById('preloader'),

			var ua = detect.parse(navigator.userAgent);
			if ( ua.os.family === 'Android' ) {
				video.setAttribute( 'controls','controls' );
			}


			var api = {};

			api._removePreloader = function() {
			//	preloader.style.opacity = 0;
			};

			api.startCheckingLoading = function() {
				video.addEventListener('click',function(){
					video.play();
				},false);

				video.addEventListener( 'play', api._removePreloader() );
			};

			return api;

		}

	};

	window.addEventListener('load', function() {
		var preloader = Preloader('video');
		try {
			preloader.startCheckingLoading();
		} catch (e) {

		}
	});
});*/
