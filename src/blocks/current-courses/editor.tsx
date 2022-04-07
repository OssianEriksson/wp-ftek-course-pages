import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { Fragment, useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

import UrlSVG from '../../components/url-svg';
import { CoursePage, StudyPeriond, studyPerionds, Year } from '../../types';
import useFetchAll from '../../hooks/useFetchAll';
import { Option } from '../../components/settings-page';

import metadata from './block.json';
import { formatYear } from '../../utils/meta-formatting';

declare const wpFtekCoursePagesCurrentCoursesEditor: { iconUrl: string };

function CurrentCourses(): JSX.Element {
	const [currentSp, setCurrentSp] = useState<StudyPeriond>(studyPerionds[0]);
	useEffect(() => {
		apiFetch({ path: '/wp-ftek-course-pages/v1/settings' }).then(
			(response) => {
				const currentDate = new Date();

				const sps = (response as Option).study_periods_end
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
						setCurrentSp(sps[(i + 1) % sps.length].sp);
						return;
					}
				}
				setCurrentSp(sps[0].sp);
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
						<h3>{formatYear(year)}</h3>
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

function Edit(): JSX.Element {
	return (
		<div {...useBlockProps()}>
			<CurrentCourses />
		</div>
	);
}

registerBlockType(metadata, {
	edit: Edit,
	save: () => null,
	icon: <UrlSVG url={wpFtekCoursePagesCurrentCoursesEditor.iconUrl} />,
});
