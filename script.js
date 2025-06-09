// Start Navigation
document.addEventListener("DOMContentLoaded", () => {
	const navLinks = document.querySelectorAll(
		"nav ul li a:not(.always-active)"
	);

	function setActive(link) {
		navLinks.forEach((l) => l.classList.remove("active"));
		link.classList.add("active");
	}

	navLinks.forEach((link) => {
		link.addEventListener("click", function () {
			setActive(this);
		});
	});

	window.addEventListener("scroll", () => {
		if (window.scrollY === 0) {
			const homeLink = document.querySelector('nav ul li a[href="#"]');
			if (homeLink) {
				setActive(homeLink);
			}
		}
	});
});

// Start Testimony
const dots = document.querySelectorAll(".dot");
dots.forEach((dot, index) => {
	dot.addEventListener("click", () => {
		dots.forEach((d) => d.classList.remove("active"));
		dot.classList.add("active");
	});
});

const testimonials = [
	{
		photo: "/images/people/person1.svg",
		name: "Abbie Harvey",
		text: "I have been caring for my mom & dad off and on for about 10 years now, and I know the importance of me being there for appointments. Older people need attention, love and care that they truly deserve.",
	},
	{
		photo: "/images/people/person2.svg",
		name: "Michael Rodriguez",
		text: "HomeCare helped me take care of my grandparents. Their service was amazing.",
	},
	{
		photo: "/images/people/person3.svg",
		name: "Sarah Lee",
		text: "I’m very thankful for the caregivers. They treat my family like their own.",
	},
];

let currentIndex = 0;

const photoEl = document.getElementById("testimonial-photo");
const nameEl = document.getElementById("testimonial-name");
const textEl = document.getElementById("testimonial-text");
const testimonialEl = document.querySelector(".testimonial");

function updateTestimonial(index) {
	testimonialEl.classList.add("fade-out");

	setTimeout(() => {
		const t = testimonials[index];
		photoEl.src = t.photo;
		nameEl.textContent = t.name;
		textEl.textContent = t.text;

		dots.forEach((dot, i) => {
			dot.classList.toggle("active", i === index);
		});

		currentIndex = index;

		testimonialEl.classList.remove("fade-out");
		testimonialEl.classList.add("fade-in");

		setTimeout(() => {
			testimonialEl.classList.remove("fade-in");
		}, 400);
	}, 300);
}

document.querySelector(".arrow.left").addEventListener("click", () => {
	const newIndex =
		(currentIndex - 1 + testimonials.length) % testimonials.length;
	updateTestimonial(newIndex);
});

document.querySelector(".arrow.right").addEventListener("click", () => {
	const newIndex = (currentIndex + 1) % testimonials.length;
	updateTestimonial(newIndex);
});

dots.forEach((dot) => {
	dot.addEventListener("click", () => {
		const index = parseInt(dot.getAttribute("data-index"));
		if (index !== currentIndex) {
			updateTestimonial(index);
		}
	});
});

updateTestimonial(currentIndex);

// Swipe support
let startX = 0;
let isDragging = false;

testimonialEl.addEventListener("touchstart", (e) => {
	startX = e.touches[0].clientX;
	isDragging = true;
});

testimonialEl.addEventListener("touchmove", (e) => {
	if (!isDragging) return;
	const deltaX = e.touches[0].clientX - startX;
});

testimonialEl.addEventListener("touchend", (e) => {
	isDragging = false;
	const endX = e.changedTouches[0].clientX;
	const diff = endX - startX;

	if (Math.abs(diff) > 50) {
		if (diff < 0) {
			const newIndex = (currentIndex + 1) % testimonials.length;
			updateTestimonial(newIndex);
		} else {
			const newIndex =
				(currentIndex - 1 + testimonials.length) % testimonials.length;
			updateTestimonial(newIndex);
		}
	}
});

testimonialEl.addEventListener("mousedown", (e) => {
	startX = e.clientX;
	isDragging = true;
});

testimonialEl.addEventListener("mouseup", (e) => {
	if (!isDragging) return;
	isDragging = false;
	const endX = e.clientX;
	const diff = endX - startX;

	if (Math.abs(diff) > 50) {
		if (diff < 0) {
			const newIndex = (currentIndex + 1) % testimonials.length;
			updateTestimonial(newIndex);
		} else {
			const newIndex =
				(currentIndex - 1 + testimonials.length) % testimonials.length;
			updateTestimonial(newIndex);
		}
	}
});

// Start Popup
const playTrigger = document.getElementById("playTrigger");
const popup = document.getElementById("videoPopup");
const iframe = document.getElementById("youtubeVideo");
const closeBtn = document.getElementById("closePopup");

playTrigger.addEventListener("click", function () {
	const videoId = "UNQhuFL6CWg";
	iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
	popup.style.display = "block";
});

closeBtn.addEventListener("click", function () {
	iframe.src = "";
	popup.style.display = "none";
});

document.addEventListener("keydown", function (e) {
	if (e.key === "Escape" && popup.style.display === "block") {
		iframe.src = "";
		popup.style.display = "none";
	}
});

closeBtn.addEventListener("keydown", function (e) {
	if (e.key === "Enter" || e.key === " ") {
		iframe.src = "";
		popup.style.display = "none";
	}
});

// Toggle hamburger menu
const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
	navLinks.classList.toggle("show");
});

// Close the menu when a link is clicked
const links = navLinks.querySelectorAll("a");
links.forEach((link) => {
	link.addEventListener("click", () => {
		navLinks.classList.remove("show");
	});
});

// Form
const form = document.querySelector("form");
const inputs = form.querySelectorAll("input, select");

form.addEventListener("submit", function (e) {
	e.preventDefault();

	let isValid = true;

	inputs.forEach((input) => {
		const parent = input.closest(".form-group");

		const oldError = parent.querySelector(".error-message");
		if (oldError) oldError.remove();

		if (!input.value.trim()) {
			input.classList.add("error");
			isValid = false;

			const errorDiv = document.createElement("div");
			errorDiv.classList.add("error-message");
			errorDiv.textContent =
				"This field can’t be empty. Please fill it in.";
			parent.appendChild(errorDiv);
		} else {
			input.classList.remove("error");
		}
	});

	if (isValid) {
		setTimeout(() => {
			window.location.href = "thankyou.html";
		}, 500);
	}
});

// Remove error message when input is focused
inputs.forEach((input) => {
	input.addEventListener("focus", () => {
		const parent = input.closest(".form-group");
		const oldError = parent.querySelector(".error-message");
		if (oldError) oldError.remove();
		input.classList.remove("error");
	});
});
