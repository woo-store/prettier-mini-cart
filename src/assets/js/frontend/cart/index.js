import Prices from "./price";
import Products from "./products";
const CartContent = ({ cart, setCart }) => {
	const { items: products, totals } = cart;

	return (
		<div className="py-4 overflow-y-scroll">
			<div className="h-m-450 ">
				<Products products={products} setCart={setCart} setLoading={setLoading} />
				<hr className="m-0" />
				<Prices totals={totals} />
			</div>
		</div>
	);
};

export default CartContent;
