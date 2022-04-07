import { render } from '@wordpress/element';

import CurrentCourses from '../../components/current-courses';

document.addEventListener('DOMContentLoaded', () => {
	const roots = document.getElementsByClassName(
		'wp-block-wp-ftek-course-pages-current-courses'
	);
	for (let i = 0; i < roots.length; i++) {
		render(<CurrentCourses />, roots.item(i));
	}
});
