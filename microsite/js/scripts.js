$(document).ready(function (){
	if ($('.base-bg').length) {
		$('#wrapper').css('background-image', 'url(' + $('.base-bg').attr('src') + ')');
		$('.base-bg').hide();
	};
	$('.lang .opener').click(function () {
		$(this).parent().toggleClass('opened');
		return false;
	});
	$('.lang ul a').click(function () {
		$(this).parent().addClass('active').siblings().removeClass('active');
		$(this).parents('.lang').removeClass('opened').find('.opener > img').attr('src', $(this).children('img').attr('src'));
		return false;
	});
	customForm.lib.domReady(function(){
		customForm.customForms.replaceAll();
	});
	var textOpened = 'Hide Showtimes',
		textClosed = 'View Showtimes'
	$('.list-films .items .item').each(function (){
		if (!$(this).hasClass('active')) {
			$(this).find('.body').hide();
			$(this).find('.show-hide').html(textClosed);
		} else{
			$(this).find('.show-hide').html(textOpened);
		};
	});
	$('.list-films .show-hide').click(function (){
		if ($(this).parents('.item').hasClass('active')) {
			$(this).parents('.item').removeClass('active').find('.body').slideUp(300);
			$(this).html(textClosed);
		} else{
			$(this).parents('.item').addClass('active').find('.body').slideDown(300);
			$(this).html(textOpened);
		};
		return false;
	});
	if ($(window).width() > 768 && $('.scroll-pane').length){
		$('.scroll-pane').jScrollPane({
			showArrows: false,
			autoReinitialise: true
		});
		var jspApi = $('.scroll-pane').data('jsp'),
			scrollFlag = 0;
	};
	$(window).resize(function (){
		if ($(window).width() > 768 && !scrollFlag == 0 && $('.scroll-pane').length) {
			$('.scroll-pane').jScrollPane().data().jsp;
			scrollFlag = 0;
		} else if ($(window).width() < 768 && !scrollFlag == 1 && $('.scroll-pane').length){
			scrollFlag = 1;
			jspApi.destroy();
		};
	});

	$('.open-menu').click(function (){
		$(this).parents('#main-nav').toggleClass('menu-opened');
		return false;
	});

	$('.filter2 .opener').click(function (){
		$(this).parent().toggleClass('opened');
		return false;
	});
	$('.fancybox').fancybox({
		padding: 0,
		margin: 15
	});
	$('.lightbox .btn-cancel').click(function (){
		$.fancybox.close();
		return false;
	});

	$(document).on('mouseup touchend ',function (e){
		var lang_ = $('.lang'),
			buttonMenu = $('.open-menu'),
			mobileMenu = $('.tablet-holder'),
			filter2Button = $('.filter2 .opener');
			filter2 = $('.filter2');
		if (!lang_.is(e.target) && lang_.has(e.target).length === 0){
			lang_.removeClass('opened');
		}
		if (!buttonMenu.is(e.target) && buttonMenu.has(e.target).length === 0 && !mobileMenu.is(e.target) && mobileMenu.has(e.target).length === 0 && $(window).width() < 1000){
			$('#main-nav').removeClass('menu-opened');
		}
		if (!filter2.is(e.target) && filter2.has(e.target).length === 0  && !filter2Button.is(e.target) && filter2Button.has(e.target).length === 0 && $(window).width() < 1000){
			filter2.removeClass('opened');
		}
	});

	var trailerThumbs = $('.trailer .thumbnails > .holder'),
		trailerGallery = $('.trailer .gallery');
	trailerGallery.slick({
		useCSS: false,
		arrows: false,
		fade: true,
		asNavFor: '.trailer .thumbnails'
	});
	trailerThumbs.slick({
		centerMode: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		vertical: true,
		focusOnSelect: true,
		centerPadding: '0',
		arrows: false,
		asNavFor: '.trailer .gallery',
		responsive: [
			{
				breakpoint: 1000,
				settings: {
					vertical: false,
					slidesToShow: 3,
					arrows: false
				}
			},{
				breakpoint: 767,
				settings: {
					vertical: false,
					slidesToShow: 2,
					arrows: false
				}
			}
		]
	});
	$('.trailer .thumbnails .slick-prev').click(function(){
		trailerThumbs.slick('prev');
	})

	$('.trailer .thumbnails .slick-next').click(function(){
		trailerThumbs.slick('next');
	})


	//google map
	var map,
		mapBig;
	function initialize1() {
		 var mapOptions = {
			zoom: 10,
			center: new google.maps.LatLng(-33.9, 151.2),
			styles: [{"stylers":[{"hue":"#ff1a00"},{"invert_lightness":true},{"saturation":-100},{"lightness":33},{"gamma":0.5}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2D333C"}]}]
		}
		map = new google.maps.Map(document.getElementById('map'), mapOptions);
		setMarkers(map, cinemas);
	}
	function initialize2() {
		var mapOptions = {
			scrollwheel: false,
			navigationControl: false,
			mapTypeControl: false,
			scaleControl: false,
			zoom: 10,
			center: new google.maps.LatLng(-33.9, 151.2),
			styles: [{"stylers":[{"hue":"#ff1a00"},{"invert_lightness":true},{"saturation":-100},{"lightness":33},{"gamma":0.5}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2D333C"}]}]
		}
		map = new google.maps.Map(document.getElementById('main-map'), mapOptions);
		setMarkers(map, cinemas);
	}
	var customImgObj  = {
		'markerDef': {},
		'marker': {'image':'images/ico-pin.svg'}
	};
	var cinemas = [
		['Your Location', 'markerDef', -33.9, 151.2, 5],
		['Name1', 'marker', -33.890542, 151.274856, 1],
		['Name2', 'marker', -33.923036, 151.259052, 2],
		['Name3', 'marker', -34.028249, 151.157507, 3]
	];


	function setMarkers(map, locations) {
		for (var i = 0; i < locations.length; i++) {
			var lodge  = locations[i];
			var myLatLng = new google.maps.LatLng(lodge[2], lodge[3]);
			var marker = new MarkerWithLabel({
				position: myLatLng,
				map: map,
				icon: customImgObj[lodge[1]].image,
				title: lodge[0],
				zIndex: lodge[4],
				labelContent: i == 0 ? '' : i.toString(),
				labelClass: 'map-label',
				labelAnchor: new google.maps.Point(14, 37)
			});
		}
	}
	if ($(window).width() > 1000 && $('#map').length) {
		google.maps.event.addDomListener(window, 'load', initialize1);
	};
	if ($('#main-map').length) {
		google.maps.event.addDomListener(window, 'load', initialize2);
	};

	$('.main-map .cinema-info').swipe( {
		swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
			if (direction == 'down') {
				$(this).addClass('hidden');
			};
		},
		threshold:0
	});
});