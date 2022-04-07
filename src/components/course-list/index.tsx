import {
	TextControl,
	Button,
	SelectControl,
	DropdownMenu,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __, _x } from '@wordpress/i18n';

import {
	formatCode,
	formatCredits,
	formatProgramYear,
	formatSP,
	formatYear,
} from '../../utils/meta-formatting';
import {
	PostMeta,
	PostMetaShort,
	years,
	studyPerionds,
	programs,
	Year,
	CoursePage,
} from '../../types';
import CourseLinks from '../../components/course-links';
import { removePrefix } from '../../utils/meta-map-keys';
import MenuGroupCheckboxes from '../menu-group-checkboxes';

import './index.scss';
import hasIntersection from '../../utils/includesAny';
import useFetchAll from '../../hooks/useFetchAll';

function CourseList(): JSX.Element {
	const [pageIndex, setPageIndex] = useState(0);
	const [perPage, setPerPage] = useState(10);
	const [search, setSearch] = useState('');
	const [whitelistYears, setWhitelistYears] = useState([...years]);
	const [whitelistPrograms, setWhitelistPrograms] = useState([...programs]);
	const [whitelistSPs, setWhitelistSPs] = useState([...studyPerionds]);
	const posts = useFetchAll<CoursePage>({ path: '/wp/v2/course-page' });

	const lowerCaseSearch = search.toLocaleLowerCase();
	const filteredPosts = posts
		.filter((post) => {
			const meta: PostMeta = post.meta;
			return (
				(post.title.rendered.toLowerCase().includes(lowerCaseSearch) ||
					post.meta.wp_ftek_course_pages_code
						.toLocaleLowerCase()
						.includes(lowerCaseSearch)) &&
				(whitelistYears.length === years.length ||
					(whitelistYears as ('' | Year)[]).includes(
						meta.wp_ftek_course_pages_year
					)) &&
				(whitelistPrograms.length === programs.length ||
					hasIntersection(
						whitelistPrograms,
						meta.wp_ftek_course_pages_programs
					)) &&
				(whitelistSPs.length === studyPerionds.length ||
					hasIntersection(
						whitelistSPs,
						meta.wp_ftek_course_pages_study_perionds
					))
			);
		})
		.sort(
			(a, b) =>
				b.meta.wp_ftek_course_pages_participant_count -
				a.meta.wp_ftek_course_pages_participant_count
		);

	return (
		<div className="wp-ftek-course-pages-course-list">
			<div className="course-list-header">
				<div className="header-controls">
					<div className="entries-count">
						<SelectControl
							label={__(
								'Entries to display',
								'wp-ftek-course-pages'
							)}
							value={perPage}
							options={[
								{ label: '10', value: 10 },
								{ label: '20', value: 20 },
								{ label: '50', value: 50 },
								{ label: '100', value: 100 },
							]}
							onChange={(value) => {
								setPerPage(value);
								setPageIndex(0);
							}}
						/>
					</div>
					<div className="clear-filters">
						<Button
							variant="tertiary"
							onClick={() => {
								setWhitelistYears([...years]);
								setWhitelistPrograms([...programs]);
								setWhitelistSPs([...studyPerionds]);
								setPageIndex(0);
							}}
						>
							{__('Clear filters', 'wp-ftek-course-pages')}
						</Button>
					</div>
				</div>
				<div className="header-search">
					<TextControl
						label={_x(
							'Search',
							'course page',
							'wp-ftek-course-pages'
						)}
						value={search}
						onChange={(value) => {
							setSearch(value);
							setPageIndex(0);
						}}
					/>
				</div>
			</div>
			<div className="course-list-body">
				{filteredPosts.length > 0 ? (
					<table>
						<thead>
							<tr>
								<th>
									{__('Course page', 'wp-ftek-course-pages')}
								</th>
								<th>
									{__('Course code', 'wp-ftek-course-pages')}
								</th>
								<th>{__('Credits', 'wp-ftek-course-pages')}</th>
								<th>
									<div>
										{_x(
											'Year',
											'grade',
											'wp-ftek-course-pages'
										)}
										<DropdownMenu icon="filter">
											{() => (
												<>
													<MenuGroupCheckboxes
														options={years.map(
															(year) => ({
																label: formatYear(
																	year
																),
																value: year,
															})
														)}
														checked={whitelistYears}
														onChange={(value) => {
															setWhitelistYears(
																value
															);
															setPageIndex(0);
														}}
													/>
													<MenuGroupCheckboxes
														options={programs.map(
															(program) => ({
																label: program,
																value: program,
															})
														)}
														checked={
															whitelistPrograms
														}
														onChange={(value) => {
															setWhitelistPrograms(
																value
															);
															setPageIndex(0);
														}}
													/>
												</>
											)}
										</DropdownMenu>
									</div>
								</th>
								<th>
									<div>
										{__(
											'Study period',
											'wp-ftek-course-pages'
										)}
										<DropdownMenu icon="filter">
											{() => (
												<MenuGroupCheckboxes
													options={studyPerionds.map(
														(sp) => ({
															label: formatSP([
																sp,
															]),
															value: sp,
														})
													)}
													checked={whitelistSPs}
													onChange={(value) => {
														setWhitelistSPs(value);
														setPageIndex(0);
													}}
												/>
											)}
										</DropdownMenu>
									</div>
								</th>
								<th>{__('Links', 'wp-ftek-course-pages')}</th>
							</tr>
						</thead>
						<tbody>
							{filteredPosts
								.slice(
									pageIndex * perPage,
									(pageIndex + 1) * perPage
								)
								.map((item, i: number) => {
									const meta: PostMetaShort = removePrefix(
										item.meta as PostMeta
									);

									return (
										<tr key={i}>
											<td>
												<a href={item.link}>
													{item.title.rendered}
												</a>
											</td>
											<td>{formatCode(meta.code)}</td>
											<td>
												{formatCredits(meta.credits)}
											</td>
											<td>
												{formatProgramYear(
													meta.year,
													meta.programs
												)}
											</td>
											<td>
												{formatSP(meta.study_perionds)}
											</td>
											<td>
												<CourseLinks meta={meta} />
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				) : (
					<p>{__('No courses found', 'wp-ftek-course-pages')}</p>
				)}
			</div>
			<div className="course-list-footer">
				<small>
					{__(
						'Showing %$1s to %$2s of %$3s entries',
						'wp-ftek-course-pages'
					)
						.replace(
							'%$1s',
							Math.min(
								pageIndex * perPage + 1,
								filteredPosts.length
							).toString()
						)
						.replace(
							'%$2s',
							Math.min(
								(pageIndex + 1) * perPage,
								filteredPosts.length
							).toString()
						)
						.replace('%$3s', filteredPosts.length.toString())}
				</small>
				<span>
					<Button
						variant="tertiary"
						disabled={pageIndex <= 0}
						onClick={() => setPageIndex(pageIndex - 1)}
					>
						{_x('Previous', 'course page', 'wp-ftek-course-pages')}
					</Button>
					<Button
						variant="tertiary"
						disabled={
							(pageIndex + 1) * perPage >= filteredPosts.length
						}
						onClick={() => setPageIndex(pageIndex + 1)}
					>
						{_x('Next', 'course page', 'wp-ftek-course-pages')}
					</Button>
				</span>
			</div>
		</div>
	);
}

export default CourseList;
