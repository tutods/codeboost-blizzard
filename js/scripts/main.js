const heroSlider = new Swiper('.slider', {
	effect: 'fade',
	loop: true,
	autoplay: {
		delay: 4000,
		disableOnInteraction: false,
		pauseOnMouseEnter: true
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
		verticalClass: 'swiper-pagination-vertical',
		renderBullet: function (index, className) {
			const slideImage = [
				{
					path: '/img/games/slider/icons/logo-xs-diablo-iv.png',
					alt: 'Diablo IV'
				},
				{
					path: '/img/games/slider/icons/logo-xs-heartstone.png',
					alt: 'Heartstone'
				},
				{
					path: '/img/games/slider/icons/logo-xs-ww.png',
					alt: 'World of Warcraft'
				},
				{
					path: '/img/games/slider/icons/logo-xs-diablo-imortal.png',
					alt: 'Diablo Imortal'
				},
				{
					path: '/img/games/slider/icons/logo-starcraft-ii.png',
					alt: 'Starcraft II'
				}
			];

			return `<span class="${className}">
				<img
					src="${slideImage[index].path}"
					alt="${slideImage[index].alt}"
				/>
			</span>`;
		}
	}
});
