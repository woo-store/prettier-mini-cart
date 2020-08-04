import Prices from "./price";
import Products from "./products";
import { Close } from "../../icons";
const CartContent = ({ cart, settings }) => {
	const { items: products, totals } = cart;

	return (
		<div className={`font-sans  z-50`}>
			<div className={`px-6  rounded shadow-lg bg-white`}>
				<div className="py-4">
					<div className="font-bold text-center">
						{__("Cart content", "vnh_textdomain")}
						<Close className="cursor-pointer float-right" />
					</div>
				</div>
				<div className="py-4 overflow-y-scroll">
					<div className="h-m-450 ">
						<Products products={products} settings={settings} />
						<hr className="m-0" />
						<Prices totals={totals} settings={settings} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartContent;
