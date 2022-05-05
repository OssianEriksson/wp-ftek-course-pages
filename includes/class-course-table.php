<?php
/**
 * Course_Table definition
 *
 * @package ftek\ftek-courses
 */

namespace Ftek\Courses;

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
			'ftek-courses-course-table-editor-script',
			'ftek-courses',
			PLUGIN_ROOT . '/languages'
		);
		wp_set_script_translations(
			'ftek-courses-course-table-view-script',
			'ftek-courses',
			PLUGIN_ROOT . '/languages'
		);
		wp_add_inline_script(
			'ftek-courses-course-table-editor-script',
			'const wpFtekCoursePagesCourseTableEditor = ' . wp_json_encode(
				array(
					'iconUrl' => plugins_url( '/assets/open-book.svg', PLUGIN_FILE ),
				)
			),
			'before'
		);
	}
}
