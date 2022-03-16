import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useEntityProp } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { PanelBody, PanelRow, TextControl } from '@wordpress/components';

import metadata from './block.json';

import { __, _x } from '@wordpress/i18n';

import './style.scss';

type Programme = 'F' | 'TM';
type StudyPeriod = 1 | 2 | 3 | 4;
type StudentRepresentative = { name: string; cid: string };
type PostMeta = {
	code: string;
	credits: number;
	homepage_url: string;
	info_url: string;
	survey_url: string;
	student_representatives: StudentRepresentative[];
	study_perionds: StudyPeriod[];
	year: '1' | '2' | '3' | 'master';
	programmes: Programme[];
	participant_count: number;
};

declare const wpFtekCoursePages: { iconUrl: string };

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
				if (meta.programmes.length > 0) {
					return meta.programmes
						.sort()
						.map((programme) => programme + meta.year || '')
						.join(' ');
				}
				return __('Programme', 'wp-ftek-course-pages');
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
					{meta.student_representatives.length > 0 && (
						<>
							<h3>
								{__(
									'Student Representatives',
									'wp-ftek-course-pages'
								)}
							</h3>
							<ul>
								{meta.student_representatives.map(
									(representatitve, i) => (
										<li key={i}>
											<a
												href={`mailto:${representatitve.cid}@student.chalmers.se`}
											>
												{representatitve.name}
											</a>
										</li>
									)
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
							).replace('%$1s', 'href="mailto:"snf@ftek.se"'),
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
	panelIconUrl,
}: {
	attributes: PostMeta;
	setAttributes: (a: PostMeta) => void;
	panelIconUrl: string;
}): JSX.Element {
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
						setAttributes(meta);
						setPostMeta({
							...postMeta,
							wp_ftek_course_pages_meta: meta,
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
					icon={
						<svg>
							<image
								style={{ width: '100%' }}
								xlinkHref={panelIconUrl}
							/>
						</svg>
					}
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
				panelIconUrl={wpFtekCoursePages.iconUrl}
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

registerBlockType(metadata, { edit: Edit, save: Save });
