import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import {
	PanelBody,
	PanelRow,
	TextControl,
	Button,
	CheckboxControl,
	RadioControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { trash } from '@wordpress/icons';

import metadata from './block.json';

import { __, _x } from '@wordpress/i18n';

import './style.scss';

const programs = ['F', 'TM'] as const;
const studyPerionds = [1, 2, 3, 4] as const;
const years = ['1', '2', '3', 'master'] as const;

type StudyPeriod = typeof studyPerionds[number];
type StudentRepresentative = { name: string; cid: string };
type PostMeta = {
	code: string;
	credits: number;
	homepage_url: string;
	info_url: string;
	survey_url: string;
	student_representatives: StudentRepresentative[];
	study_perionds: typeof studyPerionds[number][];
	year: '' | typeof years[number];
	programs: typeof programs[number][];
	participant_count: number;
};

declare const wpFtekCoursePages: { iconUrl: string };

const coursePageIcon = (
	<svg>
		<image
			style={{ width: '100%' }}
			xlinkHref={wpFtekCoursePages.iconUrl}
		/>
	</svg>
);

function RenderedCoursePage({ meta }: { meta: PostMeta }): JSX.Element {
	const linkItems = [
		{
			text: __('Course homepage', 'wp-ftek-course-pages'),
			url: meta.homepage_url,
		},
		{
			text: __('General info', 'wp-ftek-course-pages'),
			url: meta.info_url,
		},
		{
			text: __('Latest survey', 'wp-ftek-course-pages'),
			url: meta.survey_url,
		},
	].filter((link) => link.url);

	const studentRepresentativeItems = meta.student_representatives.filter(
		(representative) => representative.name || representative.cid
	);

	return (
		<>
			<h2 className="course-banner">{`${
				meta.code || __('Course Code', 'wp-ftek-course-pages')
			} | ${meta.credits || 0} ${_x(
				'hec',
				'higher education credits',
				'wp-ftek-course-pages'
			)} | ${(() => {
				if (meta.year === 'master') {
					return __("Master's course", 'wp-ftek-course-pages');
				}
				if (meta.programs.length > 0) {
					return meta.programs
						.sort()
						.map((program) => program + meta.year || '')
						.join(' ');
				}
				return __('Program', 'wp-ftek-course-pages');
			})()} | ${
				meta.study_perionds.length > 0
					? meta.study_perionds
							.sort()
							.map((a) => [[a]])
							.reduce((previous, current) => {
								const range = previous[previous.length - 1];
								if (
									current[0][0] - range[range.length - 1] ===
									1
								) {
									range.push(current[0][0]);
								} else {
									previous.push(current[0]);
								}
								return previous;
							})
							.map((range) =>
								_x(
									'SP%$1s',
									'study period',
									'wp-ftek-course-pages'
								).replace(
									'%$1s',
									range.length > 1
										? range[0] +
												'-' +
												range[range.length - 1]
										: range[0].toString()
								)
							)
							.join(' ')
					: _x('SP', 'study period', 'wp-ftek-course-pages')
			}`}</h2>
			<div className="course-layout">
				<div className="course-content">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit,
					sed do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat.
					Duis aute irure dolor in reprehenderit in voluptate velit
					esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
					occaecat cupidatat non proident, sunt in culpa qui officia
					deserunt mollit anim id est laborum.
				</div>
				<div className="course-sidebar">
					{linkItems.length > 0 && (
						<>
							<h3>{__('Links', 'wp-ftek-course-pages')}</h3>
							<ul>
								{linkItems.map((link, i) => (
									<li key={i}>
										<a
											target="_blank"
											rel="noopener noreferrer"
											href={link.url}
										>
											{link.text}
										</a>
									</li>
								))}
							</ul>
						</>
					)}
					{studentRepresentativeItems.length > 0 && (
						<>
							<h3>
								{__(
									'Student Representatives',
									'wp-ftek-course-pages'
								)}
							</h3>
							<ul>
								{studentRepresentativeItems.map(
									(representatitve, i) => {
										const name =
											representatitve.name ||
											representatitve.cid;
										return (
											<li key={i}>
												{representatitve.cid ? (
													<a
														href={`mailto:${representatitve.cid}@student.chalmers.se`}
													>
														{name}
													</a>
												) : (
													name
												)}
											</li>
										);
									}
								)}
							</ul>
						</>
					)}
					<h3>
						{__('Is Anything Missing?', 'wp-ftek-course-pages')}
					</h3>
					<span
						dangerouslySetInnerHTML={{
							__html: __(
								'Contact <a %$1s>SNF</a>.',
								'wp-ftek-course-pages'
							).replace('%$1s', 'href="mailto:snf@ftek.se"'),
						}}
					/>
				</div>
			</div>
		</>
	);
}

function EditableCoursePage({
	attributes,
	setAttributes,
	panelIcon,
}: {
	attributes: PostMeta;
	setAttributes: (a: PostMeta) => void;
	panelIcon: JSX.Element;
}): JSX.Element {
	const [creditsText, setCreditsText] = useState<string>(null);
	const [participantCountText, setParticipantCountText] =
		useState<string>(null);

	const postType = useSelect(
		(select) => select('core/editor').getCurrentPostType(),
		[]
	);

	const [postMeta, setPostMeta] = useEntityProp('postType', postType, 'meta');

	const [meta, setMeta]: [PostMeta, (m: PostMeta) => void] =
		'wp_ftek_course_pages_meta' in postMeta
			? [
					postMeta.wp_ftek_course_pages_meta,
					(m: PostMeta) => {
						setAttributes(m);
						setPostMeta({
							...postMeta,
							wp_ftek_course_pages_meta: m,
						});
					},
			  ]
			: [attributes, setAttributes];

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Course Page', 'wp-ftek-course-pages')}
					initialOpen={true}
					icon={panelIcon}
				>
					<PanelRow>
						<TextControl
							label={__('Course code', 'wp-ftek-course-pages')}
							value={meta.code}
							onChange={(value) =>
								setMeta({ ...meta, code: value })
							}
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label={__('Credits', 'wp-ftek-course-pages')}
							value={
								creditsText !== null
									? creditsText
									: meta.credits
							}
							onChange={(value) => {
								setCreditsText(value);
								const numeric = Number(value);
								if (Number.isFinite(numeric) && numeric >= 0) {
									setMeta({ ...meta, credits: numeric });
								}
							}}
						/>
					</PanelRow>
					<hr />
					<PanelRow>
						<TextControl
							label={__(
								'Course homepage URL',
								'wp-ftek-course-pages'
							)}
							value={meta.homepage_url}
							onChange={(value) =>
								setMeta({ ...meta, homepage_url: value })
							}
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label={__(
								'Course info URL',
								'wp-ftek-course-pages'
							)}
							value={meta.info_url}
							onChange={(value) =>
								setMeta({ ...meta, info_url: value })
							}
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label={__(
								'Latest course survey URL',
								'wp-ftek-course-pages'
							)}
							value={meta.survey_url}
							onChange={(value) =>
								setMeta({ ...meta, survey_url: value })
							}
						/>
					</PanelRow>
					<hr />
					<PanelRow>
						<div className="wp-block-wp-ftek-course-pages-course-info-inspector list-selector">
							<div className="panel-label">
								{__(
									'Student representatives',
									'wp-ftek-course-pages'
								)}
							</div>
							{meta.student_representatives.map(
								(representative, i) => (
									<div key={i} className="list-selector-item">
										<Button
											icon={trash}
											onClick={() => {
												const representatives = [
													...meta.student_representatives,
												];
												representatives.splice(i, 1);
												setMeta({
													...meta,
													student_representatives:
														representatives,
												});
											}}
										/>
										<div className="stacked-inputs">
											<TextControl
												label={__(
													'Full Name',
													'wp-ftek-course-pages'
												)}
												value={representative.name}
												onChange={(value) => {
													const representatives = [
														...meta.student_representatives,
													];
													representatives[i] = {
														...representative,
														name: value,
													};
													setMeta({
														...meta,
														student_representatives:
															representatives,
													});
												}}
											/>
											<TextControl
												label={_x(
													'CID',
													'Chalmers ID',
													'wp-ftek-course-pages'
												)}
												value={representative.cid}
												onChange={(value) => {
													const representatives = [
														...meta.student_representatives,
													];
													representatives[i] = {
														...representative,
														cid: value,
													};
													setMeta({
														...meta,
														student_representatives:
															representatives,
													});
												}}
											/>
										</div>
									</div>
								)
							)}
							<Button
								onClick={() =>
									setMeta({
										...meta,
										student_representatives: [
											...meta.student_representatives,
											{ name: '', cid: '' },
										],
									})
								}
								variant="secondary"
							>
								{_x(
									'Add',
									'student representative',
									'wp-ftek-course-pages'
								)}
							</Button>
						</div>
					</PanelRow>
					<hr />
					<PanelRow>
						<div className="wp-block-wp-ftek-course-pages-course-info-inspector">
							<div className="panel-label">
								{__('Study perionds', 'wp-ftek-course-pages')}
							</div>
							{studyPerionds.map((sp, i) => (
								<CheckboxControl
									key={i}
									label={_x(
										'SP%$1s',
										'study period',
										'wp-ftek-course-pages'
									).replace('%$1s', sp.toString())}
									checked={meta.study_perionds.includes(sp)}
									onChange={() => {
										const sps = [...meta.study_perionds];
										const index = sps.indexOf(sp);
										if (index >= 0) {
											sps.splice(index, 1);
										} else {
											sps.push(sp);
										}
										setMeta({
											...meta,
											study_perionds: sps,
										});
									}}
								/>
							))}
						</div>
					</PanelRow>
					<hr />
					<PanelRow>
						<RadioControl
							label={_x('Year', 'grade', 'wp-ftek-course-pages')}
							selected={meta.year}
							options={years.flatMap((year) => {
								let label: string;
								if (Number.isFinite(Number(year))) {
									label = _x(
										'Year %$1s',
										'grade',
										'wp-ftek-course-pages'
									).replace('%$1s', year);
								} else if (year == 'master') {
									label = __(
										"Master's course",
										'wp-ftek-course-pages'
									);
								} else {
									return [];
								}
								return { label, value: year };
							})}
							onChange={(value) =>
								setMeta({ ...meta, year: value })
							}
						/>
					</PanelRow>
					<hr />
					<PanelRow>
						<div className="wp-block-wp-ftek-course-pages-course-info-inspector">
							<div className="panel-label">
								{__('Progammes', 'wp-ftek-course-pages')}
							</div>
							{programs.map((program, i) => (
								<CheckboxControl
									key={i}
									label={program}
									checked={meta.programs.includes(program)}
									onChange={() => {
										const prgs = [...meta.programs];
										const index = prgs.indexOf(program);
										if (index >= 0) {
											prgs.splice(index, 1);
										} else {
											prgs.push(program);
										}
										setMeta({
											...meta,
											programs: prgs,
										});
									}}
								/>
							))}
						</div>
					</PanelRow>
					<hr />
					<PanelRow>
						<TextControl
							label={__(
								'Approximate number of participants',
								'wp-ftek-course-pages'
							)}
							help={__(
								'Used for sorting courses',
								'wp-ftek-course-pages'
							)}
							value={
								participantCountText !== null
									? participantCountText
									: meta.participant_count
							}
							onChange={(value) => {
								setParticipantCountText(value);
								const numeric = Number(value);
								if (Number.isFinite(numeric) && numeric >= 0) {
									setMeta({
										...meta,
										participant_count: numeric,
									});
								}
							}}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<RenderedCoursePage meta={meta} />
		</>
	);
}

function Edit({ attributes, setAttributes }): JSX.Element {
	return (
		<div {...useBlockProps()}>
			<EditableCoursePage
				attributes={attributes}
				setAttributes={setAttributes}
				panelIcon={coursePageIcon}
			/>
		</div>
	);
}

function Save({ attributes }): JSX.Element {
	return (
		<div {...useBlockProps.save()}>
			<RenderedCoursePage meta={attributes} />
		</div>
	);
}

registerBlockType(metadata, { edit: Edit, save: Save, icon: coursePageIcon });

console.debug(__('Course Code', 'wp-ftek-course-pages'));
