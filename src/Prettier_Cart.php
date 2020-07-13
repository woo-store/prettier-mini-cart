<?php

namespace vnh_namespace;

use vnh\contracts\Bootable;

class Prettier_Cart implements Bootable {
	 public $settings;

	 public function boot() {
		  add_action('wp_footer', [$this, 'elementHtml']);
	 }

	 public function elementHtml() {
		  $html = '<div class="wrapper">';
		  $html .= '<div id="prettier-cart"></div>';
		  $html .= '</div>';

		  echo $html;
	 }
}
