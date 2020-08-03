import { isEmpty } from "ramda";
import CartContent from "./cart";
import { formatPrice } from "../common";
import { Cart } from "../icons";
import { Spinner } from "@wordpress/components";
import { useEffect } from "@wordpress/element";
import { useOutsideClick, useCart, useChangeCart } from "./helpers";
import { useRef, useState } from "react";

export default function App() {
	const { cart, setCart, setFetching } = useCart();
	const { loading } = useChangeCart({ setCart });
	const [showCart, setShowCart] = useState(false);
	// trigger Click add_to_cart rerender
	jQuery(document.body).on("added_to_cart", () => {
		setFetching(true);
	});
	// componentDidMount
	useEffect(() => {
		setFetching(true);
	}, []);

	const ref = useRef();
	useOutsideClick(ref, () => {
		if (showCart) setShowCart(false);
	});

	if (isEmpty(cart)) return null;
	const { totals, items_count } = cart;
	console.log(loading);
	return (
		<div className="font-sans fixed position-cart-left-top z-50	">
			<div
				onClick={() => {
					setShowCart(!showCart);
				}}
				className="absolute left-0 top-0 w-24 h-24 text-center bg-default z--1 cursor-pointer"
			>
				<Cart width="60" height="60" />
				<div
					className="badge-circle ~success ~high absolute position-quantity"
					style={{ "background-color": plugin.settings.colorMain || "#ff5187", color: plugin.settings.colorText || "#FFFFFF" }}
				>
					<small>{items_count}</small>
				</div>
				<small
					className="section ~success ~high whitespace-no-wrap p-4 mt-3 absolute left-0"
					style={{ "background-color": plugin.settings.colorMain || "#ff5187", color: plugin.settings.colorText || "#FFFFFF" }}
				>
					{formatPrice(totals.total_price, totals.currency_minor_unit, totals.currency_symbol)}
				</small>
			</div>
			{showCart && (
				<div className="px-6 relative left-32 rounded shadow-lg bg-white bg-cart">
					{loading ? (
						<div className="w-full h-full">
							<Spinner />
						</div>
					) : (
						<div ref={ref}>
							<div className="py-4">
								<div className="font-bold text-center">{__("Cart content", "vnh_textdomain")}</div>
							</div>
							<hr className="my-0" />
							<CartContent setCart={setCart} cart={cart} />
						</div>
					)}
				</div>
			)}
		</div>
	);
}
