const products = [
	{
		key: "c51ce410c124a10e0db5e4b97fc2af39",
		id: 13,
		quantity: 46,
		name: "Belt",
		short_description: "<p>This is a simple product.</p>",
		description:
			"<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>",
		images: [
			{
				thumbnail: "http://woostore.local/wp-content/uploads/2020/07/belt-2-450x450.jpg",
			},
		],
		prices: {
			currency_code: "USD",
			currency_symbol: "$",
			currency_minor_unit: 2,
			currency_suffix: "$",
			price: "5500",
			regular_price: "6500",
			sale_price: "5500",
			price_range: null,
		},
	},
];

const totals = {
	currency_code: "USD",
	currency_decimal_separator: ",",
	currency_minor_unit: 2,
	currency_prefix: "",
	currency_suffix: "$",
	currency_symbol: "$",
	currency_thousand_separator: ".",
	tax_lines: [],
	total_discount: "0",
	total_discount_tax: "0",
	total_fees: "0",
	total_fees_tax: "0",
	total_items: "311200",
	total_items_tax: "0",
	total_price: "313200",
	total_shipping: "2000",
	total_shipping_tax: "0",
	total_tax: "0",
};

const positions = [
	{
		label: "Left top",
		value: "left-top",
	},
	{
		label: "Left center",
		value: "left-center",
	},
	{
		label: "Left bottom",
		value: "left-bottom",
	},
	{
		label: "Right top",
		value: "right-top",
	},
	{
		label: "Right center",
		value: "right-center",
	},
	{
		label: "Right center",
		value: "right-center",
	},
];

export { products, totals, positions };
