<?php

namespace vnh_namespace;

use vnh\contracts\Enqueueable;
use vnh\Register_Assets;

class Enqueue_Backend_Assets extends Register_Assets implements Enqueueable {
	public function __construct() {
		$this->scripts = [
			handle('settings-page') => [
				'src' => get_plugin_url('assets/js/dist/settings_page.js'),
				'deps' => ['wp-i18n', 'wp-components', 'wp-element', 'wp-api-fetch'],
				'localize_script' => [
					'plugin' => [
						'name' => PLUGIN_NAME,
						'version' => PLUGIN_VERSION,
						'apiPath' => PLUGIN_SLUG . '/v1/settings',
					],
				],
			],
		];
		$this->styles = [
			handle('settings-page') => [
				'src' => get_plugin_url('assets/css/settings_page.css'),
				'deps' => ['wp-components'],
			],
		];
	}

	public function boot() {
		add_action('admin_enqueue_scripts', [$this, 'register_scripts']);
		add_action('admin_enqueue_scripts', [$this, 'register_styles']);
		add_action('admin_enqueue_scripts', [$this, 'enqueue']);
	}

	public function enqueue() {
		if (is_plugin_settings_page()) {
			wp_enqueue_style(handle('settings-page'));
			wp_enqueue_script(handle('settings-page'));
		}
	}
}