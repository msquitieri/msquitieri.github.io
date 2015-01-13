$(document).ready(function(){
	var $window = $(window),
		flexslider_,
		flexslider2_,
		flexslider3_,
		flexslider4_;
	(function(){
		$('.carousel-3items').each(function(){
			$(this).flexslider({
				animation: "slide",
				itemWidth: 390,
				itemMargin: 20,
				slideshowSpeed: 5000,
				controlNav: false,
				move: 1,
				useCSS:false,
				touch: false,
				minItems: getGridSize(),
				maxItems: getGridSize()
			});
			flexslider_ = $(this).data('flexslider');
		});
	}());
	(function(){
		$('.carousel-6items').each(function(){
			$(this).flexslider({
				animation: "slide",
				itemWidth: 185,
				itemMargin: 20,
				slideshowSpeed: 5000,
				controlNav: false,
				move: 1,
				useCSS:false,
				touch: false,
				minItems: getGridSize2(),
				maxItems: getGridSize2() 
			});
			flexslider2_ = $(this).data('flexslider');
		});
	}());
	(function(){
		$('.channels-carousel').each(function(){
			$(this).flexslider({
				animation: "slide",
				itemWidth: 132,
				itemMargin: 9,
				slideshow: false,
				controlNav: false,
				move: getGridSize3(),
				useCSS:false,
				minItems: getGridSize3(),
				maxItems: getGridSize3()
			});
			flexslider3_ = $('.channels-carousel').data('flexslider');
		});
	}());
	(function(){
		$('.carousel-4items').each(function(){
			$(this).flexslider({
				animation: "slide",
				itemWidth: 300,
				itemMargin: 10,
				slideshowSpeed: 5000,
				controlNav: false,
				move: 1,
				useCSS:false,
				minItems: getGridSize4(),
				maxItems: getGridSize4() 
			});
			flexslider4_ = $(this).data('flexslider');
		});
	}());
	$window.resize(function() {
		if ($('.carousel-3items').length) {
			var gridSize = getGridSize();
			flexslider_.vars.minItems = gridSize;
			flexslider_.vars.maxItems = gridSize;
		};
		if ($('.carousel-6items').length) {
			var gridSize2 = getGridSize2();
			flexslider2_.vars.minItems = gridSize2;
			flexslider2_.vars.maxItems = gridSize2;
		};
		if ($('.channels-carousel').length) {
			var gridSize3 = getGridSize3();
			flexslider3_.vars.minItems = gridSize3;
			flexslider3_.vars.maxItems = gridSize3;
			flexslider3_.vars.moveItems = gridSize3;
		};
		if ($('.carousel-4items').length) {
			var gridSize4 = getGridSize4();
			flexslider4_.vars.minItems = gridSize4;
			flexslider4_.vars.maxItems = gridSize4;
		};
	});
	$('.lightbox').fancybox({
		nextEffect:  'fade',
		prevEffect:  'fade',
		padding: 0,
		margin: 40,
		helpers: {
			title: {
				type : 'inside'
			}
		}
	});
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		$('.channels-carousel').resize();
	})
	$('.more-items > li').each(function(){
		$(this).find('.video-megamenu').hide();
	});
	$('.more-items > li > a').click(function(){
		var this_ = $(this),
			parent_ = this_.parent(),
			height_ = this_.siblings('.video-megamenu').height();
			console.log(height_)
		if (parent_.children('.video-megamenu').length) {
			parent_.addClass('active')
			.css({
				'margin-bottom': height_
			})
			.siblings().removeClass('active').css({
				'margin-bottom': 0
			});
			this_.siblings('.video-megamenu').fadeIn(300);
			parent_.siblings().children('.video-megamenu').hide();
			$('.channels-carousel').resize();
			return false;
		};

	});
	$('.video-megamenu .close').click(function(){
		var thisMenu_ = $(this).parents('.video-megamenu');
		thisMenu_.fadeOut(300, function(){
			thisMenu_.parent().removeClass('active').css({
				'margin-bottom': 0
			});
		});
		return false;
	});
	$('#main-slideshow .item').each(function(){
		var this_ = $(this)
			image_ = this_.find('.img'),
			bg_ = 'url(' + image_.attr('src') + ')';
		this_.css('background-image', bg_);
		image_.hide();
	});
	$('.visual').each(function(){
		var this_ = $(this)
			image_ = this_.find('.img'),
			bg_ = 'url(' + image_.attr('src') + ')';
		this_.css('background-image', bg_);
		image_.hide();
	});
	imagePosition();
	$('.info-block .btn-more').click(function(){
		var this_ = $(this),
			parent_ = this_.parents('.info-block'),
			infoBox = $('.info-block .box'),
			button_ = $('.info-block .btn-primary');

		if (!parent_.hasClass('open')) {
			parent_.addClass('open').addClass('in');
			infoBox.slideDown(300, function(){
				imagePosition();
			});
		} else {
			parent_.removeClass('open');
			infoBox.slideUp(300, function(){
				parent_.removeClass('in');
			});
		};
		return false;
	});
	$('.info-megamenu').each(function(){
		var this_ = $(this)
			image_ = this_.find('.drop-bg'),
			bg_ = 'url(' + image_.attr('src') + ')';
		this_.css('background-image', bg_);
		image_.hide();
	});
	checkSwitch();
	customForm.lib.domReady(function(){
		customForm.customForms.replaceAll();
	});
	$(window).load(function() {
		setTimeout(function(){
			equalheight('.filter-results ul');
		}, 300);
	});
	$(window).resize(function(){
		setTimeout(function(){
			equalheight('.filter-results ul');
		}, 300);
	});
	$('.filter-results .collapse-block').hide();
	$('.filter-results .opener').click(function(){
		var this_ = $(this),
			parent_ = this_.parents('.filter-results'),
			slideBlock = parent_.find('.collapse-block');
		if (!parent_.hasClass('opened')) {
			parent_.addClass('opened');
			slideBlock.slideDown(300, function(){
				equalheight('.filter-results ul');
			});
		} else {
			parent_.removeClass('opened');
			slideBlock.slideUp(300);
		};
	});
});
function getGridSize() {
	return  (window.innerWidth < 700) ? 1 :
			(window.innerWidth < 992) ? 2 : 3;
}
function getGridSize2() {
	return  (window.innerWidth < 480) ? 1 :
			(window.innerWidth < 560) ? 2 :
			(window.innerWidth < 768) ? 3 :
			(window.innerWidth < 991) ? 4 :
			(window.innerWidth < 1280) ? 5 : 6;
}
function getGridSize3() {
	return  (window.innerWidth < 400) ? 1 :
			(window.innerWidth < 560) ? 2 :
			(window.innerWidth < 768) ? 3 :
			(window.innerWidth < 992) ? 4 :
			(window.innerWidth < 1280) ? 6: 8;
}
function getGridSize4() {
	return  (window.innerWidth < 700) ? 1 :
			(window.innerWidth < 992) ? 3 : 4;
}
function imagePosition(){
	$('.poster img').each(function(){
		var this_ = $(this),
			offset_ = parseInt($(this).width() / 2);
		this_.css({
			'margin-left': -offset_
		})
	});
}