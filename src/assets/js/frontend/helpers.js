import http from "../http";
import { useEffect, useState } from "@wordpress/element";
import { isEmpty, has } from "ramda";
import { useStore } from "./store";

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
	const [state, actions] = useStore();
	const [change, setChange] = useState({});
	const updated = async (objUpdate) => {
		const { data } = await http.post("wc/store/cart/update-item", objUpdate);
		setCart(data);
		actions.setLoading();
	};
	const deleted = async (objUpdate) => {
		const { data } = await http.post("/wc/store/cart/remove-item", objUpdate);
		setCart(data);
		actions.setLoading();
	};
	useEffect(() => {
		if (!isEmpty(change)) {
			actions.setLoading();
			if (has("quantity", change)) {
				updated(change);
			} else {
				deleted(change);
			}
		}
	}, [change]);
	return { setChange };
};
