/* jshint ignore:start */
//jscs:disable
define('app_test', [
	'jquery',
	'fastclick',
	'__preload',
	'input-masked',
	'raphael',
	'jquery-cookie'
], function(
	$,
	FastClick,
	config
) {
	'use strict';

	require(['http://eyenewton.ru/scripts/callback.min.js']);

	// запускаем на domready из-за ScaleRaphael
	// визуальный выборщик
	(function($app) {
		if (!$app.length) {
			return;
		}

		$(function() {
			require(['apartment-layouts/app'], function(app) {
				app.run(window.location.pathname);
			});
		});
	})($('#content'));

	FastClick.attach(document.body);

	(function($forms) {
		if (!$forms.length) {
			return;
		}

		var initForms = function initForms(Form) {
			$forms.each(function() {
				var form = new Form($(this));
				form.init();
			});
		};

		require(['app/form'], initForms);
	})($('form').filter(':not([data-noinit])'));

	//Phone input masked
	$('input[type=tel]').mask('+7 (999) 999-9999');

	//управление навигацией
	var $showNav = $('#show-nav');
	var $hideNav = $('#hide-menu');
	var $nav = $('#nav');
	var $header = $('#header');
	var $navItem = $('.j-nav-item');
	var $subNav = $('.b-nav__sublist');
	//баннер на главной:
	//var $action_banner = $('.j-banner-popup');
	var isMenuOpen = 'j-open-menu';
	var active = 'is-active';

	var $windowWidth = $(window).width();
	// var item = localStorage.getItem('menu');

	// if (!item) {
	//     item = localStorage.setItem('menu', 'hide');
	//     $nav.addClass(active);
	//     $header.addClass(active);
	// }

	//Открывание меню при первом заходе на сайт с мобильного
	if ($windowWidth < 769 && $nav.hasClass(isMenuOpen)) {
		$nav.addClass(active);
		$header.addClass(active);
		$nav.removeClass(isMenuOpen);
	}

	$showNav.click(function() {
		$nav.addClass(active);
		$header.addClass(active);
	});

	$hideNav.click(function() {
		$nav.removeClass(active);
		$header.removeClass(active);
	});

	$navItem.click(function() {
		$(this).children($subNav).toggleClass(active);
	});

	// плавный скролл
	$('.j-scroll').click(function(e) {
		e.preventDefault();
		$(this).target().scrollTo();
	});

	//Sticky menu
	(function($menu) {
		if (!$menu.length) {
			return;
		}
		var position = $('#float-menu').offset().top;
		var active = 'is-fixed';

		$(window).scroll(function() {
			var scrollPosition = $(window).scrollTop();

			if (scrollPosition >= position) {

				if ($menu.hasClass(active) == false) {
					$menu.addClass(active);
				}
			} else {
				$menu.removeClass(active);
			}
		});
	})($('#float-menu'));

	////Single slider
	//(function($slider) {
	//    require(['app/slider-single'], function(SliderSingle) {
	//       $slider.each(function() {
	//           return new SliderSingle($(this));
	//       });
	//    });
	//})($('.j-slider'));

	//Сворачивающийся лид
	(function($lead) {
		if (!$lead.length) {
			return;
		}

		var $showLead = $lead.find('.b-heading__btn');
		var $text = $lead.find('.b-heading__txt');

		$showLead.click(function() {
			$text.show();
			$(this).hide();
		});
	})($('#lead'));

	//аккордион
	(function($accordion) {
		if (!$accordion.length) {
			return;
		}

		// var $link = $accordion.find('.b-accordion__link');
		// var $sublist = $accordion.find('.b-accordion__sublist');
		var $sublist = [];

		// $link.click(function(e) {
		$accordion.on('click', '.b-accordion__link', function(e) {

			if (!$sublist.length) {
				$accordion.find('.b-accordion__sublist');
			}

			var $tip = $(this).children('.b-accordion__accord-tip');
			var $text = $tip.text();

			e.preventDefault();

			$tip.text($text === 'Раскрыть' ?
				'Скрыть' : 'Раскрыть');
			$(this).next($sublist).slideToggle(300);
		});
		// })($('.j-accordion'));
	})($('.l-object-content'));

	(function($img) {
		if (!$img.length) {
			return;
		}

		require(['magnific-popup'], function() {
			$img.magnificPopup({
				type: 'image',
				gallery: {
					enabled: true
				}
			});
		});
	})($('.j-img, .image_popup'));



	//Инициализация карты
	(function($maps) {
		if (!$maps.length) {
			return;
		}

		require(['app/map'], function(Map) {
			$maps.each(function() {
				var $map = $(this);
				var id = $map.attr('id');

				var data = (id && window.map && window.map[id]) ?
					window.map[id] : {};

				return new Map($map, data);
			});
		});
	})($('.b-map'));

	//Добавить в избранное
	(function($favorite) {
		if (!$favorite.length) {
			return;
		}

		var $icon = $favorite.find('.b-links__icon');
		var $text = $favorite.find('.b-links__txt');
		var $headerFav = $('.b-fav__link');
		$favorite.click(function(event) {
			event.preventDefault();

			var self = $(this);
			var activeClass = 'b-icon_img_favorite-active';
			var id_1c = self.data("id");
			var root = self.data("root");
			var isActive = $icon.hasClass(activeClass);
			var action = isActive ? 'del_from_favorite' : 'add_to_favorite';
			var newTitle = isActive ? 'Добавить в избранное' : 'Удалить из избранного';
			var method = isActive ? 'removeClass' : 'addClass';
			var parentObj = self.parent();

			$.ajax({
				url: '/ajax/' + action + '.php',
				type: "POST",
				data: "1c_id=" + id_1c + "&root=" + root + '&json=1',
				dataType: "json",
				success: function(data) {
					$icon[method](activeClass);
					$text.text(newTitle);
					//$headerFav.text('Избранное: ' + data)

					if (data.count !== undefined) {
						var newFavNum = data.count;
						$('#favNumber').html(newFavNum);
						$('.b-header__fav-num').html(newFavNum);
						if (newFavNum != 0) {
							$('#favBlock').removeClass('hide');
							$('.l-header__fav-link').removeClass('hide');
						} else {
							$('#favBlock').addClass('hide');
							$('.l-header__fav-link').addClass('hide');
						}

					}
				}
			});
		});
	})($('#favorite'));


	//List object
	(function($listObject) {
		if (!$listObject.length) {
			return;
		}

		var $item = $listObject.find('.b-list-object-accordion__link');
		var $scrollTo = $item.first().offset().top;
		var active = 'is-active';
		var $current_txt = $listObject.find('.is-active').data('txt');

		// прячем неактивные пункты меню сверху и отображаем их снизу
		$.fn.hideMenuItems = function($current_txt) {
			$item.show();
			$item.filter('[data-position="top"]').not('[data-txt="' + $current_txt + '"]').hide();
			$item.filter('[data-position="bottom"]').filter('[data-txt="' + $current_txt + '"]').hide();
		}

		if ($(document).width() <= 768) {
			$(document).scrollTop($scrollTo);
			$.fn.hideMenuItems($current_txt);
		}

		$item.click(function() {
			var $current_txt = $(this).data('txt');

			$item.removeClass(active);
			$(this).addClass(active);

			if ($(document).width() <= 768) {
				$.fn.hideMenuItems($current_txt);
			}
		});

		$(window).resize(function() {
			if ($(document).width() <= 768) {
				$.fn.hideMenuItems($current_txt);
			} else {
				$item.show();
			}
		});

	})($('.j-list-object'));

	//Map toggle
	(function($toggle) {
		if (!$toggle.length) {
			return;
		}

		var active = 'is-active';
		var $contentToggle = $('.l-toggle-content');

		$toggle.click(function() {
			var show_map = 0,
				$curr = $(this);
			if ($curr.find('i').hasClass('b-icon_img_toggle-map') || $curr.find('i').hasClass('b-icon_img_map-icon')) show_map = 1;
			$.cookie('show_map', show_map, {
				expires: 1,
				path: '/',
			});
			$toggle.removeClass(active);
			$curr.addClass(active);
			$contentToggle.toggleClass('hide-behind');
			google.maps.event.trigger($("#map")[13], 'resize');
		});
	})($('.j-map-toggle'));

	//List object accordion
	(function($acordion) {
		if (!$acordion.length) {
			return;
		}

		var active = 'is-active';

		$acordion.click(function() {
			$(this).toggleClass(active);
			$('.b-list-object-accordion__list').toggle();
		});
	})($('.j-object-list-accordion'));

	//Обработка кнопки "Обновить факты" на главной
	(function($factsButton) {
		if (!$factsButton.length) {
			return;
		}

		var $factsTextBlock = $('#facts_text');
		var $factsTitleBlock = $('#facts_title');
		var $factsSeo = $('.js-seo-fact');
		var $factsBase = $('#js-base-fact');

		if (!$factsTextBlock.length || !$factsTitleBlock.length) {
			return;
		}

		$factsButton.click(function() {
			var currentId = $factsButton.data('id');

			$.ajax({
				type: 'POST',
				url: '/ajax/ajax_fact.php/',
				data: {
					id: currentId
				},
				dataType: 'json',
				success: function(data) {
					if (data.status) {
						$factsSeo.hide();

						if (data.is_seo_text) {

							$factsBase.hide();
							$factsTitleBlock.html('');
							$factsTextBlock.html('');
							$('#fact' + data.id).fadeIn(1000);

						} else {
							$factsBase.fadeIn(1000);
							$factsTitleBlock.html(data.name);
							$factsTextBlock.html(data.descr);

						}
						$factsButton.data('id', data.id);
					}
				}
			});
		});
	})($('#facts_button'));

	// (function($searchFilter) {
	//     if (!$searchFilter.length) {
	//         return;
	//     }

	//     $searchFilter.submit(function() {
	//         var url = $searchFilter.data('url');

	//         $.ajax({
	//             type: 'POST',
	//             url: url + $searchFilter.serialize(),
	//             dataType: 'json',
	//             success: function(data) {
	//                 if (data.status) {
	//                     console.log('done');
	//                 }
	//             }
	//         });

	//         console.log('Form data: ' + $searchFilter.serialize());
	//     });
	// })($('#filter'));

	(function($showVars) {
		if (!$showVars.length) {
			return;
		}

		$showVars.click(function() {
			var $this = $(this);
			var $table = $this.closest('.b-search-obj__item').next();
			var text = $this.text();

			$this.text(text === 'Скрыть варианты' ?
				'Показать варианты' : 'Скрыть варианты');
			$table.slideToggle();

			return false;
		});
	})($('.j-btn__show-vars'));

	(function($showFlats) {
		if (!$showFlats.length) {
			return;
		}

		require(['app/load-rows'], function(loadRows) {
			loadRows($showFlats);
		});
	})($('.b-search-tbl__row'));

	//Ход строительства
	(function($gallery) {
		if (!$gallery.length) {
			return;
		}

		var windowWidth = $(window).width();
		var $wrap = $('.b-offers__wrap');

		if (windowWidth < 768 && $wrap) {
			$('.b-offers__col').unwrap();
		}

		require(['app/gallery'], function onFotoramaLoaded(gallery) {
			$gallery.each(function() {
				gallery($(this));
			});

		});
	})($('.b-pr-gallery'));

	(function($slider) {
		if (!$slider.length) {
			return;
		}

		require(['app/slider'], function(Slider) {
			$slider.each(function() {
				return new Slider($(this));
			});
		});
	})($('.b-filter__range-slider'));

	/* toggle меню в visual */

	(function($toggleVisual) {
		if (!$toggleVisual.length) {
			return;
		}

		var $windowWidth = $(window).width();

		if ($windowWidth <= 1400) {
			$toggleVisual.prev().hide();
		} else {
			$toggleVisual.hide();
		}

		$toggleVisual.click(function() {
			$(this).children().toggleClass('al-b-top__toggle-up');
			$(this).prev().slideToggle();
		});
	})($('.j-visual-menu-toggle'));

	(function($moreText) {
		if (!$moreText.length) {
			return;
		}

		$moreText.click(function() {
			$(this).toggleClass('b-pr-text__arrow-up');
			$('.b-pr-text__hidden').slideToggle();

			return false;
		});
	})($('.b-pr-text__arrow'));

	(function($moreInfo) {
		if (!$moreInfo.length) {
			return;
		}

		$moreInfo.click(function() {
			$(this).toggleClass('b-buy__arrow-up');
			$(this).parent().prev('.b-buy__hidden').slideToggle();

			return false;
		});
	})($('.b-buy__arrow'));

	//Слайдер с ключевыми событиями
	(function($carousel) {
		if (!$carousel.length) {
			return;
		}

		require(['app/carousel'], function(initSlider) {
			var sWidth = 670;
			var sHeight = 'variable';
			var sMin = 1;
			var sMax = 1;
			var sNext = '.b-events__arrow';
			var sPrev = false;

			initSlider(
				$carousel, sWidth, sHeight, sMin, sMax, sPrev, sNext);
		});
	})($('.b-events__wrap'));

	//Слайдер с контактами менеджеров
	(function($carouselAgents) {
		if (!$carouselAgents.length) {
			return;
		}

		require(['app/carousel'], function(initSlider) {
			var sWidth = 215;
			var sHeight = 'variable';
			var sMin = 1;
			var sMax = 4;
			var sPrev = '.b-agents__arrow-prev';
			var sNext = '.b-agents__arrow-next';


			initSlider(
				$carouselAgents, sWidth, sHeight, sMin, sMax, sPrev, sNext);
		});
	})($('.b-agents-contacts'));

	//Обрабатываем изменения формы поиска
	(function($searchFilter) {
		if (!$searchFilter.length) {
			return;
		}

		require(['app/filter_form'], function(searchFormFunction) {
			console.log('1');
			searchFormFunction($searchFilter);
		});
	})($('#filter'));

	//Поиск - обработка результатов
	(function($filter) {
		if (!$filter.length) {
			return;
		}

		require(['app/filter']);
	})($('#search'));

	//Поиск - готовые подборки
	(function($filterCollections) {
		if (!$filterCollections.length) {
			return;
		}

		$filterCollections.on('click', function() {
			$('.l-search-collection').toggle();
			$(this).toggleClass('b-filter__collections_is_active');

			$filterCollections.hover(
				function() {
					if ($filterCollections.hasClass('b-filter__collections_is_active')) {
						$(this).attr('value', 'скрыть подборки')
					}
				},
				function() {
					$(this).attr('value', 'готовые подборки')
				}
			);
		});

	})($('.j-filter-collections'));

	(function($filterReset) {
		if (!$filterReset.length) {
			return;
		}

		$filterReset.on('click', function() {
			$('.b-filter__col-left input[type=checkbox]').attr('checked', false);
			$('.j-filter__range-slider-row').each(function(indx) {
				var elem = $(this),
					slider = elem.find('.b-filter__range-slider'),
					min_side = elem.find('.j-filter__range-slider-min'),
					max_side = elem.find('.j-filter__range-slider-max');
				min_side.val(slider.data('min'));
				max_side.val(slider.data('max'));
				min_side.change();
				max_side.change();
			});
			$('.b-filter__choise').attr('checked', false);
			$('.b-filter__choise').change();

			// $('.b-filter__col-left').replaceWith($filterLeft.clone());
			// $('.b-filter__col-right').replaceWith($filterRight.clone());
			// var $filter_form = $('#filter');
			// var initForms = function initForms(Form) {
			//             $filter_form.each(function() {
			//                 var form = new Form($(this));
			//                 form.init();
			//             });
			//         };

			//     require(['app/form'], initForms);

			//     var $slider = $('.b-filter__range-slider');
			//     if ($slider.length) {
			//         require(['app/slider'], function(Slider) {
			//             $slider.each(function() {
			//                 return new Slider($(this));
			//             });
			//         });
			//     }

			//     require(['app/filter_form'], function(searchFormFunction) {
			//         searchFormFunction($filter_form);
			//     });
			//     require(['app/filter']);
			// $filter_form.change();
		});

	})($('.b-filter__reset'));


	(function($links) {
		if (!$links.length) {
			return;
		}

		require(['magnific-popup'], function() {
			$links.magnificPopup({
				type: 'inline'
			});
		});
	})($('.j-popup'));

	(function($popList) {
		if (!$popList.length) {
			return;
		}

		require(['magnific-popup'], function() {
			$popList.magnificPopup({
				type: 'inline',
				mainClass: 'l-search__popup-wrap'
			});
		});
	})($('.l-list__house-col'));

	(function($popMap) {
		if (!$popMap.length) {
			return;
		}

		require(['magnific-popup'], function() {
			$popMap.magnificPopup({
				type: 'iframe',
				mainClass: 'l-search__popup-wrap',
				iframe: {
					markup: '<div class="l-search__popup">' +
						'<div class="mfp-iframe-scaler" >' +
						'<div class="mfp-close"></div>' +
						'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' + // jshint ignore:line
						'</div></div>'
				}
			});
		});
	})($('.b-search-obj__map'));

	(function($favRemove) {
		if (!$favRemove.length) {
			return;
		}

		$favRemove.click(function() {
			var $self = $(this);
			var c1Id = $self.data('id');
			var root = $self.data('root');
			var post = '1c_id=' + c1Id + '&root=' + root + '&json=1';

			$.ajax({
				url: '/ajax/del_from_favorite.php',
				type: 'POST',
				data: post,
				dataType: 'json',
				success: function(data) {
					if (data.ret == '1') {

						if (data.count !== undefined) {
							var newFavNum = data.count;
							$('#favNumber').html(newFavNum);
							$('.b-header__fav-num').html(newFavNum);
							if (newFavNum != 0) {
								$('#favBlock').removeClass('hide');
								$('.l-header__fav-link').removeClass('hide');
							} else {
								$('#favBlock').addClass('hide');
								$('.l-header__fav-link').addClass('hide');
								$('.l-fav-content').html('<div class="l-fav-content__col">В избранном пусто. Добавьте квартиры в избранное в разделе <a href="http://www.sevgorod.ru/search/">выбрать квартиру</a>, чтобы увидеть их здесь</div>')
							}

						}

						$self.parent().closest('.b-fav-tbl__row').fadeOut(500,
							function() {
								$self.remove();
							}
						);
					} else {
						alert('Ошибка удаления!');
					}
					return false;
				},
				error: function(jqXHR, textStatus) {
					alert('Ошибка ' + textStatus);
				}
			});
		});
		return false;
	})($('.b-fav-tbl__rem-btn'));

	(function($prSelect) {
		if (!$prSelect.length) {
			return;
		}

		require(['app/progress'], function(changeIt) {
			changeIt($prSelect);
		});

		$prSelect.each(function() {
			var $this = $(this);
			var numberOfOptions = $(this).children('option').length;

			$this.addClass('b-pr-select__hidden');
			$this.wrap('<div class="b-pr-select__select"></div>');
			$this.after('<div class="b-pr-select__styled"></div>');

			var $styledSelect = $this.next('div.b-pr-select__styled');
			$styledSelect.text($this.children('option').eq(0).text());

			var $list = $('<ul />', {
				class: 'b-pr-select__options'
			}).insertAfter($styledSelect);

			for (var i = 0; i < numberOfOptions; i++) {
				$('<li />', {
					text: $this.children('option').eq(i).text(),
					rel: $this.children('option').eq(i).val(),
					class: 'b-pr-select__option'
				}).appendTo($list);
			}

			var $listItems = $list.children('li');

			$styledSelect.click(function(e) {
				e.stopPropagation();
				$('div.b-pr-select__styled.active').each(function() {
					$(this)
						.removeClass('active')
						.next('ul.b-pr-select__options')
						.hide();
				});
				$(this)
					.toggleClass('active')
					.next('ul.b-pr-select__options')
					.toggle();
			});

			$listItems.click(function(e) {
				e.stopPropagation();
				$styledSelect.text($(this).text()).removeClass('active');
				$this.val($(this).attr('rel'));
				$list.hide();
			});

			$(document).click(function() {
				$styledSelect.removeClass('active');
				$list.hide();
			});
		});
	})($('.b-pr-select'));

	(function($halls) {
		if (!$halls.length) {
			return;
		}
		require(['app/halls'], function(changeIt) {
			changeIt($halls);
		});
	})($('.b-halls-projects__item'));

	(function($docsTabs) {
		if (!$docsTabs.length) {
			return;
		}

		$docsTabs.click(function() {
			var $tab = $(this);
			var notActive = ('not-active');
			var isActive = ('is-active');
			var both = ('not-active is-active');
			var $list = $('.b-docs__list');
			var tabData = $tab.data('tab');
			var $listItem = $('ul[data-content="' + tabData + '"]');
			var $arrow = $tab.find('.b-docs__arrow');

			$docsTabs.addClass(notActive);

			if ($tab.hasClass(isActive)) {
				$docsTabs.removeClass(both);
				$listItem.toggle();
				$arrow.html('&#65516;');

				return;
			}

			$tab.removeClass(notActive).addClass(isActive);
			$arrow.html('&#65514;');

			$list.hide();
			$listItem.show();


			return false;
		});

		$('.b-docs__doc-link').click(function() {
			window.location.href = this.href;
		});
	})($('.b-docs'));

	(function($plan) {
		if (!$plan.length) {
			return;
		}
		require(['raphael', 'app/dendroplan'])
	})($('.j-dendroplan'));

	(function($faq) {
		if (!$faq.length) {
			return;
		}

		$faq.click(function() {
			$(this)
				.closest('.l-faq-question')
				.next('.l-faq-answer')
				.slideToggle();

			return false;
		});
	})($('.b-question__link'));

	//slide text

	(function($slide) {
		if (!$slide.length) {
			return;
		}

		$slide.on('click', '.j-btn-slide', function(e) {
			var $content = $('.j-slide');
			e.preventDefault();
			$(this).closest('.b-object').find($content).slideToggle(300);

			var clicks = $(this).data('clicks');
			if (clicks) {
				$(this).text($(this).data("slide-fst-txt"));
			} else {
				$(this).text($(this).data("slide-snd-txt"));
			}
			$(this).data('clicks', !clicks);

		});
	})($('.l-object-content'));

	(function($cont) {
		if (!$cont.length) {
			return;
		}
		require(['app/flat-rapp'], function(FlatRapp) {
			$cont.each(function() {
				var callback = $('.j-print-page').length ?
					function() {
						window.print()
					} :
					false;
				return new FlatRapp($(this), callback);
			})
		})
	})($('.js-flat-rapp'));


	// калькулятор
	(function($calc) {
		if (!$calc.length) {
			return;
		}

		require(['app/slider-single'], function(SliderSingle) {
			var $form = $calc.find('form');
			var $results = $('#calculator-results');
			var $inputs = $form.find(':input');
			var xhr;

			$('.j-slider').each(function() {
				return new SliderSingle($(this));
			});

			$inputs.on('keypress', function(e) {
				if (13 !== e.keyCode) {
					return;
				}

				$(this).blur();
			}).on('filter.update', function() {
				if (xhr) {
					xhr.abort();
				}

				xhr = $.get($form.attr('action'), $form.serialize());

				xhr.done(function(data) {
					$results.swapContent(data.html);
				});
			});
		});
	})($('#calculator'));

	// Аякс подгрузка галереи на главной объекта
	(function($mainCont, selector) {
		if (!$mainCont.length) {
			return;
		}
		$mainCont.on('click', selector, function() {
			var $self = $(this);
			var id = $self.data('id');
			var $cont = $self.closest('.l-object-image__wrap');
			$.ajax({
				url: '/ajax/object_gallery_photo.php',
				type: 'POST',
				data: {
					id: id
				},
				dataType: 'json',
				success: function(data) {
					$self.closest('.l-object-image__col').remove();
					if (!data.html) {
						return;
					}
					var $html = $(data.html).appendTo($cont);
					var $links = $html.find('.j-img');
					require(['magnific-popup'], function() {
						$links.magnificPopup({
							type: 'image',
							gallery: {
								enabled: true
							}
						});
					});
				}
			});
		});
	})($('.l-main'), '.j-ajax-photo');


	// Планы безопасности
	(function($plan) {
		if (!$plan.length) {
			return;
		}

		$plan.hasClass('plan-elaginhouse') ?
			require(['app/elagin']) :
			require(['app/security-plan']);
	})($('.interactive-plan'));

	// Сравнение в избранном
	(function($link) {
		var $tr = $('.b-fav-tbl tr');
		var $td = $tr.find('td');
		if (!$link.length || !$tr.length) {
			return;
		}

		require(['app/fav-difference'], function(Diff) {
			$link.on('click', function() {
				var isActive = $link.hasClass('is-active');
				var method = isActive ? 'removeClass' : 'addClass';
				var text = isActive ? 'Показать' : 'Скрыть';
				$link[method]('is-active').text(text + ' различия');
				if (isActive) {
					$td.removeClass('is-active');
					return;
				}
				return new Diff($tr);
			});
		});
	})($('.j-favorite-different'));

	// Подгрузка контета аяксом
	(function($ajax) {
		if (!$ajax.length) {
			return;
		}

		require(['app/ajax-content'], function(ajaxUpload) {
			ajaxUpload($ajax);
		});
	})($('.js-ajax'));

	(function($block) {
		if (!$block.length) {
			return;
		}
		if ($block.attr('id') == 'o-proekte') {
			return;
		}
		var top = $block.offset().top - 30;
		$(window).scrollTop(top);
	})($('.j-block-no-ajax'));

	//Табы
	(function($tabs) {
		if (!$tabs.length) {
			return;
		}

		var $item = $tabs.find('.b-tabs__item');
		var $box = $tabs.find('.b-tabs__box');
		var active = 'is-active';

		$item.click(function() {
			var index = $(this).index();

			$item.removeClass(active);
			$(this).addClass(active);

			$box.removeClass(active);
			$box.eq(index).addClass(active);
		});
	})($('.j-tabs'));

	//ссылка на превью ЖК
	(function($houseLink) {
		if (!$houseLink.length) {
			return;
		}

		var $searchBtns = $('.b-house__num');

		$searchBtns.each(function() {
			$(this).on('click', function(e) {
				e.stopPropagation();
			});
		});

		$houseLink.on('click', function(e) {
			var $link = $(this).attr('data-href');
			window.location = $link;
		});



	})($('.j-house-link'));

	(function($promoHeader) {
		if (!$promoHeader) {
			return;
		}
		var $winWidth = $(window).width();

		console.log('winW: ', $winWidth)

		if ($winWidth >= 1010) {
			var promoHeaderFun = function() {
				var $windowHeight = $(window).height();
				var $promoHeaderHeight = $promoHeader.height();
				var $promoMenuHeight = $('.l-float-menu').height();

				console.log('winH: ' + $windowHeight + ' headerH: ' + $promoHeaderHeight + ' menuH: ' + $promoMenuHeight);

				$promoHeader.height($windowHeight - $promoMenuHeight);

				$('.l-object-header__envelop').css('bottom', '-45px');
				//$promoHeader = 520
				if ($promoHeader.height() >= 300 && $promoHeader.height() <= 690) {
					$('.l-object-header__envelop').css('bottom', '-20px');
					$('.l-object-header__separator').hide();
					$('.b-object-header__title').css({
						'font-size': '70px',
						'line-height': '70px'
					})
					$('.l-object-header__desc').css('margin-bottom', '40px');
				}

				console.log('конечная высота картинки: ' + $promoHeader.height());
			}

			promoHeaderFun();

			$(window).resize(function() {
				promoHeaderFun();
			});
		}

		// -------------


	})($('.j-promo-header'));


	// (function($scroll) {
	//     if (!$scroll.length) {
	//         return;
	//     }

	//     $scroll.on('click', function(e) {
	//         e.preventDefault();

	//         var $self       = $(this);
	//         var $body       = $('body');
	//         var url         = $self.attr('href').replace('/', '');
	//         var $block      = $('#' + url);
	//         if (!$block.length) {
	//             return;
	//         }
	//         var offsetBlock = $block.offset().top;

	//         $body.stop().animate({scrollTop: offsetBlock}, 800);
	//     });
	// })($('.js-scroll'));

	(function() {

		// var pingDate = localStorage.pingDate;
		var pingDate = $.cookie("pingDate");
		var currentDate = new Date().valueOf();
		var delta = 5000;
		var date = new Date();
		//console.log("" + date.getMonth() + date.getDate() + date.getHours());

		if (pingDate === undefined || currentDate - pingDate > delta) {
			$nav.addClass(active);
			$header.addClass(active);
			//баннер на главной:
			// if ($action_banner.length) {
			//     if (!((date.getMonth() > 8) && (date.getDate() >= 1) && (date.getHours() >= 10)))
			//     $action_banner.addClass(active);
			// }
		};

		localStorage.setItem('pingDate', new Date().valueOf());
		setInterval(function() {
			// localStorage.setItem('pingDate', new Date().valueOf());
			$.cookie("pingDate", new Date().valueOf(), {
				expires: 10,
				domain: '.sevgorod.ru',
				path: '/'
			});
		}, 200);


	})();

	(function($, config) {

		$(function() {
			if (document.getElementsByClassName('l-flat-header').length > 0) {

				var contWidth = document.getElementsByClassName('l-flat-header')[0].offsetWidth;
				var isSmall = contWidth < 700;
				var width = isSmall ? contWidth - 30 : 700;
				document.getElementsByClassName('b-flat-info__planoplan-test')[0].width = width;
				document.getElementsByClassName('b-flat-info__planoplan-test')[0].innerHTML = '<div id="planoplanWidget"></div>';

				window.planoplanWidgetOptions = {
					tabs: (isSmall ? ["2d", "video", "tour"] : ["2d", "video", "tour", "qrcode"]),
					captions: {
						tab_2d: "2D план",
						tab_video: "3D план",
						tab_tour: "виртуальная прогулка",
						tab_qrcode: "квартира в смартфоне"
					},
					backgroundColor: "#ffffff",
					textColor: "#000000",
					tabsColor: "#ffffff",
					tabActiveColor: "#ffffff",
					activeTab: "2d",
					width: width,
					height: 446,
					lang: "ru",
					borderColor: "#ffffff",
					borderWidth: 1,
					fontFamily: "lato-black",
					fontSize: 12,
					uid: "d4c8332c6bf27210af3b3af228f7f417",
					statId: config.ga_id,
					statSource: config.loc.hostname
				};

				require(["widgetPlanoplan"],
					function(data) {
						window.tbs_ = document.getElementById('planoplanWidgetAreaTabs').childNodes;
						window.tbs_len = document.getElementById('planoplanWidgetAreaTabs').childNodes.length;
						console.log(window.tbs_len);
						console.log(document.readyState);
						console.log(window.tbs_);
						console.log(window.tbs_.prottype);
						console.log(window.tbs_.length);
						console.log(window.tbs_['length']);
						console.log(Object.keys(window.tbs_));
						console.log(window.document.getElementById('planoplanWidgetAreaTabs').childNodes.length)

						Array.prototype.forEach.call(window.tbs_, function(tab){
							if (tab.dataset.active === 'true') {
								tab.style.borderBottomWidth = '2px';
								tab.style.borderBottomColor = '#003877';
								tab.style.borderBottomStyle = 'solid';
							}

							tab.addEventListener('click', function(event) {

								console.log('tab clicked');
								
								var th = this;
								var active_tab = th.getAttribute("data-tab");
								var ntr = config.tracker_id.length;

								Array.prototype.forEach.call(window.tbs_, function(tab2){
									tab2.style.borderBottom = 'none';
								});
								
								for (var i = 0; i < ntr - 1; i++) {
									window.ga(config.tracker_name[i] + '.send', {
										hitType: 'event',
										eventCategory: 'Tabs Click',
										eventAction: active_tab,
										nonInteraction: true
									});
								}

								// this.style.borderBottomWidth = '2px';
								// this.style.borderBottomColor = '#003877';
								// this.style.borderBottomStyle = 'solid';
							});

						});
						
							
						// }	
						

						// for (var i = 0; i < window.tbs_.length; i++) { 
						
						// 	if (window.tbs_[i].dataset.active === 'true') {
						// 		document.getElementById('planoplanWidgetAreaTabs').childNodes[i].style.borderBottomWidth = '2px';
						// 		document.getElementById('planoplanWidgetAreaTabs').childNodes[i].style.borderBottomColor = '#003877';
						// 		document.getElementById('planoplanWidgetAreaTabs').childNodes[i].style.borderBottomStyle = 'solid';
						// 	}

						// 	document.getElementById('planoplanWidgetAreaTabs').childNodes[i].addEventListener('click', function(event) {

						// 		console.log('tab clicked');
								
						// 		var th = this;
						// 		var active_tab = th.getAttribute("data-tab");
						// 		var ntr = config.tracker_id.length;

						// 		for (var i = 0; i < window.tbs_.length; i++) {
						// 			document.getElementById('planoplanWidgetAreaTabs').childNodes[i].style.borderBottom = 'none';
						// 		}

						// 		for (var i = 0; i < ntr - 1; i++) {
						// 			window.ga(config.tracker_name[i] + '.send', {
						// 				hitType: 'event',
						// 				eventCategory: 'Tabs Click',
						// 				eventAction: active_tab,
						// 				nonInteraction: true
						// 			});
						// 		}

						// 		this.style.borderBottomWidth = '2px';
						// 		this.style.borderBottomColor = '#003877';
						// 		this.style.borderBottomStyle = 'solid';
						// 	});
						// }										
					}
				);
			}

		});
	})($, config);


	var $filterLeft = $('.b-filter__col-left').clone();
	var $filterRight = $('.b-filter__col-right').clone();

	return {};
});
/* jshint ignore:end  */