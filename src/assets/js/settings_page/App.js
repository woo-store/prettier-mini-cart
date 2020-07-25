import { Button, Placeholder, Spinner } from "@wordpress/components";
import apiFetch from "@wordpress/api-fetch";
import CartSetting from "./setting/index";
import ProductSettings from "./setting/ProductSetting";
import { isEmpty } from "lodash";

class App extends Component {
	state = {
		isAPILoaded: false,
		isAPISaving: false,
		positions: [
			{
				label: "Left top",
				value: "left-top",
			},
			{
				label: "Left center",
				value: "left-center",
			},
			{
				label: "Left bottom",
				value: "left-bottom",
			},
			{
				label: "Right top",
				value: "right-top",
			},
			{
				label: "Right center",
				value: "right-center",
			},
			{
				label: "Right center",
				value: "right-center",
			},
		],
		configs: {
			enableCart: true,
			position: "left-top",
			enableCartPrice: true,
			productQuantity: true,
			removeProduct: true,
			priceTag: true,
			totalPrice: true,
			subtotalPrice: true,
			shippingPrice: true,
			taxPrice: true,
			colorMain: "#FF5187",
		},
	};

	payload = {};

	async componentDidMount() {
		const settings = await apiFetch({ path: pluginApiPath });
		const configState = Object.assign(this.state.configs, settings);
		this.setState({
			configs: configState,
			isAPILoaded: true,
		});
	}

	onChange = (payload) => {
		this.payload = payload;
	};

	async saveSettings() {
		this.setState({ isAPISaving: true });
		if (isEmpty(this.payload)) {
			return;
		}
		await apiFetch({ path: pluginApiPath, method: "POST", parse: false, data: this.payload });
		this.setState({ isAPISaving: false });
	}

	render() {
		const { configs, positions, isAPILoaded, isAPISaving } = this.state;
		if (!isAPILoaded) {
			return (
				<>
					<div className="bg-white py-6 mb-4">
						<div className="container w-9/12 lg:w-7/12 mx-auto">
							<div className="flex items-center">
								<h1>{plugin.pluginName}</h1>
								<div className="ml-3 text-xs rounded font-light bg-gray-200 px-1 border-gray-300">v{plugin.pluginVersion}</div>
							</div>
						</div>
					</div>
					<div className="container w-9/12 lg:w-7/12 mx-auto flex items-center">
						<Placeholder>
							<Spinner />
						</Placeholder>
					</div>
				</>
			);
		}

		return (
			<>
				<div className="bg-white py-6 mb-4">
					<div className="container w-9/12 lg:w-7/12 mx-auto">
						<div className="flex items-center">
							<h1>{plugin.name}</h1>
							<div className="ml-3 text-xs rounded font-light bg-gray-200 px-1 border-gray-300">v{plugin.version}</div>
						</div>
					</div>
				</div>

				<div className="container w-9/12 lg:w-7/12 mx-auto">
					<CartSetting configs={configs} positions={positions} onChange={this.onChange} />
					<ProductSettings configs={configs} onChange={this.onChange} />
					<Button isPrimary isLarge disabled={isAPISaving} onClick={() => this.saveSettings()}>
						{__("Save Settings", "vnh_textdomain")}
					</Button>
				</div>
			</>
		);
	}
}

export default App;
