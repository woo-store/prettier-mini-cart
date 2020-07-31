import http from "../http";
import { useEffect, useState } from "react";

export const useOutsideClick = (ref, callback) => {
	const handleClick = (e) => {
		if (ref.current && !ref.current.contains(e.target)) {
			callback();
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);
		};
	});
};

export const fetchCart = () => {
	const [cart, setCart] = useState({});
	http.get("wc/store/cart").then((response) => {
		setCart(response.data);
	});
	return { cart, setCart };
};

export const updateQuantity = async (key, quantity, setCart) => {
	const { data } = await http.post("wc/store/cart/update-item", { key, quantity });
	setCart(data);
};

export const deleteProduct = async (key, setCart) => {
	const { data } = await http.post("/wc/store/cart/remove-item", { key });
	return data;
};
