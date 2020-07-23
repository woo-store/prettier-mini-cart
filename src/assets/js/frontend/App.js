import http from "./http";
import { isEmpty } from "lodash";

const numberOfDecimal = (number) => {
	let result = 1;
	if (number === 0) {
		return result;
	}
	result += "0".repeat(number);
	return parseInt(result);
};

const formatPrice = (price, minorUnit, symbol) => {
	return (price / numberOfDecimal(minorUnit)).toFixed(minorUnit) + symbol;
};

export default class App extends Component {
	state = {
		products: [],
	};

	async componentDidMount() {
		try {
			const { data } = await http.get("wc/store/cart");
			this.setState({ products: data.items, totals: data.totals });
		} catch (e) {
			console.log(e.message);
		}
	}

	updateQuantity = async (key, quantity) => {
		try {
			const { data } = await http.post("wc/store/cart/update-item", { key, quantity });
			this.setState({ products: data.items, totals: data.totals });
		} catch (e) {
			console.log(e.message);
		}
	};

	deleteProduct = async (key) => {
		try {
			const { data } = await http.post("/wc/store/cart/remove-item", { key });
			this.setState({ products: data.items, totals: data.totals });
		} catch (e) {
			console.log(e.message);
		}
	};

	render() {
		const { products, totals } = this.state;
		if (isEmpty(products) || isEmpty(totals)) {
			return null;
		}
		console.log(url.checkout);
		const productsRender = products.map((product) => {
			return (
				<div className="grid grid-cols-10 gap-1 py-2">
					<div className="col-span-3">
						<img width={100} src={product.images[0].thumbnail} alt="" />
					</div>
					<div className="px-3 col-span-6">
						<div>{product.name}</div>
						<div className="text-xl py-2">
							{product.quantity} x{" "}
							{formatPrice(product.prices.sale_price, product.prices.currency_minor_unit, product.prices.currency_symbol)}
						</div>
						<div className="flex">
							<div className="cursor-pointer border-solid border-neutral-400 border flex items-center p-2">
								<span onClick={() => this.updateQuantity(product.key, product.quantity - 1)}>-</span>
							</div>
							<div className="input-pretitire vnh-input">
								<input defaultValue={product.quantity} type="text" />
							</div>
							<div className="cursor-pointer border-solid border-neutral-400 border flex items-center p-2">
								<span onClick={() => this.updateQuantity(product.key, product.quantity + 1)}>+</span>
							</div>
						</div>
					</div>
					<div className="text-center col-span-1">
						<span className="cursor-pointer" onClick={() => this.deleteProduct(product.key)}>
							x
						</span>
					</div>
				</div>
			);
		});
		return (
			<div className="font-sans fixed position-cart-left-top  z-10">
				<div className="absolute left-0 top-0 w-24 h-24">Cart btn</div>
				<div className="px-6 relative left-24 rounded shadow-lg bg-white bg-cart">
					<div className="py-4 border-neutral-700 border-b border-solid">
						<div className="font-bold mb-2 text-center">Cart content</div>
					</div>
					<div className="py-4 overflow-y-scroll">
						<div className="h-m-450 ">
							{productsRender}
							<hr className="m-0" />
							<div className="p-2">
								<div className="flex justify-between mt-3">
									<div>Subtotal</div>
									<div>{formatPrice(totals.total_items, totals.currency_minor_unit, totals.currency_symbol)}</div>
								</div>
								<div className="flex justify-between mt-3">
									<div>Shipping</div>
									<div>{formatPrice(totals.total_shipping, totals.currency_minor_unit, totals.currency_symbol)}</div>
								</div>
								<div className="flex justify-between my-3">
									<div>Taxes</div>
									<div>{formatPrice(totals.total_shipping_tax, totals.currency_minor_unit, totals.currency_symbol)}</div>
								</div>
							</div>
							<hr className="m-0" />
							<div className="px-2 pt-3 flex justify-between mb-4">
								<div>Total</div>
								<div>{formatPrice(totals.total_price, totals.currency_minor_unit, totals.currency_symbol)}</div>
							</div>
							<div className="grid grid-cols-2 grap-5">
								<div className="p-4 text-center ">
									<a className="btn ~neutral px-10 py-4" href={url.cart}>
										Cart
									</a>
								</div>
								<div className="p-4 text-center">
									<a className="btn ~primary px-10 py-4" href={url.checkout}>
										Checkout
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
