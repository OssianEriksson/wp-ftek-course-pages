<?php
/**
 * Current_Courses definition
 *
 * @package ftek\wp-ftek-course-pages
 */

namespace Ftek\WPFtekCoursePages;

/**
 * Class handling the current courses block
 */
class Current_Courses {

	/**
	 * Adds hooks neccessary for page posts to function
	 */
	public function add_hooks() {
		add_action( 'init', array( $this, 'register_block' ) );
	}

	/**
	 * Registers current courses block
	 */
	public function register_block(): void {
		register_block_type( PLUGIN_ROOT . '/build/blocks/current-courses' );
		wp_set_script_translations(
			'wp-ftek-course-pages-current-courses-editor-script',
			'wp-ftek-course-pages',
			PLUGIN_ROOT . '/languages'
		);
		wp_add_inline_script(
			'wp-ftek-course-pages-current-courses-editor-script',
			'const wpFtekCoursePagesCurrentCoursesEditor = ' . wp_json_encode(
				array(
					'iconUrl' => plugins_url( '/assets/open-book.svg', PLUGIN_FILE ),
				)
			),
			'before'
		);
	}
}
