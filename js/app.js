document.addEventListener('DOMContentLoaded', () => {
	let swiper;
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent) || 
	/^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
	navigator.userAgent.toLowerCase().match(/(ipad|iphone)/)) {
		screen.orientation.lock("portrait");
		swiper = new Swiper('.swiper', {
			slidesPerView: 1,
			longSwipes: false,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		})
	} else{
		swiper = new Swiper('.swiper', {
			slidesPerView: 1,
			slidesPerGroup: 1,
			slidesPerGroupAuto: true,
			longSwipes: false,
			// slideToClickedSlide: true,
			centeredSlides: true,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					centeredSlides: false,
				},
				992: {
					slidesPerView: 3.4,
				},
			}
		})
	}
	
	let defaultDelay = 3000;
	let delay = defaultDelay;
	let time = 0;
	let time2 = 0;
	let diffTime = 0;
	let timeout;

	document.body.style.setProperty('--time', delay/1000+'s')

	swiper.pagination.bullets.forEach((bullet, idx) => {
		if(idx == 0)
			bullet.classList.add('timing')
	});

	function nextSlide(delay){
		time = Date.now();
		timeout = setTimeout(() => {
			swiper.slideNext()
		}, delay)
	}

	nextSlide(delay)

	function pause() {
		time2 = Date.now();
		clearTimeout(timeout);
		swiper.disable()
		document.body.classList.add('paused');
	}
	
	function play() {
		swiper.enable();
		diffTime = time2 - time;
		delay = defaultDelay - diffTime;
		nextSlide(delay);
		document.body.classList.remove('paused');
	}
	
	window.onblur = pause;
	window.onfocus = play;
	
	swiper.on('slideChange', slider => {
		clearTimeout(timeout);
		if(slider.activeIndex != swiper.pagination.bullets.length - 1){
			delay = defaultDelay;
			nextSlide(delay);
		}
		swiper.pagination.bullets.forEach((bullet, idx) => {
			bullet.classList.remove('timing');
			bullet.classList.remove('completed');
			if(idx < slider.activeIndex){
				bullet.classList.add('completed');
			}else if(idx == slider.activeIndex){
				bullet.classList.add('timing');
			}
		})
	})

})