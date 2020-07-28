import { formatPrice } from "../helper";
import { Close } from "../icons";
import { products, totals } from "./sample";
export default class Preview extends Component {
	componentDidMount() {
		console.log(products);
	}

	productsRender = () => {
		console.log(products);
		return products.map((product) => {
			return (
				<div className="grid grid-cols-10 gap-1 py-2">
					<div className="col-span-3">
						<img width={100} src={product.images[0].thumbnail} alt="" />
					</div>
					<div className="px-3 col-span-6">
						<div className="text-2xl">{product.name}</div>
						<div className="text-xl py-2">
							{product.quantity} x{" "}
							{formatPrice(product.prices.sale_price, product.prices.currency_minor_unit, product.prices.currency_symbol)}
						</div>
						<div className="flex mt-2">
							<div className="cursor-pointer border-solid border-neutral-400 border flex items-center p-2">
								<span onClick={() => this.updateQuantity(product.key, product.quantity - 1)}>-</span>
							</div>
							<div className="input-pretitire vnh-input">
								<input
									defaultValue={product.quantity}
									onChange={(e) => {
										product.quantity = e.target.value;
										this.setState({ products });
									}}
									onBlur={async (e) => {
										await this.updateQuantity(product.key, e.target.value);
									}}
									className="w-full h-12 text-center rounded-none p-0 border-r-0 border-l-0"
									name={product.key}
									type="text"
									value={product.quantity}
								/>
							</div>
							<div className="cursor-pointer border-solid border-neutral-400 border flex items-center p-2">
								<span onClick={() => this.updateQuantity(product.key, product.quantity + 1)}>+</span>
							</div>
						</div>
					</div>
					<div className="text-center col-span-1">
						<span className="cursor-pointer" onClick={() => this.deleteProduct(product.key)}>
							<Close />
						</span>
					</div>
				</div>
			);
		});
	};

	render() {
		const unit = totals.currency_minor_unit;
		const symbol = totals.currency_symbol;
		return (
			<div className="py-4 overflow-y-scroll bg-white">
				<div className="h-m-450 ">
					{this.productsRender()}
					<hr className="m-0" />
					<div className="p-2 text-2xl">
						<div className="flex justify-between mt-3">
							<div className="txt ~neutral">{__("Subtotal", "vnh_textdomain")}</div>
							<div>{formatPrice(totals.total_items, unit, symbol)}</div>
						</div>
						<div className="flex justify-between mt-3">
							<div className="txt ~neutral">{__("Shipping", "vnh_textdomain")}</div>
							<div>{formatPrice(totals.total_shipping, unit, symbol)}</div>
						</div>
						<div className="flex justify-between my-3">
							<div className="txt ~neutral">{__("Taxes", "vnh_textdomain")}</div>
							<div>{formatPrice(totals.total_shipping_tax, unit, symbol)}</div>
						</div>
					</div>
					<hr className="m-0" />,
					<div className="text-2xl px-2 pt-3 flex justify-between mb-4">
						<div className="txt ~neutral">{__("Total", "vnh_textdomain")}</div>
						<div>{formatPrice(totals.total_price, unit, symbol)}</div>
					</div>
					,
					<div className="grid grid-cols-2 grap-5 mb-3">
						<div className="p-4 text-center ">
							<a className="btn ~neutral px-10 py-4" href="#">
								{__("Cart", "vnh_textdomain")}
							</a>
						</div>
						<div className="p-4 text-center">
							<a className="btn ~primary px-10 py-4" href="#">
								{__("Checkout", "vnh_textdomain")}
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
