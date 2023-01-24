

const swiper = new Swiper('.swiper', {
	slidesPerView: 1,
	slidesPerGroup: 1,
	autoplay: {
		delay: 5000,
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

swiper.pagination.bullets.forEach((bullet, idx) => {
	if(idx == 0)
		bullet.classList.add('timing')
});

swiper.on('slideChange', slider => {
	if(slider.activeIndex != swiper.pagination.bullets.length - 1){
		swiper.autoplay.start()
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