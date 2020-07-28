import { PanelBody, PanelRow, ToggleControl, SelectControl, ColorPalette } from "@wordpress/components";

export default class Settings extends Component {
	state = {
		...this.props.configs,
	};

	onChange() {
		const { onChange } = this.props;
		onChange(this.state);
	}

	render() {
		const { enableCart, position, enableCartPrice, colorMain, colorText } = this.state;
		const { positions } = this.props;
		console.log(colorMain, colorText);
		return (
			<PanelBody className="bg-white mb-4" title={__("Cart settings", "vnh_textdomain")}>
				<PanelRow>
					<ToggleControl
						label={__("Enable to show sticky cart", plugin.trans)}
						checked={enableCart}
						onChange={() => this.setState({ enableCart: !enableCart }, () => this.onChange())}
					/>
				</PanelRow>
				<PanelRow>
					<SelectControl
						label={__("Sticky cart position", plugin.trans)}
						value={position}
						options={positions}
						onChange={(value) =>
							this.setState(
								{
									position: value,
								},
								() => this.onChange(),
							)
						}
					/>
				</PanelRow>
				<PanelRow>
					<ToggleControl
						label={__("Enable cart price", plugin.trans)}
						checked={enableCartPrice}
						onChange={() => this.setState({ enableCartPrice: !enableCartPrice }, () => this.onChange())}
					/>
				</PanelRow>
				<PanelRow className="block">
					<div className="block w-full">Background icon cart</div>
					<div className="block w-1/2">
						<ColorPalette
							colors={[]}
							value={colorMain}
							onChange={(value) => {
								this.setState({ colorMain: value.hex }, () => this.onChange());
							}}
							clearable={false}
						/>
					</div>
				</PanelRow>
				<PanelRow className="block">
					<div className="block w-full">Color text cart</div>
					<div className="block w-1/2">
						<ColorPalette
							colors={[]}
							value={colorText}
							onChange={(colorText) => {
								this.setState({ colorText }, () => this.onChange());
							}}
							clearable={false}
						/>
					</div>
				</PanelRow>
			</PanelBody>
		);
	}
}
