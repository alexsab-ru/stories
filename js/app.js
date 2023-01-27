document.addEventListener('DOMContentLoaded', () => {

	const delay = 5000;

	const swiper = new Swiper('.swiper', {
		slidesPerView: 1,
		slidesPerGroup: 1,
		autoplay: {
			delay: delay,
			stopOnLastSlide: true,
			disableOnInteraction: false
		},
		slidesPerGroupAuto: true,
		longSwipes: false,
		slideToClickedSlide: true,
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
			640: {
				slidesPerView: 3.4,
			},
		}
	});
	
	let time = 0;
	let interval = null;

	swiper.pagination.bullets.forEach((bullet, idx) => {
		if(idx == 0)
			bullet.classList.add('timing')
	});

	function restOfTime(){
		interval = setInterval(() => {
			time = time+100;
			if(time == delay || time > delay){
				clearInterval(interval);
			}
			console.log(time);
		}, 100)
	}
	
	swiper.on('slideChange', slider => {
		swiper.params.autoplay.delay = delay;
		if(slider.activeIndex != swiper.pagination.bullets.length - 1){
			swiper.autoplay.start()
		}
		time = 0;
		// restOfTime()
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
	
	function pause() {
		document.body.classList.add('paused');
		swiper.autoplay.pause()
		clearInterval(interval);
	}
	
	function play() {
		document.body.classList.remove('paused');
		document.body.classList.add('return');
		swiper.params.autoplay.delay = delay - time;
		time = 0;
		swiper.autoplay.run()
		// restOfTime();
	}
	
	window.onblur = pause;
	window.onfocus = play;

})