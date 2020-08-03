import http from "../http";
import { useEffect, useState } from "@wordpress/element";
import { isEmpty, has } from "ramda";
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
	const [fetching, setFetching] = useState(false);
	const fetchCart = async () => {
		const { data } = await http.get("wc/store/cart");
		setCart(data);
	};
	useEffect(() => {
		if (fetching) {
			setFetching(false);
			fetchCart();
		}
	}, [fetching]);

	return { cart, setCart, setFetching };
};

export const useChangeCart = ({ setCart }) => {
	const [loading, setLoading] = useState(false);
	const [change, setChange] = useState({});

	const updated = async (objUpdate) => {
		const { data } = await http.post("wc/store/cart/update-item", objUpdate);
		setCart(data);
		setLoading(false);
	};
	const deleted = async (objUpdate) => {
		const { data } = await http.post("/wc/store/cart/remove-item", objUpdate);
		setCart(data);
		setLoading(false);
	};
	useEffect(() => {
		if (!isEmpty(change)) {
			setLoading(true);
			if (has("quantity", change)) {
				updated(change);
			} else {
				deleted(change);
			}
		}
	}, [change]);
	return { setChange, setLoading, loading };
};
