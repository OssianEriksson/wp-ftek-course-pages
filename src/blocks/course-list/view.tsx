import { render } from '@wordpress/element';

import CourseList from '../../components/course-list';

document.addEventListener('DOMContentLoaded', () => {
	const roots = document.getElementsByClassName(
		'wp-block-wp-ftek-course-pages-course-list'
	);
	for (let i = 0; i < roots.length; i++) {
		render(<CourseList />, roots.item(i));
	}
});
