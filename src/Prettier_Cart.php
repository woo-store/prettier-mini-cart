<?php

namespace vnh_namespace;

use vnh\contracts\Bootable;
use function vnh\flatten_version;

class Prettier_Cart implements Bootable {
	public $settings;

	public function boot() {
		add_action('wp_footer', [$this, 'elementHtml']);
		add_action('wp_footer', [$this, 'registerVariable']);
	}

	public function registerVariable() {
		//		wp_register_script('variable', get_plugin_url('build/frontend.js'));
		//		$urlWoo = [
		//			'checkout' => get_permalink(wc_get_page_id('checkout')),
		//			'cart' => get_permalink(wc_get_page_id('cart')),
		//		];
		//		wp_localize_script('variable', 'url', $urlWoo);
		//		wp_enqueue_script('variable');
	}

	public function elementHtml() {
		$html = '<div class="wrapper">';
		$html .= '<div id="prettier-cart"></div>';
		$html .= '</div>';

		echo $html;
	}
}
