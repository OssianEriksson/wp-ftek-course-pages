import { render } from '@wordpress/element';

import CourseList from '../../components/course-list';

document.addEventListener('DOMContentLoaded', () => {
	const roots = document.getElementsByClassName(
		'wp-block-ftek-courses-course-list'
	);
	for (let i = 0; i < roots.length; i++) {
		render(<CourseList />, roots.item(i));
	}
});
