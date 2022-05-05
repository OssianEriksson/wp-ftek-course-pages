import { render } from '@wordpress/element';

import CourseTable from '../../components/course-table';

document.addEventListener('DOMContentLoaded', () => {
	const roots = document.getElementsByClassName(
		'wp-block-ftek-courses-course-table'
	);
	for (let i = 0; i < roots.length; i++) {
		render(<CourseTable />, roots.item(i));
	}
});
