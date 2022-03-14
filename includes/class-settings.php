<?php
/**
 * Handles plugin settings
 *
 * @package ftek/wp-ftek-course-pages
 */

namespace Ftek\WPFtekCoursePages;

/**
 * Handles plugin settings
 */
class Settings {

	const DEFAULT_SETTINGS = array();

	/**
	 * Default constructor
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'add_settings' ) );
		add_action( 'admin_menu', array( $this, 'add_settings_page' ) );
		add_filter( 'plugin_action_links_wp-ftek-course-pages/wp-ftek-course-pages.php', array( $this, 'add_settings_action_link' ) );
	}

	/**
	 * Returns setting values
	 *
	 * @param ?string $key Key of requested setting or null for the entire
	 *                     setting array.
	 */
	public function get( ?string $key ) {
		$option = get_option( 'wp_ftek_course_pages_option' );
		$option = array_merge( self::DEFAULT_SETTINGS, $option ? $option : array() );
		return null === $key ? $option : $option[ $key ];
	}

	/**
	 * Adds plugin settings using the WordPress Settings API
	 */
	public function add_settings(): void {
		register_setting(
			'wp_ftek_course_pages_option_group',
			'wp_ftek_course_pages_option',
			array(
				'single'       => true,
				'show_in_rest' => array(
					'schema' => array(
						'type'       => 'object',
						'required'   => true,
						'properties' => array(),
					),
				),
				'default'      => self::DEFAULT_SETTINGS,
			)
		);
	}

	/**
	 * Adds an admin menu page for plugin settings
	 */
	public function add_settings_page(): void {
		$settings_page = add_submenu_page(
			'edit.php?post_type=course-page',
			__( 'Course pages settings', 'wp-ftek-course-pages' ),
			__( 'Settings', 'wp-ftek-course-pages' ),
			'edit_others_posts',
			'wp_ftek_course_pages_settings',
			function(): void {
				?>
				<div id="wp_ftek_course_pages_settings" class="wrap"></div>
				<?php
			}
		);

		if ( $settings_page ) {
			add_action(
				'load-' . $settings_page,
				function(): void {
					add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_settings_page_scripts' ) );
				}
			);
		}
	}

	/**
	 * Enqueues scripts and styles needed on the settings page
	 */
	public function enqueue_settings_page_scripts(): void {
		enqueue_entrypoint_script( 'wp-ftek-course-pages-settings', 'settings.tsx' );
	}

	/**
	 * Filters plugin_actions_links to add a link to the plugin settings page
	 *
	 * @param array $actions An array of plugin action links.
	 */
	public function add_settings_action_link( array $actions ): array {
		$url = add_query_arg(
			array(
				'post_type' => 'course-page',
				'page'      => 'wp_ftek_course_pages_settings',
			),
			get_admin_url() . 'edit.php'
		);

		ob_start();
		?>
		<a href="<?php echo esc_attr( $url ); ?>">
			<?php esc_html_e( 'Settings', 'wp-ftek-course-pages' ); ?>
		</a>
		<?php
		$actions[] = ob_get_clean();
		return $actions;
	}

	/**
	 * Removes persistant data
	 */
	public static function clean(): void {
		delete_option( 'wp_ftek_course_pages_option' );
	}
}