import http from "../http";
import { useEffect, useState } from "@wordpress/element";
import useOnMount from "../hooks/useOnMount";
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

export const useCart = () => {
	const [cart, setCart] = useState([]);
	const fetchCart = async () => {
		const { data } = await http.get("wc/store/cart");
		setCart(data);
	};
	useOnMount(() => {
		fetchCart();
	});

	return { cart, setCart };
};

export const updateQuantity = async (key, quantity, setCart) => {
	const { data } = await http.post("wc/store/cart/update-item", { key, quantity });
	setCart(data);
};

export const deleteProduct = async (key, setCart) => {
	const { data } = await http.post("/wc/store/cart/remove-item", { key });
	setCart(data);
};
