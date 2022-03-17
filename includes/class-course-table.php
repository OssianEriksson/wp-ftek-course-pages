<?php
/**
 * Course_Table definition
 *
 * @package ftek\wp-ftek-course-pages
 */

namespace Ftek\WPFtekCoursePages;

/**
 * Class handling the course table block
 */
class Course_Table {

	/**
	 * Adds hooks neccessary for page posts to function
	 */
	public function add_hooks() {
		add_action( 'init', array( $this, 'register_block' ) );
	}

	/**
	 * Registers course table block
	 */
	public function register_block(): void {
		register_block_type( PLUGIN_ROOT . '/build/blocks/course-table' );
		wp_set_script_translations(
			'wp-ftek-course-pages-course-table-editor-script',
			'wp-ftek-course-pages',
			PLUGIN_ROOT . '/languages'
		);
		wp_add_inline_script(
			'wp-ftek-course-pages-course-table-editor-script',
			'const wpFtekCoursePagesCourseTableEditor = ' . wp_json_encode(
				array(
					'iconUrl' => plugins_url( '/assets/open-book.svg', PLUGIN_FILE ),
				)
			),
			'before'
		);
	}
}
