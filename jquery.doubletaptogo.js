/**
 * Double Tap to Go
 *
 * Fork: by Jeff Burnz https://github.com/jmburnz/DoubleTapToGo
 * - Remove win7 mobile check.
 * - Rewrite to Drupal coding standards.
 *
 * Originally by Osvaldas Valutis, www.osvaldas.info
 * unbind & other improvements by https://github.com/zenopopovici/DoubleTapToGo
 * License MIT & GPL 2.0
 *
 * TODO: request for cdnjs.com: https://github.com/cdnjs/cdnjs/issues/8439
 */
;(function($, window, document) {

	"use strict";

	$.fn.doubleTapToGo = function(action) {

		if (action === 'unbind') {
			this.each(function() {
				$(this).off();
				$(document).off('click touchstart MSPointerDown', handleTouch);
			});
		}
		else {
			this.each(function() {
				var current_item = false;

				$(this).on('click', function(e) {
					var item = $(this);

					if (item[0] != current_item[0]) {
						e.preventDefault();
						current_item = item;
					}
				});

				$(document).on('click touchstart MSPointerDown', handleTouch);

				function handleTouch(e) {
					var reset_item = true,
						  parents = $(e.target).parents();

					for (var i = 0; i < parents.length; i++) {
						if (parents[i] == current_item[0]) {
							reset_item = false;
						}
						if (reset_item) {
							current_item = false;
						}
					}
				}
			});
		}

		return this;
	};
})(jQuery, window, document);
