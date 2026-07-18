(function ($) {
	"use strict";

	// --- TouchSpin ---
	const TOUCHSPIN_OPTIONS = {
		min: 1,
		max: 1000,
		step: 1,
		buttondown_class: "btn btn-link",
		buttonup_class: "btn btn-link",
	};

	function initTouchSpin() {
		const $inputs = $("input.product-count");
		if ($inputs.length) $inputs.TouchSpin(TOUCHSPIN_OPTIONS);
	}

	initTouchSpin();
	$(document).on("woosq_loaded", initTouchSpin);

	// --- Preloader ---

	let resolvePreloader;
	const preloaderDone = new Promise(function (resolve) {
		resolvePreloader = resolve;
	});

	function afterPreloader() {
		resolvePreloader();
	}

	function afterPageLoad() {
		// reserved for post-load hooks
	}

	window.resolvePreloader = resolvePreloader;
	window.afterPageLoad = afterPageLoad;

	// --- Utilities ---

	function bgImageActive($scope) {
		$scope.find("[data-background]").each(function () {
			$(this).css(
				"background-image",
				"url(" + $(this).attr("data-background") + ")",
			);
		});
	}

	function moveAuthor($scope) {
		const $author = $scope.find(".tx-authorWrapper");
		const $target = $scope.find(".tx-authorAppend");
		if ($author.length && $target.length) $target.append($author);
	}

	// --- Widget Functions ---
	function tx_service_section($scope) {
		if ($(".st_process_2_slider").length) {
			let st_process_2_slider = new Swiper(".st_process_2_slider", {
				loop: true,
				speed: 1000,
				autoplay: { delay: 3000 },
			});
		}
	}

	function tx_hero_section($scope) {
		if ($('.st_h1_gallery_slider').length) {
			let st_h1_gallery_slider = new Swiper('.st_h1_gallery_slider', {
				loop: true,
				spaceBetween: 25,
				speed: 1000,

				autoplay: { delay: 4000 },


				centeredSlides: true,
				roundLengths: true,

				on: {
					init: function () {
						setTimeout(() => {
							this.slideNext();
						}, 1900);
					},

				},

				breakpoints: {
					320: {
					slidesPerView: 1,
					},
					576: {
					slidesPerView: 2,
					},
					768: {
					slidesPerView: 3,
					},
					992: {
					slidesPerView: 3,
					},
					1200: {
					slidesPerView: 4,
					},
					1400: {
					slidesPerView: 5,
					},
					1600: {
					slidesPerView: 6,
					},
					1800: {
					slidesPerView: 7,
					},
				},

			});

		}



		// hero-1-tl-1
		let hero1tl1 = gsap.timeline()
		hero1tl1.from(".st-hero-1-gallery", {
			y: 50,
			autoAlpha: 0,
			duration: 1,
			ease: "expo.out",
			delay: .8,
		})
		hero1tl1.from(".st-hero-1-gallery-slider .swiper-slide", {
			autoAlpha: 0,
			duration: 1,
			ease: "expo.out",
			stagger: {
				each: 0.05,
				from: "center",
			},
		},"<50%")

		// hero-2-slider
		if ($(".st_h2_gallery_slider").length) {
			let st_h2_gallery_slider = new Swiper(".st_h2_gallery_slider", {
				loop: true,
				spaceBetween: 20,
				speed: 1000,
				slidesPerView: "auto",
				centeredSlides: true,
				roundLengths: true,

				autoplay: {
					delay: 3000,
					disableOnInteraction: false,
				},

				on: {
					init: function () {
						setTimeout(() => {
							this.slideNext();
						}, 100);
					},

					slideChangeTransitionEnd: function () {
						const elements = document.querySelectorAll(
							".st-hero-2-man, .st-hero-2-slider",
						);

						elements.forEach((el) => el.classList.add("active"));

						setTimeout(() => {
							elements.forEach((el) =>
								el.classList.remove("active"),
							);
						}, 1000);
					},
				},
			});
		}
	}

	// tx_hero_slider
	function tx_hero_slider($scope) {
		if ($(".st_h3_slider_active").length) {
			const WA_DISP_IMG = $(".st-hero-3-area").data("masking-shape");
			let pixiApp = null;
			let currentDispSprite = null;
			let resizeTimer = null;
			const textureCache = {};

			function preloadTextures(urls, callback) {
				const loader = new PIXI.Loader();
				const toLoad = [];

				if (
					!textureCache["waDisp"] &&
					!PIXI.utils.TextureCache[WA_DISP_IMG]
				) {
					toLoad.push({ key: "waDisp", url: WA_DISP_IMG });
				}

				urls.forEach((url) => {
					if (
						url &&
						!textureCache[url] &&
						!PIXI.utils.TextureCache[url] &&
						!toLoad.find((item) => item.url === url)
					) {
						toLoad.push({ key: url, url: url });
					}
				});

				if (toLoad.length === 0) {
					if (
						!textureCache["waDisp"] &&
						PIXI.utils.TextureCache[WA_DISP_IMG]
					) {
						textureCache["waDisp"] =
							PIXI.utils.TextureCache[WA_DISP_IMG];
					}
					urls.forEach((url) => {
						if (
							url &&
							!textureCache[url] &&
							PIXI.utils.TextureCache[url]
						) {
							textureCache[url] = PIXI.utils.TextureCache[url];
						}
					});
					return callback();
				}

				toLoad.forEach((item) =>
					loader.add(item.key, item.url, { crossOrigin: true }),
				);

				loader.load((ldr, res) => {
					if (!textureCache["waDisp"]) {
						if (res["waDisp"]) {
							textureCache["waDisp"] = res["waDisp"].texture;
						} else if (PIXI.utils.TextureCache[WA_DISP_IMG]) {
							textureCache["waDisp"] =
								PIXI.utils.TextureCache[WA_DISP_IMG];
						}
					}
					urls.forEach((url) => {
						if (url && !textureCache[url]) {
							if (res[url]) {
								textureCache[url] = res[url].texture;
							} else if (PIXI.utils.TextureCache[url]) {
								textureCache[url] =
									PIXI.utils.TextureCache[url];
							}
						}
					});
					callback();
				});

				loader.onError.add((err) => {
					console.warn("PIXI Loader error:", err);
					callback();
				});
			}

			function getOrCreateApp(imgWrap, w, h) {
				if (pixiApp) {
					pixiApp.renderer.resize(w, h);

					const existingWrap =
						document.querySelector(".wa-pixi-wrap");
					if (existingWrap && existingWrap.parentNode !== imgWrap) {
						imgWrap.appendChild(existingWrap);
					}
					return pixiApp;
				}

				const wrap = document.createElement("div");
				wrap.className = "wa-pixi-wrap";
				wrap.style.cssText =
					"position:absolute;inset:0;z-index:1;pointer-events:none;will-change:transform;";
				imgWrap.appendChild(wrap);

				pixiApp = new PIXI.Application({
					width: w,
					height: h,
					transparent: true,
					autoDensity: true,
					resolution: window.devicePixelRatio || 1,
					powerPreference: "high-performance",
				});

				pixiApp.view.style.cssText =
					"pointer-events:none;will-change:transform;";
				wrap.appendChild(pixiApp.view);

				return pixiApp;
			}

			function runGlassyEffect(swiper) {
				const activeSlide = swiper.slides[swiper.activeIndex];
				if (!activeSlide) return;

				const imgEl = activeSlide.querySelector(
					".st-hero-3-slider-item-bg img",
				);
				const imgWrap = activeSlide.querySelector(
					".st-hero-3-slider-item-bg",
				);
				if (!imgEl || !imgWrap) return;

				if (window.getComputedStyle(imgWrap).position === "static") {
					imgWrap.style.position = "relative";
				}

				const rect = imgWrap.getBoundingClientRect();
				const w = Math.max(1, Math.round(rect.width));
				const h = Math.max(1, Math.round(rect.height));

				const imgURL = imgEl.getAttribute("src");
				const heroTexture = textureCache[imgURL];
				const dispTexture = textureCache["waDisp"];

				if (!heroTexture || !dispTexture) return;

				document
					.querySelectorAll(".st-hero-3-slider-item-bg img")
					.forEach((img) => {
						img.style.opacity = "1";
					});
				imgEl.style.opacity = "0";

				const app = getOrCreateApp(imgWrap, w, h);
				app.stage.removeChildren();

				const stageContainer = new PIXI.Container();
				app.stage.addChild(stageContainer);

				const hero = new PIXI.Sprite(heroTexture);
				stageContainer.addChild(hero);

				const texRatio = hero.texture.width / hero.texture.height;
				const contRatio = w / h;
				if (contRatio > texRatio) {
					hero.width = w;
					hero.height = w / texRatio;
				} else {
					hero.height = h;
					hero.width = h * texRatio;
				}
				hero.x = (w - hero.width) / 2;
				hero.y = (h - hero.height) / 2;

				if (currentDispSprite) {
					try {
						currentDispSprite.destroy();
					} catch (e) {}
				}
				const dispSprite = new PIXI.Sprite(dispTexture);
				dispSprite.texture.baseTexture.wrapMode =
					PIXI.WRAP_MODES.REPEAT;
				dispSprite.scale.set(1.5);
				currentDispSprite = dispSprite;

				const dispFilter = new PIXI.filters.DisplacementFilter(
					dispSprite,
				);
				app.stage.addChild(dispSprite);
				stageContainer.filters = [dispFilter];

				gsap.killTweensOf(dispFilter.scale);
				gsap.fromTo(
					dispFilter.scale,
					{ x: 150, y: 150 },
					{
						x: 0,
						y: 0,
						duration: 2,
						ease: "expo.out",
						onComplete: () => {
							stageContainer.filters = [];
							app.ticker.stop();
						},
					},
				);

				app.ticker.stop();
				app.ticker.start();
			}

			function initGlassyEffect(swiperInstance) {
				const imageURLs = [];
				document
					.querySelectorAll(".st-hero-3-slider-item-bg img")
					.forEach((img) => {
						const src = img.getAttribute("src");
						if (src) imageURLs.push(src);
					});

				preloadTextures(imageURLs, () => {
					requestAnimationFrame(() =>
						runGlassyEffect(swiperInstance),
					);

					swiperInstance.on("slideChangeTransitionStart", () => {
						runGlassyEffect(swiperInstance);
					});

					window.addEventListener("resize", () => {
						clearTimeout(resizeTimer);
						resizeTimer = setTimeout(() => {
							runGlassyEffect(swiperInstance);
						}, 200);
					});

					swiperInstance.on("destroy", () => {
						if (pixiApp) {
							try {
								pixiApp.destroy(true, {
									children: true,
									texture: false,
									baseTexture: false,
								});
							} catch (e) {}
							pixiApp = null;
						}
					});
				});
			}

			const isDesktop =
				!/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
					navigator.userAgent,
				);

			var st_h3_slider_active = new Swiper(".st_h3_slider_active", {
				loop: false,
				speed: 1000,
				effect: "fade",
				fadeEffect: { crossFade: true },
				autoplay: { delay: 5000 },
				navigation: {
					nextEl: ".st_hero_3_next",
					prevEl: ".st_hero_3_prev",
				},
				pagination: {
					el: ".pg_h2_pagination",
					clickable: true,
				},
				on: {
					init: function () {
						// setTimeout(() => { this.slideNext(); }, 0);

						if (isDesktop) {
							initGlassyEffect(this);
						}
					},
					reachEnd: function () {
						this.autoplay.stop();
					},
				},
			});
		}

		if ($(".home_slider_1").length) {
			var home_slider_1 = new Swiper(".home_slider_1", {
				loop: true,
				speed: 1000,
				grabCursor: false,
				spaceBetween: 20,
				effect: "creative",
				creativeEffect: {
					prev: {
						shadow: true,
						translate: ["-50%", 0, -1],
					},
					next: {
						translate: ["100%", 0, 0],
					},
				},
				autoplay: { delay: 4000 },

				pagination: {
					el: ".home_slider_1_pagination",
					clickable: true,
				},

				on: {
					init: function () {
						setTimeout(() => {
							this.slideNext();
						}, 0);
					},
				},
			});
		}

		if ($(".home_slider_3").length) {
			const WA_DISP_IMG = $(".home_slider_3").data("masking-shape");
			let pixiApp = null;
			let currentDispSprite = null;
			let resizeTimer = null;
			const textureCache = {};

			function preloadTextures(urls, callback) {
				const loader = new PIXI.Loader();
				const toLoad = [];

				if (
					!textureCache["waDisp"] &&
					!PIXI.utils.TextureCache[WA_DISP_IMG]
				) {
					toLoad.push({ key: "waDisp", url: WA_DISP_IMG });
				}

				urls.forEach((url) => {
					if (
						url &&
						!textureCache[url] &&
						!PIXI.utils.TextureCache[url] &&
						!toLoad.find((item) => item.url === url)
					) {
						toLoad.push({ key: url, url: url });
					}
				});

				if (toLoad.length === 0) {
					if (
						!textureCache["waDisp"] &&
						PIXI.utils.TextureCache[WA_DISP_IMG]
					) {
						textureCache["waDisp"] =
							PIXI.utils.TextureCache[WA_DISP_IMG];
					}
					urls.forEach((url) => {
						if (
							url &&
							!textureCache[url] &&
							PIXI.utils.TextureCache[url]
						) {
							textureCache[url] = PIXI.utils.TextureCache[url];
						}
					});
					return callback();
				}

				toLoad.forEach((item) =>
					loader.add(item.key, item.url, { crossOrigin: true }),
				);

				loader.load((ldr, res) => {
					if (!textureCache["waDisp"]) {
						if (res["waDisp"]) {
							textureCache["waDisp"] = res["waDisp"].texture;
						} else if (PIXI.utils.TextureCache[WA_DISP_IMG]) {
							textureCache["waDisp"] =
								PIXI.utils.TextureCache[WA_DISP_IMG];
						}
					}
					urls.forEach((url) => {
						if (url && !textureCache[url]) {
							if (res[url]) {
								textureCache[url] = res[url].texture;
							} else if (PIXI.utils.TextureCache[url]) {
								textureCache[url] =
									PIXI.utils.TextureCache[url];
							}
						}
					});
					callback();
				});

				loader.onError.add((err) => {
					console.warn("PIXI Loader error:", err);
					callback();
				});
			}

			function getOrCreateApp(imgWrap, w, h) {
				if (pixiApp) {
					pixiApp.renderer.resize(w, h);

					const existingWrap =
						document.querySelector(".wa-pixi-wrap");
					if (existingWrap && existingWrap.parentNode !== imgWrap) {
						imgWrap.appendChild(existingWrap);
					}
					return pixiApp;
				}

				const wrap = document.createElement("div");
				wrap.className = "wa-pixi-wrap";
				wrap.style.cssText =
					"position:absolute;inset:0;z-index:1;pointer-events:none;will-change:transform;";
				imgWrap.appendChild(wrap);

				pixiApp = new PIXI.Application({
					width: w,
					height: h,
					transparent: true,
					autoDensity: true,
					resolution: window.devicePixelRatio || 1,
					powerPreference: "high-performance",
				});

				pixiApp.view.style.cssText =
					"pointer-events:none;will-change:transform;";
				wrap.appendChild(pixiApp.view);

				return pixiApp;
			}

			function runGlassyEffect(swiper) {
				const activeSlide = swiper.slides[swiper.activeIndex];
				if (!activeSlide) return;

				const imgEl = activeSlide.querySelector(
					".st-hero-6-slider-item-img .has-animation img",
				);
				const imgWrap = activeSlide.querySelector(
					".st-hero-6-slider-item-img .has-animation",
				);
				if (!imgEl || !imgWrap) return;

				if (window.getComputedStyle(imgWrap).position === "static") {
					imgWrap.style.position = "relative";
				}

				const rect = imgWrap.getBoundingClientRect();
				const w = Math.max(1, Math.round(rect.width));
				const h = Math.max(1, Math.round(rect.height));

				const imgURL = imgEl.getAttribute("src");
				const heroTexture = textureCache[imgURL];
				const dispTexture = textureCache["waDisp"];

				if (!heroTexture || !dispTexture) return;

				document
					.querySelectorAll(
						".st-hero-6-slider-item-img .has-animation img",
					)
					.forEach((img) => {
						img.style.opacity = "1";
					});
				imgEl.style.opacity = "0";

				const app = getOrCreateApp(imgWrap, w, h);
				app.stage.removeChildren();

				const stageContainer = new PIXI.Container();
				app.stage.addChild(stageContainer);

				const hero = new PIXI.Sprite(heroTexture);
				stageContainer.addChild(hero);

				const texRatio = hero.texture.width / hero.texture.height;
				const contRatio = w / h;
				if (contRatio > texRatio) {
					hero.width = w;
					hero.height = w / texRatio;
				} else {
					hero.height = h;
					hero.width = h * texRatio;
				}
				hero.x = (w - hero.width) / 2;
				hero.y = (h - hero.height) / 2;

				if (currentDispSprite) {
					try {
						currentDispSprite.destroy();
					} catch (e) {}
				}
				const dispSprite = new PIXI.Sprite(dispTexture);
				dispSprite.texture.baseTexture.wrapMode =
					PIXI.WRAP_MODES.REPEAT;
				dispSprite.scale.set(1.5);
				currentDispSprite = dispSprite;

				const dispFilter = new PIXI.filters.DisplacementFilter(
					dispSprite,
				);
				app.stage.addChild(dispSprite);
				stageContainer.filters = [dispFilter];

				gsap.killTweensOf(dispFilter.scale);
				gsap.fromTo(
					dispFilter.scale,
					{ x: 250, y: 250 },
					{
						x: 0,
						y: 0,
						duration: 1.5,
						ease: "expo.out",
						onComplete: () => {
							stageContainer.filters = [];
							app.ticker.stop();
						},
					},
				);

				app.ticker.stop();
				app.ticker.start();
			}

			function initGlassyEffect(swiperInstance) {
				const imageURLs = [];
				document
					.querySelectorAll(
						".st-hero-6-slider-item-img .has-animation img",
					)
					.forEach((img) => {
						const src = img.getAttribute("src");
						if (src) imageURLs.push(src);
					});

				preloadTextures(imageURLs, () => {
					requestAnimationFrame(() =>
						runGlassyEffect(swiperInstance),
					);

					swiperInstance.on("slideChangeTransitionStart", () => {
						runGlassyEffect(swiperInstance);
					});

					window.addEventListener("resize", () => {
						clearTimeout(resizeTimer);
						resizeTimer = setTimeout(() => {
							runGlassyEffect(swiperInstance);
						}, 200);
					});

					swiperInstance.on("destroy", () => {
						if (pixiApp) {
							try {
								pixiApp.destroy(true, {
									children: true,
									texture: false,
									baseTexture: false,
								});
							} catch (e) {}
							pixiApp = null;
						}
					});
				});
			}

			const isDesktop =
				!/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
					navigator.userAgent,
				);

			var st_h3_slider_preview = new Swiper(".home_slider_3_preview", {
				loop: true,
				speed: 1000,
				spaceBetween: 16,
				watchSlidesProgress: true,

				breakpoints: {
					320: {
						slidesPerView: 1,
					},
					576: {
						slidesPerView: 2,
					},
					768: {
						slidesPerView: 3,
					},
					992: {
						slidesPerView: 4,
					},
				},
			});

			var st_h3_slider_active = new Swiper(".home_slider_3", {
				loop: true,
				speed: 1000,
				effect: "fade",
				fadeEffect: { crossFade: true },
				// autoplay: { delay: 5000 },

				navigation: {
					nextEl: ".st_hero_3_next",
					prevEl: ".st_hero_3_prev",
				},
				pagination: {
					el: ".pg_h2_pagination",
					clickable: true,
				},

				on: {
					init: function () {
						// setTimeout(() => { this.slideNext(); }, 0);

						if (isDesktop) {
							initGlassyEffect(this);
						}
					},
					reachEnd: function () {
						this.autoplay.stop();
					},
				},

				thumbs: {
					swiper: st_h3_slider_preview,
				},
			});
		}

		if ($(".home_slider_2").length) {
			var home_slider_2 = new Swiper(".home_slider_2", {
				loop: true,
				speed: 1000,
				autoplay: { delay: 4000 },
				effect: "fade",
				fadeEffect: {
					crossFade: true,
				},

				navigation: {
					nextEl: ".home_slider_3_next",
					prevEl: ".home_slider_3_prev",
				},

				on: {
					init: function () {
						handleVideo(this);
					},
					slideChangeTransitionStart: function () {
						handleVideo(this);
					},
				},
			});

			function handleVideo(swiper) {
				document
					.querySelectorAll(".st-hero-5-slider .swiper-slide video")
					.forEach((video) => {
						video.pause();
					});

				let activeSlide = swiper.slides[swiper.activeIndex];
				let video = activeSlide.querySelector("video");

				if (video) {
					video.currentTime = 0;
					video.play().catch(() => {});
				}
			}
		}
	}

	// tx_tabs
	function tx_tabs($scope) {
		// projects-1-slider
		if ($(".st_p1_slider").length) {
			let st_p1_slider = new Swiper(".st_p1_slider", {
				loop: true,
				spaceBetween: 0,
				speed: 1000,

				autoplay: { delay: 5000 },

				effect: "coverflow",
				loop: true,
				centeredSlides: true,
				slidesPerView: "auto",
				coverflowEffect: {
					rotate: 0,
					stretch: 110,
					depth: 150,
					modifier: 1.1,
					slideShadows: false,
				},
			});
		}
	}

	// function tx_testimonial
	function tx_testimonial($scope) {
		if ($(".st_t2_slider").length) {
			let st_t2_slider = new Swiper(".st_t2_slider", {
				loop: true,
				spaceBetween: 32,
				speed: 1000,
				slidesPerView: "auto",
				centeredSlides: true,
				roundLengths: true,

				autoplay: {
					delay: 5000,
					disableOnInteraction: false,
				},
			});
		}

		// testimonial-3-slider
		if ($(".st_testimonial_3_slider").length) {
			let st_testimonial_3_slider = new Swiper(
				".st_testimonial_3_slider",
				{
					loop: true,
					speed: 500,
					autoplay: { delay: 3000 },

					effect: "fade",
					fadeEffect: {
						crossFade: true,
					},
				},
			);
		}

		// portfolio-details-slider
		if ($(".portfolio_details_slider_1").length) {
			var portfolio_details_slider_1 = new Swiper(
				".portfolio_details_slider_1",
				{
					loop: true,
					speed: 500,
					effect: "fade",
					fadeEffect: { crossFade: true },
					navigation: {
						nextEl: ".portfolio_d_slider_1_next",
						prevEl: ".portfolio_d_slider_1_prev",
					},
				},
			);
		}
	}

	// tx_about
	function tx_about($scope) {
		// about-3-img-slider
		if ($(".st_about_3_slider").length) {
			let st_about_3_slider = new Swiper(".st_about_3_slider", {
				loop: true,
				speed: 1000,

				autoplay: {
					delay: 3000,
					disableOnInteraction: false,
				},
			});
		}
	}

	// tx_team_lists
	function tx_team_lists($scope) {
		// team-3-slider
		if ($(".st_team_3_slider").length) {
			let st_team_3_slider = new Swiper(".st_team_3_slider", {
				loop: true,
				spaceBetween: 0,
				speed: 1000,

				effect: "coverflow",
				centeredSlides: true,
				roundLengths: true,
				slidesPerView: 3,
				coverflowEffect: {
					rotate: 0,
					stretch: 80,
					depth: 200,
					modifier: 1.4,
					slideShadows: false,
				},

				breakpoints: {
					320: {
						slidesPerView: 1,
					},
					576: {
						slidesPerView: 1,
					},
					768: {
						slidesPerView: 1,
					},
					992: {
						slidesPerView: 2,
					},
					1200: {
						slidesPerView: 2,
					},
					1400: {
						slidesPerView: 3,
					},
				},
			});
		}

		// team-3-animation
		if (window.matchMedia("(min-width: 1200px)").matches) {
			let st_team_3_img_tl = gsap.timeline({
				scrollTrigger: {
					trigger: ".st-team-3-slider",
					start: "top 50%",
					toggleActions: "play none none none",
					markers: false,
				},
			});
			st_team_3_img_tl.from(
				".st-team-3-slider .swiper-wrapper .swiper-slide:nth-of-type(3)",
				{ y: -400, scale: 1.3, duration: 0.8 },
			);
			st_team_3_img_tl.from(
				".st-team-3-slider .swiper-wrapper .swiper-slide:nth-of-type(2)",
				{ x: -200, scale: 0.6, autoAlpha: 0, duration: 0.8 },
			);
			st_team_3_img_tl.from(
				".st-team-3-slider .swiper-wrapper .swiper-slide:nth-of-type(4)",
				{ x: 200, scale: 0.6, autoAlpha: 0, duration: 0.8 },
				"<",
			);
			st_team_3_img_tl.from(
				".st-team-3-slider .swiper-wrapper .swiper-slide:nth-of-type(1)",
				{ x: -200, scale: 0.6, autoAlpha: 0, duration: 0.8 },
				"<20%",
			);
			st_team_3_img_tl.from(
				".st-team-3-slider .swiper-wrapper .swiper-slide:nth-of-type(5)",
				{ x: 200, scale: 0.6, autoAlpha: 0, duration: 0.8 },
				"<",
			);
			st_team_3_img_tl.from(
				".st-team-3-member .content-wrap-ani",
				{ y: 30, autoAlpha: 0, duration: 0.3 },
				"<",
			);
		}
	}

	// tx_service_lists
	function tx_service_lists($scope) {

		// portfolio-slider
		if ($(".portfolio_slider_1").length) {
			var portfolio_slider_1 = new Swiper(".portfolio_slider_1", {
				loop: true,
				speed: 1000,
				spaceBetween: 40,
				centeredSlides: true,
				roundLengths: true,

				navigation: {
					nextEl: ".portfolio_slider_1_next",
					prevEl: ".portfolio_slider_1_prev",
				},

				breakpoints: {
					320: {
						slidesPerView: 1,
					},
					576: {
						slidesPerView: 1,
					},
					768: {
						slidesPerView: 2,
					},
					992: {
						slidesPerView: 3,
					},
					1200: {
						slidesPerView: 3,
					},
				},
			});
		}
	}

	// --- Elementor Hooks ---
	$(window).on("elementor/frontend/init", function () {
		const addAction = elementorFrontend.hooks.addAction.bind(
			elementorFrontend.hooks,
		);
		//Widgets that need bgImageActive
		["about", "hero_slider", "footers", "info_box"].forEach(function (name) {
			addAction(
				"frontend/element_ready/tx_" + name + ".default",
				bgImageActive,
			);
		});
		addAction(
			"frontend/element_ready/tx_hero_section.default",
			function ($scope) {
				tx_hero_section($scope);
			},
		);
		addAction(
			"frontend/element_ready/tx_hero_slider.default",
			function ($scope) {
				preloaderDone.then(function () {
					tx_hero_slider($scope);
				});
			},
		);
		addAction("frontend/element_ready/tx_tabs.default", function ($scope) {
			tx_tabs($scope);
		});
		addAction(
			"frontend/element_ready/tx_service_section.default",
			function ($scope) {
				tx_service_section($scope);
			},
		);
		addAction(
			"frontend/element_ready/tx_testimonial.default",
			function ($scope) {
				tx_testimonial($scope);
			},
		);
		addAction("frontend/element_ready/tx_about.default", function ($scope) {
			tx_about($scope);
		});
		addAction(
			"frontend/element_ready/tx_team_lists.default",
			function ($scope) {
				tx_team_lists($scope);
			},
		);
		addAction(
			"frontend/element_ready/tx_service_lists.default",
			function ($scope) {
				tx_service_lists($scope);
			},
		);
	});
})(jQuery);
