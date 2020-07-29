import http from "../http";
import { isEmpty } from "lodash";
import CartContent from "./cart";
import { formatPrice } from "../helper";
import { Cart } from "../icons";
import { Spinner } from "@wordpress/components";

export default class App extends Component {
	wrapperRef = React.createRef();
	state = {
		products: [],
		totals: [],
		countItems: 0,
		isLoading: false,
		showContentCart: false,
		reload: this.props.reload,
	};
	shouldComponentUpdate(nextProps, nextState) {
		console.log(nextProps.reload);
		if (nextState.reload !== nextProps.reload) {
			return true;
		}
		return false;
	}
	async componentDidMount() {
		try {
			// listen event click
			document.addEventListener("click", this.handleClick);
			const { data } = await http.get("wc/store/cart");
			this.setState({
				products: data.items,
				totals: data.totals,
				countItems: data.items_count,
			});
		} catch (e) {
			console.log(e.message);
		}
	}
	componentWillUnmount() {
		document.removeEventListener("click", this.handleClick);
	}

	handleClick = (event) => {
		const { target } = event;
		// when click Out of Cart content -> close
		if (this.wrapperRef.current && !this.wrapperRef.current.contains(target)) {
			this.setState({ showContentCart: false });
		}
	};

	updateComponent = (data) => {
		this.setState({ products: data.items, totals: data.totals, countItems: data.items_count, isLoading: false });
	};

	render() {
		const { products, totals, showContentCart, countItems, isLoading } = this.state;
		if (isEmpty(products) || isEmpty(totals)) {
			return null;
		}
		return (
			<div className="font-sans fixed position-cart-left-top z-50	">
				<div
					onClick={() => {
						this.setState({ showContentCart: true });
					}}
					className="absolute left-0 top-0 w-24 h-24 text-center bg-default z--1"
				>
					<Cart width="60" height="60" />
					<div
						className="badge-circle ~success ~high absolute position-quantity"
						style={{ "background-color": plugin.settings.colorMain || "#ff5187", color: plugin.settings.colorText || "#FFFFFF" }}
					>
						<small>{countItems}</small>
					</div>
					<small
						className="section ~success ~high whitespace-no-wrap p-4 mt-3 absolute left-0"
						style={{ "background-color": plugin.settings.colorMain || "#ff5187", color: plugin.settings.colorText || "#FFFFFF" }}
					>
						{formatPrice(totals.total_price, totals.currency_minor_unit, totals.currency_symbol)}
					</small>
				</div>
				{showContentCart && (
					<div className="px-6 relative left-32 rounded shadow-lg bg-white bg-cart">
						{isLoading ? (
							<div className="w-full h-full">
								<Spinner />
							</div>
						) : (
							<div ref={this.wrapperRef}>
								<div className="py-4 border-neutral-700 border-b border-solid">
									<div className="font-bold mb-2 text-center">{__("Cart content", "vnh_textdomain")}</div>
								</div>
								<CartContent
									products={products}
									totals={totals}
									countItems={countItems}
									loading={() => {
										this.setState({ isLoading: true });
									}}
									updateComponent={this.updateComponent}
								/>
							</div>
						)}
					</div>
				)}
			</div>
		);
	}
}
