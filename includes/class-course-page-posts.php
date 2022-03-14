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
	 * Default constructor
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'register_post_type' ) );
	}

	/**
	 * Registers the custom post type
	 */
	public function register_post_type() {
		register_post_type(
			'course-page',
			array(
				'labels'           => array(
					'name'                   => __( 'Course pages', 'wp-ftek-course-pages' ),
					'singular_name'          => __( 'Course page', 'wp-ftek-course-pages' ),
					'add_new'                => __( 'Add new', 'wp-ftek-course-pages' ),
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
				'description'      => __( 'Information about a course', 'wp-ftek-course-pages' ),
				'public'           => true,
				'show_in_rest'     => true,
				'menu_icon'        => 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB3aWR0aD0iNDguMHB4IgogICBoZWlnaHQ9IjQ4LjBweCIKICAgdmlld0JveD0iMCAwIDQ4LjAgNDguMCIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0iU1ZHUm9vdCIKICAgc29kaXBvZGk6ZG9jbmFtZT0iZHJhd2luZy5zdmciCiAgIGlua3NjYXBlOnZlcnNpb249IjEuMS4yICgwYTAwY2Y1MzM5LCAyMDIyLTAyLTA0LCBjdXN0b20pIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBpZD0ibmFtZWR2aWV3MTExIgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxLjAiCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9IjAiCiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9InB4IgogICAgIHNob3dncmlkPSJ0cnVlIgogICAgIGlua3NjYXBlOnpvb209IjE2LjAwNTkwMiIKICAgICBpbmtzY2FwZTpjeD0iMzQuNDU2MDM5IgogICAgIGlua3NjYXBlOmN5PSIyNy42MTQ4MTMiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxOTIwIgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjEwMTUiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9IjAiCiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjAiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiPgogICAgPGlua3NjYXBlOmdyaWQKICAgICAgIHR5cGU9Inh5Z3JpZCIKICAgICAgIGlkPSJncmlkMTE3IiAvPgogIDwvc29kaXBvZGk6bmFtZWR2aWV3PgogIDxkZWZzCiAgICAgaWQ9ImRlZnMxMDYiIC8+CiAgPGcKICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIKICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIgogICAgIGlkPSJsYXllcjEiPgogICAgPHBhdGgKICAgICAgIGlkPSJwYXRoNDQxMCIKICAgICAgIHN0eWxlPSJmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjFweDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIgogICAgICAgZD0ibSA0LjgsNC44ODU4ODIgdiAzMy4wMzIyMzQgYyA5LjYsMCAxNC40LDIuNTQwOTQyIDE5LjIsNS4wODE4ODMgNC44LC0yLjU0MDk0MSA5LjYsLTUuMDgxODgzIDE5LjIsLTUuMDgxODgzIFYgNC44ODU4ODIgYyAtOS42LDAgLTE0LjQsMi41NDA5NDExIC0xOS4yLDUuMDgxODgxNiBDIDE5LjIsNy40MjY4MjMxIDE0LjQsNC44ODU4ODIgNC44LDQuODg1ODgyIFogTSAyNCw0Mi45OTk5OTkgSCA0OCBWIDcuNDI2ODIzMSBIIDQ1LjYgViA0MC40NTkwNTggYyAtNy4yLDAgLTEyLDAgLTIxLjYsMi41NDA5NDEgeiBtIDAsMCBDIDE0LjQsNDAuNDU5MDU4IDkuNiw0MC40NTkwNTggMi40LDQwLjQ1OTA1OCBWIDcuNDI2ODIzMSBIIDAgViA0Mi45OTk5OTkgWiBNIDcuMiwxMC41NzcxOTMgYyA3LjIsMCAxMC44LDEuOTMxNzU2IDE0LjQsMy44NjMwMjUgViAxNi4zNzE3MyBDIDE4LDE0LjQ0MDQ2MyAxNC40LDEyLjUwODcwNiA3LjIsMTIuNTA4NzA2IFogbSAzMy42LDAgdiAxLjkzMTUxMyBjIC03LjIsMCAtMTAuOCwxLjkzMTc1NyAtMTQuNCwzLjg2MzAyNCBWIDE0LjQ0MDIxOCBDIDMwLDEyLjUwODk0OSAzMy42LDEwLjU3NzE5MyA0MC44LDEwLjU3NzE5MyBaIE0gNy4yLDE2Ljg3ODkyNSBjIDcuMiwwIDEwLjgsMS45MzA3NjUgMTQuNCwzLjg2MjAzMiB2IDEuOTMxNTEyIEMgMTgsMjAuNzQxMjAzIDE0LjQsMTguODA5NDQ1IDcuMiwxOC44MDk0NDUgWiBtIDMzLjYsMCB2IDEuOTMwNTIgYyAtNy4yLDAgLTEwLjgsMS45MzE3NTggLTE0LjQsMy44NjMwMjQgViAyMC43NDA5NTcgQyAzMCwxOC44MDk2OSAzMy42LDE2Ljg3ODkyNSA0MC44LDE2Ljg3ODkyNSBaIE0gNy4yLDIzLjI4MTg5OCBjIDcuMiwwIDEwLjgsMS45MzE3NTggMTQuNCwzLjg2MzAyNSB2IDEuOTMxNTEyIEMgMTgsMjcuMTQ1MTY5IDE0LjQsMjUuMjEzNDEgNy4yLDI1LjIxMzQxIFogbSAzMy42LDAgdiAxLjkzMTUxMiBjIC03LjIsMCAtMTAuOCwxLjkzMTc1OSAtMTQuNCwzLjg2MzAyNSBWIDI3LjE0NDkyMyBDIDMwLDI1LjIxMzY1NiAzMy42LDIzLjI4MTg5OCA0MC44LDIzLjI4MTg5OCBaIE0gNy4yLDI5LjU4MzYzMiBjIDcuMiwwIDEwLjgsMS45MzA3NjMgMTQuNCwzLjg2MjAzMSB2IDEuOTMxNTEyIEMgMTgsMzMuNDQ1OTA5IDE0LjQsMzEuNTE0MTUxIDcuMiwzMS41MTQxNTEgWiBtIDMzLjYsMCB2IDEuOTMwNTE5IGMgLTcuMiwwIC0xMC44LDEuOTMxNzU4IC0xNC40LDMuODYzMDI0IHYgLTEuOTMxNTEyIGMgMy42LC0xLjkzMTI2OCA3LjIsLTMuODYyMDMxIDE0LjQsLTMuODYyMDMxIHoiIC8+CiAgPC9nPgo8L3N2Zz4K',
				'capability_type'  => 'page',
				'delete_with_user' => false,
			)
		);
	}
}
