// Hero Slider
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

// Games Tabs & Filters
const filtersList = document.querySelectorAll('.nav-filter li a');
const tabs = document.querySelectorAll('.tab');
const allGamesBtn = document.querySelector('.filter-btn');
const allGamesCard = document.querySelectorAll('.card-all-games');

filtersList.forEach((filter, index) => {
	filter.addEventListener('click', (evt) => {
		evt.preventDefault();

		filtersList.forEach((item) => item.classList.remove('active'));

		tabs.forEach((tab) => tab.classList.remove('active'));

		tabs[index].classList.add('active');
		filter.classList.add('active');
	});
});

allGamesBtn.addEventListener('click', (evt) => {
	evt.preventDefault();

	filtersList.forEach((item) => item.classList.remove('active'));
	tabs.forEach((tab) => tab.classList.remove('active'));

	document.querySelector('.tab#all-games').classList.add('active');
});

allGamesCard.forEach((card) => {
	card.addEventListener('click', (evt) => {
		evt.preventDefault();

		filtersList.forEach((item) => item.classList.remove('active'));
		tabs.forEach((tab) => tab.classList.remove('active'));

		document.querySelector('.tab#all-games').classList.add('active');
	});
});

// Modal
const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal .overlay');
const closeModalBtn = document.querySelector('.modal .box .close');

const loginBtn = document.querySelector('.open-modal');

loginBtn.addEventListener('click', (evt) => {
	evt.preventDefault();

	modal.classList.remove('hidden');
});

modalOverlay.addEventListener('click', () => {
	modal.classList.add('hidden');
});

closeModalBtn.addEventListener('click', () => {
	modal.classList.add('hidden');
});

// Add modal when press esc key
document.body.addEventListener('keypress', function (e) {
	if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
		modal.classList.add('hidden');
	}
});

// Add class to header on scroll
const header = document.getElementsByTagName('header')[0];

window.addEventListener('scroll', function () {
	if (window.scrollY > 20) {
		header.classList.add('bg-dark');
	} else {
		header.classList.remove('bg-dark');
	}
});
