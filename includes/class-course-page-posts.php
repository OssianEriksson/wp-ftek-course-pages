<?php
/**
 * Course_Page_Posts definition
 *
 * @package ftek\wp-ftek-course-pages
 */

namespace Ftek\WPFtekCoursePages;

/**
 * Class handling the custom course page post type
 */
class Course_Page_Posts {

	/**
	 * Local settings reference
	 *
	 * @var Settings
	 */
	private $settings;

	/**
	 * Default constructor
	 *
	 * @param Settings $settings Settings reference.
	 */
	public function __construct( Settings $settings ) {
		$this->settings = $settings;
	}

	/**
	 * Adds hooks neccessary for page posts to function
	 */
	public function add_hooks() {
		add_action( 'init', array( $this, 'register_post_type' ) );
		add_action( 'save_post_course-page', array( $this, 'update_post_slug' ), 10, 3 );
	}

	/**
	 * Updates the slug of the provided post
	 *
	 * @param int      $post_ID Post ID.
	 * @param \WP_Post $post    Post object.
	 */
	public function update_post_slug( int $post_ID, \WP_Post $post ): void {
		remove_action( 'save_post_course-page', array( $this, 'update_post_slug' ) );

		wp_update_post(
			array(
				'ID'        => $post_ID,
				'post_name' => 'tma123',
			)
		);

		add_action( 'save_post_course-page', array( $this, 'update_post_slug' ), 10, 3 );
	}

	/**
	 * Updates the rewrite rules used to assign nicer urls to posts
	 */
	public function update_rewrite_rules() {
		$this->register_post_type();
		flush_rewrite_rules();
	}

	/**
	 * Registers the custom post type
	 */
	public function register_post_type(): void {
		if ( \WP_Block_Type_Registry::get_instance()->is_registered( 'wp-drive-list/drive-list' ) ) {
			$template = array(
				'wp-drive-list/drive-list',
				array(
					'depth'    => 2,
					'download' => true,
				),
			);
		} else {
			$template = null;
		}

		register_post_type(
			'course-page',
			array(
				'labels'              => array(
					'name'                   => __( 'Course pages', 'wp-ftek-course-pages' ),
					'singular_name'          => __( 'Course page', 'wp-ftek-course-pages' ),
					'add_new'                => _x( 'Add new', 'course page', 'wp-ftek-course-pages' ),
					'add_new_item'           => __( 'Add New Course page', 'wp-ftek-course-pages' ),
					'edit_item'              => __( 'Edit Course page', 'wp-ftek-course-pages' ),
					'new_item'               => __( 'New Course page', 'wp-ftek-course-pages' ),
					'view_item'              => __( 'View Course page', 'wp-ftek-course-pages' ),
					'view_items'             => __( 'View Course pages', 'wp-ftek-course-pages' ),
					'search_items'           => __( 'Search Course pages', 'wp-ftek-course-pages' ),
					'not_found'              => __( 'No Course pages found', 'wp-ftek-course-pages' ),
					'not_found_in_trash'     => __( 'No Course pages found in Trash', 'wp-ftek-course-pages' ),
					'all_items'              => __( 'All Course pages', 'wp-ftek-course-pages' ),
					'attributes'             => __( 'Course page Attributes', 'wp-ftek-course-pages' ),
					'insert_into_item'       => __( 'Insert into Course page', 'wp-ftek-course-pages' ),
					'uploaded_to_this_item'  => __( 'Uploaded to this Course page', 'wp-ftek-course-pages' ),
					'filter_items_list'      => __( 'Filter Course page list', 'wp-ftek-course-pages' ),
					'items_list_navigation'  => __( 'Course page list navigation', 'wp-ftek-course-pages' ),
					'items_list'             => __( 'Course page list', 'wp-ftek-course-pages' ),
					'item_published'         => __( 'Course page published', 'wp-ftek-course-pages' ),
					'item_reverted_to_draft' => __( 'Course page reverted to draft', 'wp-ftek-course-pages' ),
					'item_scheduled'         => __( 'Course page scheduled', 'wp-ftek-course-pages' ),
					'item_updated'           => __( 'Course page updated', 'wp-ftek-course-pages' ),
					'item_link'              => __( 'Course page link', 'wp-ftek-course-pages' ),
					'item_link_description'  => __( 'A link to a Course page', 'wp-ftek-course-pages' ),
				),
				'description'         => __( 'Information about a course', 'wp-ftek-course-pages' ),
				'public'              => false,
				'exclude_from_search' => false,
				'publicly_queryable'  => true,
				'show_in_nav_menus'   => true,
				'show_ui'             => true,
				'show_in_rest'        => true,
				'menu_position'       => 20,
				// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents, WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode
				'menu_icon'           => 'data:image/svg+xml;base64,' . base64_encode( file_get_contents( PLUGIN_ROOT . '/assets/menu-icon.svg' ) ),
				'capability_type'     => 'page',
				'delete_with_user'    => false,
				'supports'            => array( 'editor', 'title', 'thumbnail' ),
				'rewrite'             => array(
					'slug'       => $this->settings->get( 'slug' ),
					'with_front' => false,
				),
				'template'            => $template,
			)
		);
	}
}
