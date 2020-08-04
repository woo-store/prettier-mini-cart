import { formatPrice } from "../../common";

const Prices = ({ totals, settings }) => {
	const { currency_minor_unit: unit, currency_symbol: symbol } = totals;

	return [
		<div className="p-2 text-2xl">
			{settings.subtotalPrice && (
				<div className="flex justify-between mt-3">
					<div className="txt ~neutral">{__("Subtotal", "vnh_textdomain")}</div>
					<div>{formatPrice(totals.total_items, unit, symbol)}</div>
				</div>
			)}
			{settings.shippingPrice && (
				<div className="flex justify-between mt-3">
					<div className="txt ~neutral">{__("Shipping", "vnh_textdomain")}</div>
					<div>{formatPrice(totals.total_shipping, unit, symbol)}</div>
				</div>
			)}
			{settings.taxPrice && (
				<div className="flex justify-between my-3">
					<div className="txt ~neutral">{__("Taxes", "vnh_textdomain")}</div>
					<div>{formatPrice(totals.total_shipping_tax, unit, symbol)}</div>
				</div>
			)}
		</div>,
		<div>
			{settings.totalPrice && [
				<hr className="m-0" />,
				<div className="text-2xl px-2 pt-3 flex justify-between mb-4">
					<div className="txt ~neutral">{__("Total", "vnh_textdomain")}</div>
					<div>{formatPrice(totals.total_price, unit, symbol)}</div>
				</div>,
			]}
		</div>,
		<div className="grid grid-cols-2 grap-5 mb-3">
			<div className="p-4 text-center ">
				<a className="btn ~neutral px-10 py-4" href="#">
					{__("Cart", "vnh_textdomain")}
				</a>
			</div>
			<div className="p-4 text-center">
				<a className="btn ~primary px-10 py-4" href="#">
					{__("Checkout", "vnh_textdomain")}
				</a>
			</div>
		</div>,
	];
};
export default Prices;
