import Prices from "./price";
import Products from "./products";
import { isEmpty } from "ramda";

const CartContent = ({ cart, setCart }) => {
	const { items: products, totals } = cart;
	console.log(products);
	if (isEmpty(products)) {
		return (
			<div className="py-4 overflow-y-scroll">
				<div className="h-m-450 ">{__("No product in the cart", "vnh_textdomain")}</div>
			</div>
		);
	}
	return (
		<div className="py-4 overflow-y-scroll">
			<div className="h-m-450 ">
				<Products products={products} setCart={setCart} />
				<hr className="m-0" />
				<Prices totals={totals} />
			</div>
		</div>
	);
};

export default CartContent;
