<?php
/**
 * Course_Page_Posts definition
 *
 * @package ftek\ftek-courses
 */

namespace Ftek\Courses;

/**
 * Class handling the custom course page post type
 */
class Course_Page_Posts {

	const META_FIELDS = array(
		'code'                    => array(
			'default' => '',
			'schema'  => array( 'type' => 'string' ),
		),
		'credits'                 => array(
			'default' => 0,
			'schema'  => array(
				'type'    => 'number',
				'minimum' => 0,
			),
		),
		'homepage_url'            => array(
			'default' => '',
			'schema'  => array( 'type' => 'string' ),
		),
		'info_url'                => array(
			'default' => '',
			'schema'  => array( 'type' => 'string' ),
		),
		'survey_url'              => array(
			'default' => '',
			'schema'  => array( 'type' => 'string' ),
		),
		'student_representatives' => array(
			'default' => array(),
			'schema'  => array(
				'type'  => 'array',
				'items' => array(
					'type'       => 'object',
					'properties' => array(
						'name' => array(
							'type'     => 'string',
							'required' => true,
						),
						'cid'  => array(
							'type'     => 'string',
							'required' => true,
						),
					),
				),
			),
		),
		'study_perionds'          => array(
			'default' => array(),
			'schema'  => array(
				'type'  => 'array',
				'items' => array(
					'type' => 'number',
					'enum' => array( 1, 2, 3, 4 ),
				),
			),
		),
		'year'                    => array(
			'default' => '',
			'schema'  => array(
				'type' => 'string',
				'enum' => array( '', '1', '2', '3', 'master' ),
			),
		),
		'programs'                => array(
			'default' => array(),
			'schema'  => array(
				'type'  => 'array',
				'items' => array(
					'type' => 'string',
					'enum' => array( 'F', 'TM' ),
				),
			),
		),
		'participant_count'       => array(
			'default' => 0,
			'schema'  => array(
				'type'    => 'number',
				'minimum' => 0,
			),
		),
		'elective'                => array(
			'default' => false,
			'schema'  => array( 'type' => 'boolean' ),
		),
		'comment'                 => array(
			'default' => '',
			'schema'  => array( 'type' => 'string' ),
		),
	);

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
		add_action( 'update_post_metadata', array( $this, 'update_post_slug' ), 10, 4 );
	}

	/**
	 * Updates post slug to match course code
	 *
	 * Callback for the `update_{$meta_type}_metadata` filter hook
	 *
	 * @param ?bool  $check      Whether to allow updating metadata for the given type.
	 * @param int    $object_id  ID of the page metadata is for.
	 * @param string $meta_key   Metadata key.
	 * @param mixed  $meta_value Metadata value.
	 */
	public function update_post_slug( ?bool $check, int $object_id, string $meta_key, $meta_value ): ?bool {
		if ( 'wp_ftek_course_pages_code' === $meta_key && $meta_value ) {
			wp_update_post(
				array(
					'ID'        => $object_id,
					'post_name' => $meta_value,
				)
			);
		}
		return $check;
	}

	/**
	 * Updates the rewrite rules used to assign nicer urls to posts
	 */
	public function update_rewrite_rules(): void {
		$this->register_post_type();
		flush_rewrite_rules();
	}

	/**
	 * Registers the custom post type
	 */
	public function register_post_type(): void {
		register_block_type( PLUGIN_ROOT . '/build/blocks/course-info' );
		wp_set_script_translations(
			'ftek-courses-course-info-editor-script',
			'ftek-courses',
			PLUGIN_ROOT . '/languages'
		);
		wp_add_inline_script(
			'ftek-courses-course-info-editor-script',
			'const wpFtekCoursePagesCourseInfoEditor = ' . wp_json_encode(
				array(
					'iconUrl' => plugins_url( '/assets/open-book.svg', PLUGIN_FILE ),
				)
			),
			'before'
		);

		register_post_type(
			'course-page',
			array(
				'labels'              => array(
					'name'                   => __( 'Course pages', 'ftek-courses' ),
					'singular_name'          => __( 'Course page', 'ftek-courses' ),
					'add_new'                => _x( 'Add new', 'course page', 'ftek-courses' ),
					'add_new_item'           => __( 'Add New Course page', 'ftek-courses' ),
					'edit_item'              => __( 'Edit Course page', 'ftek-courses' ),
					'new_item'               => __( 'New Course page', 'ftek-courses' ),
					'view_item'              => __( 'View Course page', 'ftek-courses' ),
					'view_items'             => __( 'View Course pages', 'ftek-courses' ),
					'search_items'           => __( 'Search Course pages', 'ftek-courses' ),
					'not_found'              => __( 'No Course pages found', 'ftek-courses' ),
					'not_found_in_trash'     => __( 'No Course pages found in Trash', 'ftek-courses' ),
					'all_items'              => __( 'All Course pages', 'ftek-courses' ),
					'attributes'             => __( 'Course page Attributes', 'ftek-courses' ),
					'insert_into_item'       => __( 'Insert into Course page', 'ftek-courses' ),
					'uploaded_to_this_item'  => __( 'Uploaded to this Course page', 'ftek-courses' ),
					'filter_items_list'      => __( 'Filter Course page list', 'ftek-courses' ),
					'items_list_navigation'  => __( 'Course page list navigation', 'ftek-courses' ),
					'items_list'             => __( 'Course page list', 'ftek-courses' ),
					'item_published'         => __( 'Course page published', 'ftek-courses' ),
					'item_reverted_to_draft' => __( 'Course page reverted to draft', 'ftek-courses' ),
					'item_scheduled'         => __( 'Course page scheduled', 'ftek-courses' ),
					'item_updated'           => __( 'Course page updated', 'ftek-courses' ),
					'item_link'              => __( 'Course page link', 'ftek-courses' ),
					'item_link_description'  => __( 'A link to a Course page', 'ftek-courses' ),
				),
				'description'         => __( 'Information about a course', 'ftek-courses' ),
				'public'              => false,
				'exclude_from_search' => false,
				'publicly_queryable'  => true,
				'show_in_nav_menus'   => true,
				'show_ui'             => true,
				'show_in_rest'        => true,
				'menu_position'       => 20,
				// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents, WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode
				'menu_icon'           => 'data:image/svg+xml;base64,' . base64_encode( file_get_contents( PLUGIN_ROOT . '/assets/open-book.svg' ) ),
				'capability_type'     => 'page',
				'delete_with_user'    => false,
				'supports'            => array( 'editor', 'custom-fields', 'title' ),
				'rewrite'             => array(
					'slug'       => $this->settings->get( 'slug' ),
					'with_front' => false,
				),
				'template'            => array(
					array( 'ftek-courses/course-info' ),
				),
			)
		);

		foreach ( self::META_FIELDS as $name => $meta_field ) {
			register_post_meta(
				'course-page',
				'wp_ftek_course_pages_' . $name,
				array(
					'type'         => $meta_field['schema']['type'],
					'single'       => true,
					'default'      => $meta_field['default'],
					'show_in_rest' => array(
						'schema' => $meta_field['schema'],
					),
				)
			);
		}
	}
}
