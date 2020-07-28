import { render } from "@wordpress/element";
import App from "./app";

let reload = false;

jQuery(document).ready(function ($) {
	$("body").on("added_to_cart", function () {
		reload = true;
	});
});
render(<App reload={reload} />, document.getElementById("prettier-cart"));
