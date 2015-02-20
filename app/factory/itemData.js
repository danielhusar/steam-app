'use strict';

module.exports = function (app) {
	app.factory('ItemDataFactory', function(SanitizeNameFactory) {

			return function ($item) {

				var item = {
					image: $item.find('.market_listing_item_img').attr('src'),
					name: SanitizeNameFactory($item.find('.market_listing_item_name').text()),
					game: $item.find('.market_listing_game_name').text(),
					url: $item.find('.market_listing_item_name_link').attr('href'),
					priceNoFee: $item.find('.market_listing_price_without_fee').text().replace(/($|€|£|USD)/gi, '').replace(/\-/gi, '0').replace(',', '.').trim(),
					priceFee: $item.find('.market_listing_price_with_fee').text().replace(/($|€|£|USD)/gi, '').replace(/\-/gi, '0').replace(',', '.').trim(),
					id: $item.html().match(/listing\_sell\_new\_(.*)\_image/)[1]
				};

				if (item.priceFee !== 'Sold!') {
					item.priceNoFee = Number(Number(item.priceNoFee).toFixed(2));
					item.priceFee = Number(Number(item.priceFee).toFixed(2));
				}

				return item;
			};

	});
}
