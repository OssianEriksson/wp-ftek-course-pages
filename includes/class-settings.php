<?php
/**
 * Handles plugin settings
 *
 * @package ftek/ftek-courses
 */

namespace Ftek\Courses;

/**
 * Handles plugin settings
 */
class Settings {

	const DEFAULT_SETTINGS = array(
		'slug'              => 'course',
		'study_periods_end' => array(
			array(
				'month' => 1,
				'day'   => 1,
			),
			array(
				'month' => 1,
				'day'   => 1,
			),
			array(
				'month' => 1,
				'day'   => 1,
			),
			array(
				'month' => 1,
				'day'   => 1,
			),
		),
		'schedules'         => array(
			array(
				'F'  => '',
				'TM' => '',
			),
			array(
				'F'  => '',
				'TM' => '',
			),
			array(
				'F'  => '',
				'TM' => '',
			),
		),
	);

	/**
	 * Adds hooks neccessary for settings to function
	 */
	public function add_hooks() {
		add_action( 'rest_api_init', array( $this, 'rest_api_init' ) );
		add_action( 'admin_menu', array( $this, 'add_settings_page' ) );
		add_filter( 'plugin_action_links_ftek-courses/ftek-courses.php', array( $this, 'add_settings_action_link' ) );
	}

	/**
	 * Returns setting values
	 *
	 * @param ?string $key Key of requested setting or null for the entire
	 *                     setting array.
	 */
	public function get( ?string $key = null ) {
		$option = get_option( 'wp_ftek_course_pages_option' );
		$option = array_merge( self::DEFAULT_SETTINGS, $option ? $option : array() );
		return null === $key ? $option : $option[ $key ];
	}

	/**
	 * Registers the REST API
	 */
	public function rest_api_init(): void {
		register_rest_route(
			'ftek-courses/v1',
			'/settings',
			array(
				'methods'             => 'GET',
				'callback'            => function( \WP_REST_Request $request ): array {
					return $this->get();
				},
				'permission_callback' => function(): bool {
					return current_user_can( 'edit_others_pages' );
				},
			)
		);

		register_rest_route(
			'ftek-courses/v1',
			'/settings',
			array(
				'methods'             => 'POST',
				'callback'            => function( \WP_REST_Request $request ): array {
					$this->update_settings(
						array(
							'slug'              => $request['slug'],
							'study_periods_end' => $request['study_periods_end'],
							'schedules'         => $request['schedules'],
						)
					);

					return $this->get();
				},
				'args'                => array(
					'slug'              => array(
						'type'     => 'string',
						'required' => true,
					),
					'study_periods_end' => array(
						'type'     => 'array',
						'required' => true,
						'items'    => array(
							'type'       => 'object',
							'properties' => array(
								'month' => array(
									'type'     => 'number',
									'required' => true,
								),
								'day'   => array(
									'type'     => 'number',
									'required' => true,
								),
							),
						),
					),
					'schedules'         => array(
						'type'     => 'array',
						'required' => true,
						'items'    => array(
							'type'       => 'object',
							'properties' => array(
								'F'  => array(
									'type'     => 'string',
									'required' => true,
								),
								'TM' => array(
									'type'     => 'string',
									'required' => true,
								),
							),
						),
					),
				),
				'permission_callback' => function(): bool {
					return current_user_can( 'edit_others_pages' );
				},
			)
		);
	}

	/**
	 * Sanitizes and updates settings
	 *
	 * @param array $settings New setting values.
	 */
	public function update_settings( array $settings ): void {
		if ( $settings['slug'] !== $this->get( 'slug' ) ) {
			$course_page_posts = new Course_Page_Posts( $this );
			$course_page_posts->update_rewrite_rules();
		}

		update_option( 'wp_ftek_course_pages_option', $settings );
	}

	/**
	 * Adds an admin menu page for plugin settings
	 */
	public function add_settings_page(): void {
		$settings_page = add_submenu_page(
			'edit.php?post_type=course-page',
			__( 'Course pages settings', 'ftek-courses' ),
			__( 'Settings', 'ftek-courses' ),
			'edit_others_pages',
			'wp_ftek_course_pages_settings',
			function(): void {
				?>
				<div id="ftek-courses-settings" class="wrap"></div>
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
		enqueue_entrypoint_script( 'ftek-courses-settings', 'settings.tsx' );
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
			<?php esc_html_e( 'Settings', 'ftek-courses' ); ?>
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
