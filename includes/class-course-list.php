<?php
/**
 * Course_List definition
 *
 * @package ftek\wp-ftek-course-pages
 */

namespace Ftek\WPFtekCoursePages;

/**
 * Class handling the course list block
 */
class Course_List {

	/**
	 * Adds hooks neccessary for page posts to function
	 */
	public function add_hooks() {
		add_action( 'init', array( $this, 'register_block' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_dependencies' ) );
	}

	/**
	 * Registers course list block
	 */
	public function register_block(): void {
		register_block_type( PLUGIN_ROOT . '/build/blocks/course-list' );
		wp_set_script_translations(
			'wp-ftek-course-pages-course-list-editor-script',
			'wp-ftek-course-pages',
			PLUGIN_ROOT . '/languages'
		);
		wp_set_script_translations(
			'wp-ftek-course-pages-course-list-view-script',
			'wp-ftek-course-pages',
			PLUGIN_ROOT . '/languages'
		);
		wp_add_inline_script(
			'wp-ftek-course-pages-course-list-editor-script',
			'const wpFtekCoursePagesCourseListEditor = ' . wp_json_encode(
				array(
					'iconUrl' => plugins_url( '/assets/open-book.svg', PLUGIN_FILE ),
				)
			),
			'before'
		);
	}

	/**
	 * Enques dependencies required for the block outside the editor
	 */
	public function enqueue_dependencies(): void {
		wp_enqueue_style( 'wp-components' );
	}
}
