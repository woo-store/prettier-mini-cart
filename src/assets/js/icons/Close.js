import * as React from "react";

function SvgClose(props) {
	return (
		<svg height="1em" viewBox="0 0 48 48" width="1em" {...props}>
			<path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" />
			<path d="M0 0h48v48H0z" fill="none" />
		</svg>
	);
}

export default SvgClose;