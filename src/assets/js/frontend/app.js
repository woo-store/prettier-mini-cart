import http from "../http";
import { isEmpty } from "lodash";
import CartContent from "./cart";
import { formatPrice } from "../common";
import { Cart } from "../icons";
import { Spinner } from "@wordpress/components";
import { Component, createRef, useEffect } from "@wordpress/element";
import { useOutsideClick, updateQuantity } from "./helpers";
import { useRef, useState } from "react";

const App = () => {
	const [cart, setCart] = useState({});
	const [products, setProducts] = useState({});
	const [showCart, setShowCart] = useState(false);
	const ref = useRef();
	useOutsideClick(ref, () => {
		if (showCart) setShowCart(false);
	});

	useEffect(() => {
		// const fetchData = async () => {
		// 	const { data } = await http.get("wc/store/cart");
		// 	setCart(data);
		// };
		http.get("wc/store/cart").then((response) => {
			setCart(response.data);
			setProducts(response.data.items);
		});
		// fetchData();
	}, []);

	if (isEmpty(cart)) {
		return null;
	}
	const { totals, items_count } = cart;
	return (
		<div className="font-sans fixed position-cart-left-top z-50	">
			<div
				onClick={() => {
					setShowCart(!showCart);
				}}
				className="absolute left-0 top-0 w-24 h-24 text-center bg-default z--1"
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
					{/*{isLoading ? (*/}
					{/*	<div className="w-full h-full">*/}
					{/*		<Spinner />*/}
					{/*	</div>*/}
					{/*) : (*/}
					<div ref={ref}>
						<div className="py-4 border-neutral-700 border-b border-solid">
							<div className="font-bold mb-2 text-center">{__("Cart content", "vnh_textdomain")}</div>
						</div>
						<CartContent products={products} setProducts={setProducts} setCart={setCart} totals={totals} countItems={items_count} />
					</div>
					{/*)}*/}
				</div>
			)}
		</div>
	);
};
export default App;
