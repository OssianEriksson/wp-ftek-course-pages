import { Fragment, useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

import {
	Option,
	CoursePage,
	programs,
	StudyPeriond,
	studyPerionds,
	Year,
} from '../../types';
import useFetchAll from '../../hooks/useFetchAll';
import { formatYear } from '../../utils/meta-formatting';

function CurrentCourses(): JSX.Element {
	const [option, setOption] = useState<Option>(null);
	const [currentSp, setCurrentSp] = useState<StudyPeriond>(studyPerionds[0]);

	useEffect(() => {
		apiFetch({ path: '/wp-ftek-course-pages/v1/settings' }).then(
			(response) => {
				const opt = response as Option;

				setOption(() => opt);

				const currentDate = new Date();

				const sps = opt.study_periods_end
					.map((sp, i) => ({
						end: new Date(
							currentDate.getFullYear(),
							sp.month - 1,
							sp.day
						),
						sp: studyPerionds[i],
					}))
					.sort((a, b) => a.end.valueOf() - b.end.valueOf());

				for (let i = sps.length - 1; i >= 0; i--) {
					if (currentDate > sps[i].end) {
						setCurrentSp(() => sps[(i + 1) % sps.length].sp);
						return;
					}
				}
				setCurrentSp(() => sps[0].sp);
			}
		);
	}, []);

	const posts = useFetchAll<CoursePage>({
		path: '/wp/v2/course-page',
	}).filter((post) =>
		post.meta.wp_ftek_course_pages_study_perionds.includes(currentSp)
	);

	return (
		<>
			{(['1', '2', '3'] as Year[]).map((year) => {
				const currentPosts = posts
					.filter(
						(post) => post.meta.wp_ftek_course_pages_year === year
					)
					.sort(
						(a, b) =>
							b.meta.wp_ftek_course_pages_participant_count -
							a.meta.wp_ftek_course_pages_participant_count
					);

				return (
					<Fragment key={year}>
						<h3
							dangerouslySetInnerHTML={{
								__html:
									formatYear(year) +
									' ' +
									__(
										'(Schedule %$1s)',
										'wp-ftek-course-pages'
									).replace(
										'%$1s',
										programs
											.map(
												(program) =>
													`<a href="${
														option?.schedules?.[
															program
														] || ''
													}">${program}</a>`
											)
											.join(', ')
									),
							}}
						/>
						{currentPosts.length > 0 ? (
							<ul>
								{currentPosts.map((post, j) => (
									<li key={j}>
										<a href={post.link}>
											{post.title.rendered}
										</a>
									</li>
								))}
							</ul>
						) : (
							<p>
								{__('No courses found', 'wp-ftek-course-pages')}
							</p>
						)}
					</Fragment>
				);
			})}
		</>
	);
}

export default CurrentCourses;
