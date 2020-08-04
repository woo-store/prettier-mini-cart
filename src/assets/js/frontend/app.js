import { isEmpty } from "ramda";
import CartContent from "./cart";
import { formatPrice } from "../common";
import { Cart, Close } from "../icons";
import { Spinner } from "@wordpress/components";
import { useEffect } from "@wordpress/element";
import { useCart } from "./helpers";
import useOutsideClick from "../hooks/useOutsideClick";
import { useRef, useState } from "react";
import { useStore } from "./store";

// jQuery(document.body).on("added_to_cart", () => {
// 	setFetching(true);
// });
export default function App() {
	const { cart, setCart, setFetching } = useCart();
	const [state] = useStore();
	const [showCart, setShowCart] = useState(false);
	// trigger click add_to_cart rerender

	// componentDidMount
	useEffect(() => {
		setFetching(true);
	}, []);
	// click outside
	const ref = useRef();
	useOutsideClick(ref, () => {
		if (showCart) setShowCart(false);
	});

	if (isEmpty(cart)) return null;
	const { totals, items_count } = cart;

	return (
		<div className={`font-sans fixed position-cart-${plugin.settings.position} z-50`}>
			<div
				onClick={() => setShowCart(!showCart)}
				className={`absolute ${
					plugin.settings.position.includes("left") ? "left-0" : "right-0"
				} top-0 w-24 h-24 text-center bg-default z--1 cursor-pointer`}
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
				<div className={`px-6 relative content-cart-${plugin.settings.position} rounded shadow-lg bg-white bg-cart`}>
					{state.loading ? (
						<div className="w-full h-full">
							<Spinner />
						</div>
					) : (
						<div ref={ref}>
							<div className="py-4">
								<div className="font-bold text-center">
									{__("Cart content", "vnh_textdomain")}
									<Close className="cursor-pointer float-right" onClick={() => setShowCart(false)} />
								</div>
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
