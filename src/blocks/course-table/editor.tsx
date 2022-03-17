import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { _x, __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';

import UrlSVG from '../../components/url-svg';
import useFetchAll from '../../hooks/useFetchAll';
import {
	CoursePage,
	Program,
	programs,
	StudyPeriond,
	studyPerionds,
	Year,
	years,
} from '../../types';
import { formatProgramYear } from '../../utils/meta-formatting';

import metadata from './block.json';

import './style.scss';

declare const wpFtekCoursePagesCourseTableEditor: { iconUrl: string };

type PostView = {
	title: string;
	link: string;
};

function YearTable({
	posts,
	year,
}: {
	posts: {
		[P in Program | 'multiple']: {
			[S in StudyPeriond]: PostView[];
		};
	};
	year: Year;
}): JSX.Element {
	const allPrograms = ['multiple', ...programs] as (Program | 'multiple')[];
	const maxCourses = Object.fromEntries(
		allPrograms.map((program) => [
			program,
			Math.max(...Object.values(posts[program]).map((p) => p.length)),
		])
	) as { [P in Program | 'multiple']: number };

	if (Math.max(...Object.values(maxCourses)) <= 0) {
		return <p>{__('No courses found', 'wp-ftek-course-pages')}</p>;
	}

	return (
		<table>
			<thead>
				<tr>
					<th />
					{studyPerionds.map((sp, i) => (
						<th key={i}>
							{__(
								'Study period %$1s',
								'wp-ftek-course-pages'
							).replace('%$1s', sp.toString())}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{allPrograms.map((program, i) => {
					const p = posts[program];
					const rows = maxCourses[program];
					return [...Array(maxCourses[program]).keys()].map((j) => (
						<tr key={`${i}.${j}`}>
							{j === 0 && (
								<th rowSpan={rows}>
									{program === 'multiple'
										? _x(
												'Y%$1s',
												'grade',
												'wp-ftek-course-pages'
										  ).replace('%$1s', year)
										: formatProgramYear(year, [program])}
								</th>
							)}
							{studyPerionds.flatMap((sp, k) => {
								if (j > p[sp].length) {
									return [];
								}
								if (j === p[sp].length) {
									return [<td key={k} rowSpan={rows - j} />];
								}
								return [
									<td key={k}>
										<a href={p[sp][j].link}>
											{p[sp][j].title}
										</a>
									</td>,
								];
							})}
						</tr>
					));
				})}
			</tbody>
		</table>
	);
}

function CourseTable(): JSX.Element {
	const allPosts = useFetchAll<CoursePage>({
		path: '/wp/v2/course-page',
	});

	const posts = Object.fromEntries(
		years
			.filter((year) => year !== 'master')
			.map((year) => [
				year,
				Object.fromEntries(
					[...programs, 'multiple'].map((program) => [
						program,
						Object.fromEntries(studyPerionds.map((sp) => [sp, []])),
					])
				),
			])
	) as {
		[Y in Exclude<Year, 'master'>]: {
			[P in Program | 'multiple']: {
				[S in StudyPeriond]: PostView[];
			};
		};
	};

	allPosts.forEach((post) => {
		const {
			wp_ftek_course_pages_programs: prog,
			wp_ftek_course_pages_year: year,
			wp_ftek_course_pages_study_perionds: sps,
		} = post.meta;

		if (prog.length <= 0 || !year) {
			return;
		}

		const program = prog.length > 1 ? 'multiple' : prog[0];
		sps.forEach((sp) => {
			posts[year][program][sp].push({
				title: post.title.rendered,
				link: post.link,
			});
		});
	});

	return (
		<div className="table-wrapper">
			{(
				years.filter((year) => year !== 'master') as Exclude<
					Year,
					'master'
				>[]
			).map((year, i) => (
				<Fragment key={i}>
					<h3>
						{_x(
							'Year %$1s',
							'grade',
							'wp-ftek-course-pages'
						).replace('%$1s', year)}
					</h3>
					<YearTable key={i} year={year} posts={posts[year]} />
				</Fragment>
			))}
		</div>
	);
}

function Edit(): JSX.Element {
	return (
		<div {...useBlockProps()}>
			<CourseTable />
		</div>
	);
}

registerBlockType(metadata, {
	edit: Edit,
	save: () => null,
	icon: <UrlSVG url={wpFtekCoursePagesCourseTableEditor.iconUrl} />,
});
