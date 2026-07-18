/*
	Template Name: SaasRiver - SaaS & StartUp HTML Template
	Author: https://themexriver.com/
	Version: 1.0
*/

(function ($) {
	"use strict";

	/*
	windows-load-function
*/

	/*
    windows-load-function
*/
	(function () {
		if (!document.querySelectorAll(".st-preloader").length) {
			document.addEventListener("DOMContentLoaded", afterPreloader);
			window.addEventListener("load", afterPageLoad);
			return;
		}

		const loader = document.querySelector(".st-preloader");
		const countEl = loader.querySelector(".st-preloader-count");
		const barEl = loader.querySelector(".st-preloader-bar");

		let currentVal = 0;
		let targetVal = 0;
		let raf = null;
		let pageLoaded = false;

		function animateToTarget() {
			if (currentVal < targetVal) {
				currentVal += Math.max(0.4, (targetVal - currentVal) * 0.05);
				if (currentVal > targetVal) currentVal = targetVal;

				const val = Math.round(currentVal);
				if (countEl) countEl.textContent = val + " %";
				if (barEl) barEl.style.width = val + "%";
			}

			if (Math.round(currentVal) >= 100 && pageLoaded) {
				if (countEl) countEl.textContent = "100 %";
				if (barEl) barEl.style.width = "100%";

				cancelAnimationFrame(raf);

				setTimeout(() => {
					loader.classList.add("loaded");
					afterPreloader();
				}, 300);

				setTimeout(() => {
					loader.remove();
				}, 1500);

				return;
			}

			raf = requestAnimationFrame(animateToTarget);
		}

		document.addEventListener("DOMContentLoaded", function () {
			targetVal = 80;
			raf = requestAnimationFrame(animateToTarget);
		});

		window.addEventListener("load", function () {
			pageLoaded = true;
			targetVal = 100;
			afterPageLoad();
		});
	})();

	/*
	after-preloader-start
*/
	function afterPreloader() {
		// wow-activation
		if ($(".wow").length) {
			var wow = new WOW({
				boxClass: "wow",
				animateClass: "animated",
				offset: 50,
				mobile: true,
				live: true,
			});
			wow.init();
		}

		/*
		only-LTR-direction
	*/
		if (getComputedStyle(document.body).direction !== "rtl") {
			// title-animation
			function wa_split_text() {
				var wa_st = $(".wa-split-text");
				if (wa_st.length === 0) return;

				gsap.registerPlugin(SplitText, ScrollTrigger);

				wa_st.each(function (index, wa_el) {
					var wa_els = wa_el;

					const wa_split = new SplitText(wa_els, {
						type: "lines, words, chars",
						lineThreshold: 0.5,
						linesClass: "split-line",
					});

					var split_type_set = wa_split.chars;

					gsap.set(wa_els, { perspective: 400 });

					var settings = {
						scrollTrigger: {
							trigger: wa_els,
							toggleActions: "play none none none",
							start: "top 86%",
							once: true,
							markers: false,
						},
						duration: 0.35,
						stagger: 0.02,
						ease: "expo.out",
					};

					if ($(wa_el).hasClass("split-in-fade")) {
						settings.opacity = 0;
					}
					if ($(wa_el).hasClass("split-in-right")) {
						settings.opacity = 0;
						settings.x = 50;
					}
					if ($(wa_el).hasClass("split-in-left")) {
						settings.opacity = 0;
						settings.x = -50;
					}
					if ($(wa_el).hasClass("split-in-up")) {
						settings.opacity = 0;
						settings.y = 80;
					}
					if ($(wa_el).hasClass("split-in-down")) {
						settings.opacity = 0;
						settings.y = -80;
					}
					if ($(wa_el).hasClass("split-in-rotate")) {
						settings.opacity = 0;
						settings.rotateX = 50;
					}
					if ($(wa_el).hasClass("split-in-scale")) {
						settings.opacity = 0;
						settings.scale = 0.5;
					}

					if ($(wa_el).hasClass("split-line-up")) {
						wa_split.split({ type: "words" });
						split_type_set = wa_split.words;

						$(split_type_set).each(function (i, elw) {
							gsap.from(elw, {
								autoAlpha: 0,
								duration: 1,
								transform: "rotateX(80deg) translateY(80px)",
								delay: 0.25 + i * 0.065,
								ease: "expo.out",
								transformOrigin: "center bottom",
								scrollTrigger: {
									trigger: wa_el,
									start: "top 86%",
									toggleActions: "play none none none",
								},
							});
						});
					}

					if ($(wa_el).hasClass("split-up")) {
						wa_split.split({ type: "words" });
						split_type_set = wa_split.words;

						$(split_type_set).each(function (i, elw) {
							gsap.from(elw, {
								opacity: 0,
								duration: 0.65,
								y: 40,
								rotate: 10,
								transformOrigin: "bottom right",
								filter: "blur(5px)",
								delay: 0.25 + i * 0.065,
								ease: "expo.out",
								scrollTrigger: {
									trigger: wa_el,
									start: "top 86%",
									toggleActions: "play none none none",
								},
							});
						});
					} else if ($(wa_el).hasClass("split-words-scale")) {
						let atDelay =
							parseFloat(wa_el.getAttribute("data-delay")) || 0;

						wa_split.split({ type: "words" });
						split_type_set = wa_split.words;

						gsap.set(split_type_set, {
							opacity: 0,
							scale: (i) => (i % 2 === 0 ? 0 : 2),
							force3D: true,
						});

						gsap.to(split_type_set, {
							scrollTrigger: {
								trigger: wa_el,
								toggleActions: "play reverse play reverse",
								start: "top 86%",
							},
							rotateX: 0,
							scale: 1,
							opacity: 1,
							stagger: 0.03,
							delay: atDelay,
						});
					} else {
						var wa_anim = gsap.from(split_type_set, settings);

						if ($(wa_el).hasClass("hover-split-text")) {
							$(wa_el).on("mouseenter", function () {
								wa_anim.restart();
							});
						}
					}
				});
			}
			wa_split_text();

			document.querySelectorAll(".wa_split_2").forEach((atEl) => {
				const atSplit = new SplitText(atEl, {
					type: "words,chars",
					wordsClass: "word",
					charsClass: "char",
				});

				let atDuration =
					parseFloat(atEl.getAttribute("data-speed")) || 1;
				let atDelay = parseFloat(atEl.getAttribute("data-delay")) || 0;

				if (window.innerWidth <= 768) {
					atDuration = atDuration * 0.3;
				}

				gsap.set(atSplit.words, {
					willChange: "transform",
					perspective: 1000,
					transformStyle: "preserve-3d",
				});

				gsap.set(atSplit.chars, {
					willChange: "transform",
					opacity: 0,
					rotateX: -80,
					transformOrigin: "center center -10px",
				});

				gsap.set(atEl, {
					perspective: 1000,
					transformStyle: "preserve-3d",
				});

				gsap.to(atSplit.chars, {
					scrollTrigger: {
						trigger: atEl,
						start: "top 80%",
					},
					opacity: 1,
					rotateX: 0,
					duration: atDuration,
					delay: atDelay,
					ease: "power3.out",
					stagger: {
						each: 0.05,
						from: "center",
						grid: "auto",
					},
				});
			});

			/*
			hero-4-title-animation
		*/
			if ($(".wa-split-up-1").length) {
				var wa_split_up_1 = $(".wa-split-up-1");
				if (wa_split_up_1.length == 0) return;
				gsap.registerPlugin(SplitText);
				wa_split_up_1.each(function (index, el) {
					el.split = new SplitText(el, {
						type: "lines,words,chars",
						linesClass: "split-line",
					});

					let delayValue = $(el).attr("data-split-delay") || "0s";
					delayValue = parseFloat(delayValue) || 0;

					if ($(el).hasClass("wa-split-up-1")) {
						gsap.set(el.split.chars, {
							scaleY: 1.5,
							rotate: 10,
							opacity: 0,
						});
					}

					el.anim = gsap.to(el.split.chars, {
						scrollTrigger: {
							trigger: el,
							toggleActions: "play none none reverse",
						},
						opacity: 1,
						scaleY: 1,
						rotate: 0,
						duration: 0.6,
						ease: "expo.out",
						stagger: -0.08,
						delay: delayValue,
					});
				});
			}

			// home-3-title-animation
			document.querySelectorAll(".wa_title_spilt_1").forEach((atEl) => {
				const atSplit = new SplitText(atEl, {
					type: "words,chars",
					wordsClass: "word",
					charsClass: "char",
				});

				let atDuration =
					parseFloat(atEl.getAttribute("data-speed")) || 1;
				let atDelay = parseFloat(atEl.getAttribute("data-delay")) || 0;

				if (window.innerWidth <= 768) {
					atDuration = atDuration * 0.3;
				}

				gsap.set(atSplit.words, {
					willChange: "transform",
					perspective: 1000,
					transformStyle: "preserve-3d",
				});

				gsap.set(atSplit.chars, {
					willChange: "transform",
					opacity: 0,
					x: 30,
					rotateZ: -45,
					rotateY: -90,
					transformOrigin: "center center -10px",
				});

				gsap.set(atEl, {
					perspective: 1000,
					transformStyle: "preserve-3d",
				});

				gsap.to(atSplit.chars, {
					scrollTrigger: {
						trigger: atEl,
						start: "top 86%",
						toggleActions: "play none none reverse",
					},
					opacity: 1,
					x: 0,
					rotateZ: 0,
					rotateY: 0,
					duration: atDuration,
					delay: atDelay,
					ease: "ease1",
					// stagger: .03,
					stagger: {
						each: 0.03,
						from: "left",
						grid: "auto",
					},
				});
			});
		}

		if (typeof window.resolvePreloader === "function") {
			window.resolvePreloader();
		}
	}

	/*
	after-page-load-start
*/
	function afterPageLoad() {
		// add-active-class
		const waAddClass = gsap.utils.toArray(".wa_add_class");
		waAddClass.forEach((waAddClassItem) => {
			gsap.to(waAddClassItem, {
				scrollTrigger: {
					trigger: waAddClassItem,
					start: "top 90%",
					end: "bottom bottom",
					toggleActions: "play none none reverse",
					toggleClass: "active",
					once: true,
					markers: false,
				},
			});
		});

		// hero-1-sun-animation
		if ($(".st-hero-1-area").length) {
			const items = document.querySelectorAll(".st-hero-1-area");
			items.forEach((item) => {
				const flair = item.querySelector(".st-hero-1-bg-sun");

				// initial state
				gsap.set(flair, {
					scale: 0,
					opacity: 0,
					xPercent: -50,
					yPercent: -50,
					rotate: 0,
				});

				// mouse enter
				item.addEventListener("mouseenter", () => {
					gsap.to(flair, {
						scale: 1,
						opacity: 1,
						rotate: 14,
						duration: 0.4,
						ease: "power3.out",
					});
				});

				// mouse move (optimized)
				item.addEventListener("mousemove", (e) => {
					const rect = item.getBoundingClientRect();

					const x = e.clientX - rect.left;
					const y = e.clientY - rect.top;

					gsap.to(flair, {
						x: x,
						y: y,
						duration: 0.8,
						ease: "power3.out",
						overwrite: "auto",
					});
				});

				// mouse leave
				item.addEventListener("mouseleave", () => {
					gsap.to(flair, {
						scale: 0,
						opacity: 0,
						rotate: 0,
						duration: 0.4,
						ease: "power3.in",
					});
				});
			});
		}

		/*
	after-page-load-start
*/
	}

	// button-animation
	if ($(".wa_btn_split_1").length) {
		var wa_btn_split_1 = $(".wa_btn_split_1");
		gsap.registerPlugin(SplitText);

		wa_btn_split_1.each(function (index, el) {
			el.split = new SplitText(el, {
				type: "words,chars",
			});

			$(el).on("mouseenter", function () {
				el.split.chars.forEach((char, i) => {
					gsap.fromTo(
						char,
						{ x: 15, opacity: 0 },
						{
							x: 0,
							opacity: 1,
							duration: 0.6,
							ease: "power1.out",
							delay: i * 0.07,
						},
					);
				});
			});
		});
	}

	// home-1-bg-line-animation
	if ($(".st-bg-border-line").length) {
		let mouse = { x: 0, y: 0 };

		document.addEventListener("mousemove", (e) => {
			mouse.x = e.clientX;
			mouse.y = e.clientY;
		});

		function animate() {
			document.querySelectorAll(".st-bg-border-line").forEach((line) => {
				const rect = line.getBoundingClientRect();

				const x = mouse.x - rect.left;
				const y = mouse.y - rect.top;

				line.style.setProperty("--x", x + "px");
				line.style.setProperty("--y", y + "px");
			});

			requestAnimationFrame(animate);
		}

		animate();
	}

	// services-1
	if (window.matchMedia("(min-width: 1400px)").matches) {
		if ($(".st-services-1-area").length) {
			const section = document.querySelector(".st-services-1-area");
			const prevImgs = gsap.utils.toArray(
				".st-services-1-item-prev-img-single",
			);
			const mainImgs = gsap.utils.toArray(
				".st-services-1-item-main-img .st-services-1-item-main-img-single",
			);
			const nextImgs = gsap.utils.toArray(
				".st-services-1-item-next-img .st-services-1-item-main-img-single",
			);
			const numbers = gsap.utils.toArray(
				".st-services-1-item-number .number-single",
			);
			const subtitles = gsap.utils.toArray(
				".st-services-1-item-subtitle .subtitle-elm",
			);
			const contents = gsap.utils.toArray(
				".st-services-1-item-content-box",
			);

			let currentIndex = 0;
			let total = prevImgs.length;
			let isAnimating = false;

			gsap.set(prevImgs, { xPercent: 100 });
			gsap.set(mainImgs, { xPercent: 105 });
			gsap.set(nextImgs, { xPercent: 105 });
			gsap.set(numbers, { y: 120 });

			gsap.set([prevImgs[0], mainImgs[0], nextImgs[0]], { xPercent: 0 });
			gsap.set(numbers[0], { y: 0 });

			ScrollTrigger.create({
				trigger: section,
				start: "top top",
				pin: ".st-services-1-pin",
				anticipatePin: 1,
			});

			function goToSlide(newIndex) {
				if (isAnimating) return;
				if (newIndex < 0 || newIndex >= total) return;

				isAnimating = true;

				const tl = gsap.timeline({
					defaults: { duration: 0.8, ease: "power1.inOut" },
					onComplete: () => {
						currentIndex = newIndex;
						isAnimating = false;
					},
				});

				let out = currentIndex;
				let next = newIndex;

				tl.to(prevImgs[out], { xPercent: -100 }, 0)
					.to(mainImgs[out], { xPercent: -105, yPercent: -105 }, 0)
					.to(nextImgs[out], { xPercent: -105, yPercent: -105 }, 0)
					.to(numbers[out], { y: -120 }, 0)

					.fromTo(
						prevImgs[next],
						{ xPercent: 100 },
						{ xPercent: 0 },
						0,
					)
					.fromTo(
						mainImgs[next],
						{ xPercent: 105, yPercent: 105 },
						{ xPercent: 0, yPercent: 0 },
						0,
					)
					.fromTo(
						nextImgs[next],
						{ xPercent: 105, yPercent: 105 },
						{ xPercent: 0, yPercent: 0 },
						0,
					)
					.fromTo(numbers[next], { y: 120 }, { y: 0 }, 0);

				subtitles.forEach((el) => el.classList.remove("active"));
				contents.forEach((el) => el.classList.remove("active"));

				subtitles[next].classList.add("active");
				contents[next].classList.add("active");
			}

			let observer;

			ScrollTrigger.create({
				trigger: section,
				start: "top top",
				end: "bottom bottom",

				onEnter: () => enableObserver(),
				onEnterBack: () => enableObserver(),
				onLeave: () => disableObserver(),
				onLeaveBack: () => disableObserver(),
			});

			function enableObserver() {
				observer = Observer.create({
					type: "wheel,touch,pointer",
					wheelSpeed: 1,
					tolerance: 10,

					onDown: () => {
						if (currentIndex < total - 1) {
							goToSlide(currentIndex + 1);
						}
					},

					onUp: () => {
						if (currentIndex > 0) {
							goToSlide(currentIndex - 1);
						}
					},
				});
			}

			function disableObserver() {
				if (observer) observer.kill();
			}
		}
	}

	// fact-1-active-class-add
	if ($(".st-facts-1-client").length) {
		const section = document.querySelector(".st-facts-1-client");

		if (section) {
			ScrollTrigger.create({
				trigger: section,
				start: "top 10%",
				once: true,
				toggleClass: {
					targets: section,
					className: "active",
					markers: true,
				},
			});
		}
	}

	// choose-1-lens
	let stC1bgLens = gsap.timeline({
		scrollTrigger: {
			trigger: ".st-choose-1-bg-lens",
			toggleActions: "play none none none",
			start: "top 60%",
			end: "top 20%",
			markers: false,
			scrub: true,
		},
	});
	stC1bgLens.from(".st-choose-1-bg-lens .img-elm", {
		yPercent: -100,
		rotate: 90,
	});
	stC1bgLens.from(
		".st-choose-1-bg-lens .shadow-elm",
		{
			autoAlpha: 0,
		},
		"<20%",
	);

	if ($("#beforeafter").length) {
		$("#beforeafter").twentytwenty();
	}

	// expertise-1-img-cursor-follow
	if ($(".st-expertise-1-item").length) {
		const featureItems = document.querySelectorAll(".st-expertise-1-item");

		featureItems.forEach((featureItem) => {
			const flair = featureItem.querySelector(".cursor-follow");

			gsap.set(flair, {
				scale: 0,
				opacity: 0,
				xPercent: -50,
				yPercent: -80,
				rotate: 0,
			});

			featureItem.addEventListener("mouseenter", () => {
				gsap.to(flair, {
					scale: 1,
					opacity: 1,
					duration: 0.4,
					rotate: 14,
					ease: "power3.out",
				});
			});

			featureItem.addEventListener("mousemove", (e) => {
				const rect = featureItem.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;
				gsap.to(flair, { x, y, duration: 0.1 });
			});

			featureItem.addEventListener("mouseleave", () => {
				gsap.to(flair, {
					scale: 0,
					opacity: 0,
					rotate: 0,
					duration: 0.4,
					ease: "power3.in",
				});
			});
		});
	}

	// footer-1-dot-animation
	const paths = document.querySelectorAll(".f1_dot_ani path");

	paths.forEach((path) => {
		function animatePath() {
			gsap.to(path, {
				opacity: Math.random() > 0.5 ? 1 : 0,
				duration: Math.random() * 0.6 + 0.2,
				delay: Math.random() * 0.2,
				onComplete: animatePath,
				ease: "power1.inOut",
			});
		}
		animatePath();
	});

	/*
			footer-1-text-animation
		*/
	if ($(".st-footer-1-big-title .text-elm").length) {
		var waSplitup2hero2 = $(".st-footer-1-big-title .text-elm");
		if (waSplitup2hero2.length == 0) return;
		gsap.registerPlugin(SplitText);
		waSplitup2hero2.each(function (index, el) {
			el.split = new SplitText(el, {
				type: "lines,words,chars",
				linesClass: "split-line",
			});

			if ($(el).hasClass("text-elm")) {
				gsap.set(el.split.chars, {
					yPercent: 60,
				});
			}

			el.anim = gsap.to(el.split.chars, {
				scrollTrigger: {
					trigger: el,
					end: "top 10%",
					toggleActions: "play none none reverse",
					// scrub: true,
				},
				opacity: 1,
				yPercent: 0,
				duration: 0.2,
				ease: "ease1",
				stagger: 0.08,
			});
		});
	}
	var asP3bigTitle = gsap.timeline({
		scrollTrigger: {
			trigger: ".st-footer-1-big-title",
			end: "top 10%",
			toggleActions: "play none none reverse",
			// scrub: true,
			markers: false,
		},
	});

	asP3bigTitle.from(".st-footer-1-big-title .text-elm", {
		xPercent: 100,
		duration: 2,
	});

	// services-2
	if (window.matchMedia("(min-width: 1400px)").matches) {
		if ($(".st-services-2-area").length) {
			const area = document.querySelector(".st-services-2-area");
			const items = document.querySelectorAll(
				".st-services-2-item-single",
			);
			const images = document.querySelectorAll(
				".st-services-2-item-img-single",
			);

			const total = items.length;

			area.style.height = (total - 1) * 100 + "vh";
			images.forEach((card, index) => {
				card.style.zIndex = -index + 1;
			});

			let tl = gsap.timeline({
				scrollTrigger: {
					trigger: ".st-services-2-area",
					start: "top top",
					end: "bottom bottom",
					scrub: true,

					onUpdate: (self) => {
						let index = Math.round(self.progress * (total - 1));

						items.forEach((el) => el.classList.remove("active"));
						items[index].classList.add("active");
					},
				},
			});

			items.forEach((item, i) => {
				if (i === 0) return;

				tl.to(".st-services-2-item", {
					y: -(i * 150),
					duration: 1,
				});

				tl.to(
					images[i - 1],
					{
						x: "130%",
						autoAlpha: 0,
						duration: 1,
					},
					"<",
				);

				tl.to(
					images,
					{
						rotate: (index) => {
							if (index >= i) return (index - i) * 10;
						},
						duration: 1,
					},
					"<",
				);
			});
		}
	}

	// about-2-camera
	if ($(".st-about-2-area").length) {
		gsap.from(".st-about-2-camera-img", {
			yPercent: -100,
			autoAlpha: 0,
			scale: 0.8,
			duration: 1.2,
			ease: "bounce.out",
			scrollTrigger: {
				trigger: ".st-about-2-area",
				start: "top 50%",
				toggleActions: "play none none none",
			},
		});
	}

	// magnifier-lens
	if ($(".wa_magnifier_lens").length) {
		document.querySelectorAll(".wa_magnifier_lens").forEach((container) => {
			const img = container.querySelector("img");
			const lens = container.querySelector(".wa_magnifier_lens_circle");

			container.addEventListener("mouseenter", () => {
				lens.style.display = "block";
				lens.style.backgroundImage = `url(img.html)`;
			});

			container.addEventListener("mouseleave", () => {
				lens.style.display = "none";
			});

			container.addEventListener("mousemove", (e) => {
				const rect = container.getBoundingClientRect();

				let x = e.clientX - rect.left;
				let y = e.clientY - rect.top;

				const lensSize = 200;
				const zoom = 2;

				let lensX = x - lensSize / 2;
				let lensY = y - lensSize / 2;

				lens.style.left = lensX + "px";
				lens.style.top = lensY + "px";

				let bgX = -(x * zoom - lensSize / 2);
				let bgY = -(y * zoom - lensSize / 2);

				lens.style.backgroundPosition = `${bgX}px ${bgY}px`;
				lens.style.backgroundSize = `${container.offsetWidth * zoom}px ${container.offsetHeight * zoom}px`;
			});
		});
	}

	// services-2
	if (window.matchMedia("(min-width: 1200px)").matches) {
		if ($(".st-projects-2-height").length) {
			const section = document.querySelector(".st-projects-2-height");
			const items = document.querySelectorAll(
				".st-projects-2-item-single",
			);

			section.style.height = `${items.length * 100}vh`;

			gsap.set(".st-projects-2-item-single:not(:first-child)", {
				yPercent: 100,
				rotate: -30,
			});

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: ".st-projects-2-height",
					start: "top top",
					end: "bottom bottom",
					scrub: true,
					markers: false,
				},
			});

			const itemsAll = gsap.utils.toArray(".st-projects-2-item-single");

			itemsAll.forEach((item, index) => {
				if (index !== 0) {
					tl.to(
						item,
						{
							yPercent: 0,
							rotate: 0,
							duration: 1,
						},
						"<70%",
					);
				}
			});
		}
	}

	// choose-2-animation
	if (window.matchMedia("(min-width: 1400px)").matches) {
		if ($(".st-projects-2-height").length) {
			ScrollTrigger.create({
				trigger: ".st-choose-2-height",
				start: "top 8%",
				end: "bottom bottom",
				pin: ".st-choose-2-pin",
				invalidateOnRefresh: true,
				markers: false,
			});

			const st_projects_2_tl = gsap.timeline({
				scrollTrigger: {
					trigger: ".st-choose-2-height",
					start: "top top",
					end: "bottom bottom",
					scrub: true,
					markers: false,
				},
			});

			st_projects_2_tl.to(".st-choose-2-wrap", {
				x: -600,
			});

			st_projects_2_tl.to(
				".st-choose-2-left",
				{
					autoAlpha: 0,
				},
				"<50%",
			);
		}
	}

	// testimonial-2-camera
	if ($(".st-testimonial-2-bg-camera").length) {
		gsap.from(".st-testimonial-2-bg-camera img", {
			yPercent: -300,
			scale: 0.8,
			duration: 1,
			ease: "bounce.out",
			scrollTrigger: {
				trigger: ".st-testimonial-2-bg-camera",
				start: "top 70%",
				toggleActions: "play none none none",
			},
		});
	}

	// contact-2-animation
	if (window.matchMedia("(min-width: 1200px)").matches) {
		const st_contact_2_tl = gsap.timeline({
			scrollTrigger: {
				trigger: ".st-contact-2-area",
				start: "top top",
				end: "bottom bottom",
				scrub: true,
				markers: false,
			},
		});

		st_contact_2_tl.fromTo(
			".st-contact-2-bg-img .single-img",
			{
				transform: "translate3d(0px, 919px, -900px) rotateX(-70deg)",
				autoAlpha: 0,
			},
			{
				transform: "translate3d(0px, 0px, 0px) rotateX(0deg)",
				autoAlpha: 1,
				stagger: {
					each: 0.05,
					from: "center",
					grid: "auto",
				},
			},
		);

		st_contact_2_tl.to(".st-contact-2-bg-img", {
			opacity: 0.24,
		});

		st_contact_2_tl.fromTo(
			".st-contact-2-content .has_animated",
			{
				transform: "translate3d(0px, 300px, -300px) rotateX(-90deg)",
				autoAlpha: 0,
			},
			{
				transform: "translate3d(0px, 0px, 0px) rotateX(0deg)",
				autoAlpha: 1,
				stagger: 0.05,
			},
			"<80%",
		);
	}

	// footer-2-fixed
	if (window.matchMedia("(min-width: 1200px)").matches) {
		if ($(".st-footer-2-area").length) {
			function setDynamicFooterSpacing() {
				const footer = document.querySelector(".st-footer-2-area");
				const target = document.querySelector(".st-home-2-bg-color");

				if (footer && target) {
					const footerHeight = footer.offsetHeight;
					target.style.marginBottom = footerHeight + "px";
				}
			}

			setDynamicFooterSpacing();

			window.addEventListener("resize", setDynamicFooterSpacing);
		}
	}

	// about-3-img
	gsap.from(".st-about-3-img-2 img", {
		yPercent: -100,
		autoAlpha: 0,
		scale: 0.8,
		duration: 1.2,
		ease: "bounce.out",
		scrollTrigger: {
			trigger: ".st-about-3-img-2",
			start: "top 50%",
			toggleActions: "play none none none",
		},
	});
	gsap.from(".st-about-3-img-3", {
		yPercent: -100,
		autoAlpha: 0,
		scale: 0.8,
		duration: 1.2,
		ease: "bounce.out",
		scrollTrigger: {
			trigger: ".st-about-3-img-3",
			start: "top 50%",
			toggleActions: "play none none none",
		},
	});

	// services-3-hover-change
	if ($(".st-services-3-card-single").length) {
		const cards = document.querySelectorAll(".st-services-3-card-single");
		const contents = document.querySelectorAll(
			".st-services-3-card-content-single",
		);

		cards.forEach((card, index) => {
			card.addEventListener("mouseenter", () => {
				cards.forEach((c) => c.classList.remove("active"));

				contents.forEach((c) => c.classList.remove("active"));

				card.classList.add("active");
				contents[index].classList.add("active");
			});
		});
	}

	//
	if (window.matchMedia("(min-width: 1600px)").matches) {
		let st_services_3_tl = gsap.timeline({
			scrollTrigger: {
				trigger: ".st-services-3-area",
				start: "top 6%",
				end: "bottom bottom",
				toggleActions: "play none none reverse",
				scrub: true,
				markers: false,
			},
		});
		st_services_3_tl.from(".st-services-3-card-single:nth-of-type(3)", {
			y: -556,
			scale: 1.2,
		});
		st_services_3_tl.from(".st-services-3-card-single:nth-of-type(1)", {
			y: 0,
			x: 628,
			rotate: 0,
			autoAlpha: 0,
		});
		st_services_3_tl.from(
			".st-services-3-card-single:nth-of-type(5)",
			{ y: 0, x: -628, rotate: 0, autoAlpha: 0 },
			"<",
		);
		st_services_3_tl.from(
			".st-services-3-card-single:nth-of-type(2)",
			{ y: 0, x: 313, rotate: 0, autoAlpha: 0 },
			"<30%",
		);
		st_services_3_tl.from(
			".st-services-3-card-single:nth-of-type(4)",
			{ y: 0, x: -313, rotate: 0, autoAlpha: 0 },
			"<",
		);
	}

	// projects-3-animation
	if ($(".st-projects-3-bottom-card-single").length) {
		if (window.matchMedia("(min-width: 1200px)").matches) {
			let st_projects_3_tl = gsap.timeline({
				scrollTrigger: {
					trigger: ".st-projects-3-top-height",
					start: "top 70%",
					end: "bottom bottom",
					toggleActions: "play none none reverse",
					scrub: true,
					markers: false,
				},
			});
			st_projects_3_tl.from(".st-projects-3-top-img", { scale: 0 });
			st_projects_3_tl.to(".st-projects-3-top-img.has-img-2", {
				y: 1000,
				x: 710,
				filter: "blur(5px)",
			});
			st_projects_3_tl.to(
				".st-projects-3-top-img.has-img-3",
				{ y: 1000, x: -610, filter: "blur(5px)" },
				"<",
			);
			st_projects_3_tl.to(
				".st-projects-3-top-img.has-img-4",
				{ y: 1000, x: 560, filter: "blur(5px)" },
				"<",
			);
			st_projects_3_tl.to(
				".st-projects-3-top-img.has-img-5",
				{ y: 1000, x: -500, filter: "blur(5px)" },
				"<",
			);
			st_projects_3_tl.to(
				".st-projects-3-top-img.has-img-6",
				{ y: 1000, x: 330, filter: "blur(5px)" },
				"<",
			);
			st_projects_3_tl.to(
				".st-projects-3-top-img.has-img-7",
				{ y: 1000, x: 180, filter: "blur(5px)" },
				"<",
			);
			st_projects_3_tl.to(
				".st-projects-3-top-img.has-img-8",
				{ y: 1000, x: -170, filter: "blur(5px)" },
				"<",
			);
			st_projects_3_tl.to(
				".st-projects-3-top-img.has-img-1",
				{ y: 1000 },
				"<40%",
			);
			st_projects_3_tl.from(
				".st-projects-3-top-text-elm",
				{ yPercent: 110 },
				"<-30%",
			);

			const cards = document.querySelectorAll(
				".st-projects-3-bottom-card-single",
			);

			cards.forEach((card) => {
				const content = card.querySelector(".content-wrap");
				const img = card.querySelector(".card-img img");

				gsap.to(content, {
					y: -50,
					opacity: 0,
					ease: "none",
					scrollTrigger: {
						trigger: card,
						start: "top 0%",
						end: "top -30%",
						scrub: true,
					},
				});

				// image scale animation (bottom → visible)
				gsap.fromTo(
					img,
					{
						scale: 1.3,
					},
					{
						scale: 1,
						ease: "none",
						scrollTrigger: {
							trigger: card,
							start: "top 90%",
							end: "top 20%",
							scrub: true,
						},
					},
				);
			});

			let st_projects_3_tl2 = gsap.timeline({
				scrollTrigger: {
					trigger: ".st-projects-3-bottom",
					start: "top -30%",
					end: "bottom bottom",
					toggleActions: "play none none reverse",
					scrub: true,
					markers: false,
				},
			});
			st_projects_3_tl2.to(".st-projects-3-preview-active", {
				top: "93%",
			});
		}
	}

	// choose-3-start
	if (window.matchMedia("(min-width: 1200px)").matches) {
		let st_choose_3_img_tl = gsap.timeline({
			scrollTrigger: {
				trigger: ".st-choose-3-area",
				start: "top 80%",
				toggleActions: "play none none reverse",
				scrub: true,
				markers: false,
			},
		});
		st_choose_3_img_tl.fromTo(
			".st-choose-3-img",
			{ yPercent: 80 },
			{ yPercent: -20 },
		);
	}



	// footer-3-img
	if (window.matchMedia("(min-width: 1200px)").matches) {
		let st_projects_3_tl = gsap.timeline({
			scrollTrigger: {
				trigger: ".st-footer-3-area",
				start: "top 50%",
				end: "bottom bottom",
				toggleActions: "play none none reverse",
				scrub: true,
				markers: false,
			},
		});
		st_projects_3_tl.from(".st-footer-3-g-img-1", { yPercent: 100 });
		st_projects_3_tl.from(
			".st-footer-3-g-img-2",
			{ yPercent: 100 },
			"<20%",
		);
	}

	if (document.querySelectorAll("#wa_liquid_img2").length) {
		function initWaLiquidEffect2(waWrapper2) {
			const waImg2 = waWrapper2.querySelector("img");
			if (!waImg2) return;

			const waImageURL2 = waImg2.getAttribute("src");
			waImg2.remove();

			const { width: waWidth2, height: waHeight2 } =
				waWrapper2.getBoundingClientRect();

			const waApp2 = new PIXI.Application({
				width: waWidth2,
				height: waHeight2,
				transparent: true,
				autoDensity: true,
				resolution: window.devicePixelRatio,
			});
			waApp2.view.style.pointerEvents = "none";

			waWrapper2.appendChild(waApp2.view);

			const waDisplacementURL2 =
				$(".st-about-1-area").data("masking-shape");

			waApp2.loader
				.add("waHero2", waImageURL2)
				.add("waDisplacement2", waDisplacementURL2)
				.load((waLoader2, waResources2) => {
					const waContainer2 = new PIXI.Container();
					waApp2.stage.addChild(waContainer2);

					const waHero2 = new PIXI.Sprite(
						waResources2.waHero2.texture,
					);
					waContainer2.addChild(waHero2);

					const waTextureRatio2 =
						waHero2.texture.width / waHero2.texture.height;
					const waContainerRatio2 = waWidth2 / waHeight2;

					if (waContainerRatio2 > waTextureRatio2) {
						waHero2.width = waWidth2;
						waHero2.height = waWidth2 / waTextureRatio2;
					} else {
						waHero2.height = waHeight2;
						waHero2.width = waHeight2 * waTextureRatio2;
					}

					waHero2.x = (waWidth2 - waHero2.width) / 2;
					waHero2.y = (waHeight2 - waHero2.height) / 2;

					const waDispSprite2 = new PIXI.Sprite(
						waResources2.waDisplacement2.texture,
					);
					waDispSprite2.texture.baseTexture.wrapMode =
						PIXI.WRAP_MODES.REPEAT;

					const waDispFilter2 = new PIXI.filters.DisplacementFilter(
						waDispSprite2,
					);
					waDispSprite2.scale.set(2);

					waApp2.stage.addChild(waDispSprite2);
					waContainer2.filters = [waDispFilter2];

					let animationActive = false;

					waApp2.ticker.add(() => {
						if (animationActive) {
							waDispSprite2.x += 1;
							waDispSprite2.y += 1;
						}
					});

					waDispFilter2.scale.x = -400;
					waDispFilter2.scale.y = -400;

					function waPlayDistortionOut2() {
						gsap.to(waDispFilter2.scale, {
							x: 0,
							y: 0,
							duration: 2,
							ease: "expo.out",
							onComplete: () => {
								animationActive = true;
							},
						});
					}

					waWrapper2._playDistortionOut = waPlayDistortionOut2;
				});
		}

		const waObserver2 = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						if (entry.target._playDistortionOut) {
							entry.target._playDistortionOut();
						}
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.3 },
		);

		document.querySelectorAll("#wa_liquid_img2").forEach((el) => {
			initWaLiquidEffect2(el);
			waObserver2.observe(el);

			if (
				el.getBoundingClientRect().top < window.innerHeight &&
				el.getBoundingClientRect().bottom > 0
			) {
				let checkReady = setInterval(() => {
					if (el._playDistortionOut) {
						el._playDistortionOut();
						clearInterval(checkReady);
					}
				}, 50);
			}
		});
	}

	// booking-calendar-activation
	if ($("#my-cal").length) {
		const cal = new WACalendar("#my-cal");
	}

	if ($(".wa_cursor_tracking").length) {
		$(".wa_cursor_tracking").each(function () {
			const $card = $(this);
			const $btn = $card.find(".wa_cursor_tracking_elm");

			gsap.set($btn, {
				xPercent: -50,
				yPercent: -50,
			});

			$card.on("mousemove", function (e) {
				const rect = this.getBoundingClientRect();

				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;

				gsap.to($btn, {
					x: x,
					y: y,
					duration: 0.3,
					ease: "power2.out",
				});
			});

			$card.on("mouseenter", function (e) {
				const rect = this.getBoundingClientRect();

				gsap.set($btn, {
					x: e.clientX - rect.left,
					y: e.clientY - rect.top,
				});

				gsap.to($btn, {
					opacity: 1,
					visibility: "visible",
					duration: 0.2,
				});
			});

			$card.on("mouseleave", function () {
				gsap.to($btn, {
					opacity: 0,
					visibility: "hidden",
					duration: 0.2,
				});
			});
		});
	}

	if ($(".grid").length) {
		var $grid = $(".grid").imagesLoaded(function () {
			$grid.masonry({
				itemSelector: ".grid-item",
				// use element for option
				columnWidth: ".grid-sizer",
				percentPosition: true,
			});
		});
	}

})(jQuery);
