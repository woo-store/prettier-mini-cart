import { formatPrice } from "../common";
import { Close } from "../icons";
import { updateQuantity, deleteProduct } from "./helpers";
import { useEffect, useState } from "react";

const CartContent = ({ products, totals, setProducts, setCart }) => {
	const unit = totals.currency_minor_unit;
	const symbol = totals.currency_symbol;
	return (
		<div className="py-4 overflow-y-scroll">
			<div className="h-m-450 ">
				<RenderProduct setCart={setCart} products={products} setProducts={setProducts} />
				<hr className="m-0" />
				<div className="p-2 text-2xl">
					{plugin.settings.subtotalPrice && (
						<div className="flex justify-between mt-3">
							<div className="txt ~neutral">{__("Subtotal", "vnh_textdomain")}</div>
							<div>{formatPrice(totals.total_items, unit, symbol)}</div>
						</div>
					)}
					{plugin.settings.shippingPrice && (
						<div className="flex justify-between mt-3">
							<div className="txt ~neutral">{__("Shipping", "vnh_textdomain")}</div>
							<div>{formatPrice(totals.total_shipping, unit, symbol)}</div>
						</div>
					)}
					{plugin.settings.taxPrice && (
						<div className="flex justify-between my-3">
							<div className="txt ~neutral">{__("Taxes", "vnh_textdomain")}</div>
							<div>{formatPrice(totals.total_shipping_tax, unit, symbol)}</div>
						</div>
					)}
				</div>
				{plugin.settings.totalPrice && [
					<hr className="m-0" />,
					<div className="text-2xl px-2 pt-3 flex justify-between mb-4">
						<div className="txt ~neutral">{__("Total", "vnh_textdomain")}</div>
						<div>{formatPrice(totals.total_price, unit, symbol)}</div>
					</div>,
				]}
				<div className="grid grid-cols-2 grap-5 mb-3">
					<div className="p-4 text-center ">
						<a className="btn ~neutral px-10 py-4" href={url.cart}>
							{__("Cart", "vnh_textdomain")}
						</a>
					</div>
					<div className="p-4 text-center">
						<a className="btn ~primary px-10 py-4" href={url.checkout}>
							{__("Checkout", "vnh_textdomain")}
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};
const RenderProduct = ({ products, setCart, setProducts }) => {
	const a = new Array(products);
	const [demo, setDemo] = useState(a);
	return demo.map((product) => {
		return (
			<div className="grid grid-cols-10 gap-1 py-2">
				<div className="col-span-3">
					<img width={100} src={product.images[0].thumbnail} alt="" />
				</div>
				<div className="px-3 col-span-6">
					<div className="text-2xl">{product.name}</div>
					{plugin.settings.priceTag && (
						<div className="text-xl py-2">
							{product.quantity} x{" "}
							{formatPrice(product.prices.sale_price, product.prices.currency_minor_unit, product.prices.currency_symbol)}
						</div>
					)}
					{plugin.settings.productQuantity && (
						<div className="flex mt-2">
							<div className="cursor-pointer border-solid border-neutral-400 border flex items-center p-2">
								<span onClick={() => updateQuantity(product.key, product.quantity - 1, setCart)}>-</span>
							</div>
							<div className="input-pretitire vnh-input">
								<input
									defaultValue={product.quantity}
									onChange={(e) => {
										product.quantity = e.target.value;
										console.log(demo);
										setDemo(demo);
									}}
									onBlur={async (e) => {
										await updateQuantity(product.key, e.target.value, setCart);
									}}
									name={product.key}
									type="text"
									value={product.quantity}
								/>
							</div>
							<div className="cursor-pointer border-solid border-neutral-400 border flex items-center p-2">
								<span onClick={() => updateQuantity(product.key, product.quantity + 1, setCart)}>+</span>
							</div>
						</div>
					)}
				</div>
				{plugin.settings.removeProduct && (
					<div className="text-center col-span-1">
						<span className="cursor-pointer" onClick={() => deleteProduct(product.key)}>
							<Close />
						</span>
					</div>
				)}
			</div>
		);
	});
};
export default CartContent;
