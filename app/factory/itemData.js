'use strict';

module.exports = function (app) {
	app.factory('ItemDataFactory', function(SanitizeFactory) {

			return function ($item) {

				var item = {
					image: $item.find('.market_listing_item_img').attr('src'),
					name: SanitizeFactory.name($item.find('.market_listing_item_name').text()),
					game: $item.find('.market_listing_game_name').text()
				};

				var $url = $item.find('.market_listing_item_name_link').length ? $item.find('.market_listing_item_name_link') : $item.find('.market_listing_row_link');
				item.url = $url.attr('href');

				var $priceNoFee = $item.find('.market_listing_price_without_fee').length ? $item.find('.market_listing_price_without_fee') : $item.find('.market_listing_their_price .market_table_value span');
				item.priceNoFee = $priceNoFee.text().replace(/($|€|£|USD)/gi, '').replace(/\-/gi, '0').replace(',', '.').trim();

				var $priceFee = $item.find('.market_listing_price_with_fee').length ? $item.find('.market_listing_price_with_fee') : $item.find('.market_listing_their_price .market_table_value span');
				item.priceFee = $priceFee.text().replace(/($|€|£|USD)/gi, '').replace(/\-/gi, '0').replace(',', '.').trim();

				item.id = ($item.html().match(/listing\_sell\_new\_(.*)\_image/) || $item.html().match(/result\_(.*)\_image/))[1];

				if (item.priceFee !== 'Sold!') {
					item.priceNoFee = Number(Number(item.priceNoFee).toFixed(2));
					item.priceFee = Number(Number(item.priceFee).toFixed(2));
				}

				return item;
			};

	});
};
