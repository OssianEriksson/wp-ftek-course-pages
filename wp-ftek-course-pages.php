<?php
/**
 * Plugin Name:     WP Ftek Course Pages
 * Description:     WordPress plugin for displaying course information at the Physics division of Chalmers University of Technology.
 * Author:          Ossian Eriksson
 * Author URI:      https://github.com/OssianEriksson
 * Text Domain:     wp-ftek-course-pages
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package ftek\wp-ftek-course-pages
 */

namespace Ftek\WPFtekCoursePages;

require_once __DIR__ . '/vendor/autoload.php';


define( __NAMESPACE__ . '\PLUGIN_FILE', __FILE__ );
define( __NAMESPACE__ . '\PLUGIN_ROOT', dirname( PLUGIN_FILE ) );


/**
 * Enqueue an entrypoint script
 *
 * @param string $handle Script and style handle.
 * @param string $src    Name of a file inside src/entrypoints.
 */
function enqueue_entrypoint_script( string $handle, string $src ): void {
	$exploded = explode( '.js', $src );
	if ( empty( $exploded[ count( $exploded ) - 1 ] ) ) {
		array_pop( $exploded );
		$src = implode( '.js', $src );
	}

	$base_path = '/build/entrypoints/' . $src;

	$asset = require PLUGIN_ROOT . $base_path . '.asset.php';
	if ( file_exists( PLUGIN_ROOT . $base_path . '.css' ) ) {
		wp_enqueue_style(
			$handle,
			plugins_url( $base_path . '.css', PLUGIN_FILE ),
			in_array( 'wp-components', $asset['dependencies'], true ) ? array( 'wp-components' ) : array(),
			$asset['version']
		);
	}
	wp_enqueue_script(
		$handle,
		plugins_url( $base_path . '.js', PLUGIN_FILE ),
		$asset['dependencies'],
		$asset['version'],
		true
	);
	wp_set_script_translations(
		$handle,
		'wp-ftek-course-pages',
		PLUGIN_ROOT . '/languages'
	);
}


add_action(
	'init',
	function(): void {
		$plugin_rel_path = plugin_basename( dirname( PLUGIN_FILE ) ) . '/languages';
		load_plugin_textdomain( 'wp-ftek-course-pages', false, $plugin_rel_path );
	}
);


$settings = new Settings();
$settings->add_hooks();

$course_page_posts = new Course_Page_Posts( $settings );
$course_page_posts->add_hooks();

$course_list = new Course_List();
$course_list->add_hooks();

$course_table = new Course_Table();
$course_table->add_hooks();


/**
 * Plugin activation setup
 */
function activate() {
	$settings          = new Settings();
	$course_page_posts = new Course_Page_Posts( $settings );
	$course_page_posts->update_rewrite_rules();
}

register_activation_hook( __FILE__, __NAMESPACE__ . '\activate' );

/**
 * Removes persistant data
 */
function uninstall() {
	Settings::clean();
}

register_uninstall_hook( __FILE__, __NAMESPACE__ . '\uninstall' );
