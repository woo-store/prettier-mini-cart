import { PanelBody, PanelRow, ToggleControl, SelectControl, ColorPicker } from "@wordpress/components";

export default class Settings extends Component {
	state = {
		...this.props.configs,
	};

	onChange() {
		const { onChange } = this.props;
		onChange(this.state);
	}

	render() {
		const { enableCart, position, enableCartPrice, colorMain } = this.state;
		console.log(colorMain);
		const { positions } = this.props;
		return (
			<PanelBody title={__("Cart settings", "vnh_textdomain")}>
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
				<PanelRow>
					<ColorPicker
						color={colorMain}
						onChangeComplete={(value) => {
							this.setState(
								{
									colorMain: value.hex,
								},
								() => this.onChange(),
							);
						}}
						disableAlpha
					/>
				</PanelRow>
			</PanelBody>
		);
	}
}
