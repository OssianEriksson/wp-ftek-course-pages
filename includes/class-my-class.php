<?php
/**
 * My_Class definition
 *
 * @package ftek\wp-ftek-course-pages
 */

namespace Ftek\WPFtekCoursePages;

/**
 * A class I made
 */
class My_Class {

	/**
	 * Default constructor
	 */
	public function __construct() {
		add_action(
			'wp_enqueue_scripts',
			function(): void {
				enqueue_entrypoint_script( 'wp-ftek-course-pages-my-script', 'my-script.tsx' );
				enqueue_entrypoint_script( 'wp-ftek-course-pages-my-style', 'my-style.scss' );
			}
		);

		add_action(
			'init',
			function(): void {
				register_block_type_from_metadata( PLUGIN_ROOT . '/build/blocks/my-block' );
				wp_set_script_translations(
					'wp-ftek-course-pages-my-block-editor-script',
					'wp-ftek-course-pages',
					PLUGIN_ROOT . '/languages'
				);
			}
		);
	}
}
