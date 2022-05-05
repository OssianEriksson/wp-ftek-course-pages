import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
} from '@wordpress/block-editor';
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
import { __, _x } from '@wordpress/i18n';

import UrlSVG from '../../components/url-svg';
import CourseLinks from '../../components/course-links';
import {
	formatCredits,
	formatCode,
	formatYear,
	formatSP,
	formatProgramYear,
} from '../../utils/meta-formatting';
import { addPrefix, removePrefix } from '../../utils/meta-map-keys';
import {
	PostMeta,
	PostMetaShort,
	studyPerionds,
	years,
	programs,
} from '../../types';

import metadata from './block.json';

import styles from './style.module.scss';

type BlockAttributes = PostMetaShort;

declare const wpFtekCoursePagesCourseInfoEditor: { iconUrl: string };

function RenderedCoursePage({
	meta,
	children,
}: {
	meta: BlockAttributes;
	children: React.ReactNode;
}): JSX.Element {
	const studentRepresentativeItems = meta.student_representatives.filter(
		(representative) => representative.name || representative.cid
	);

	return (
		<>
			<h2>{`${formatCode(meta.code)} | ${formatCredits(
				meta.credits
			)} | ${formatProgramYear(meta.year, meta.programs)} | ${formatSP(
				meta.study_perionds
			)}`}</h2>
			<div className={styles['course-layout']}>
				<div className={styles['course-content']}>{children}</div>
				<div className={styles['course-sidebar']}>
					<CourseLinks
						header={<h3>{__('Links', 'ftek-courses')}</h3>}
						meta={meta}
					/>
					{studentRepresentativeItems.length > 0 && (
						<>
							<h3>
								{__('Student Representatives', 'ftek-courses')}
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
					<h3>{__('Is Anything Missing?', 'ftek-courses')}</h3>
					<span
						dangerouslySetInnerHTML={{
							__html: __(
								'Contact <a %$1s>SNF</a>.',
								'ftek-courses'
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
	attributes: BlockAttributes;
	setAttributes: (a: BlockAttributes) => void;
	panelIcon: JSX.Element;
}): JSX.Element {
	const [creditsText, setCreditsText] = useState<string>(null);
	const [participantCountText, setParticipantCountText] =
		useState<string>(null);

	type Block = [string, { [key: string]: unknown }];
	const driveList = useSelect(
		(select) =>
			select('core/blocks').getBlockType('wp-drive-list/drive-list'),
		[]
	);
	const innerBlocksTemplate: Block[] = [
		[
			'core/heading',
			{ content: __('Description', 'ftek-courses'), level: 3 },
		],
		[
			'core/paragraph',
			{
				placeholder: __('Description goes here.', 'ftek-courses'),
			},
		],
		...(driveList
			? ([
					[
						'core/heading',
						{
							content: _x(
								'Documents',
								'drive list heading',
								'ftek-courses'
							),
							level: 3,
						},
					],
					[
						'wp-drive-list/drive-list',
						{
							depth: 2,
							download: true,
						},
					],
			  ] as Block[])
			: []),
	];

	const postType = useSelect(
		(select) => select('core/editor').getCurrentPostType(),
		[]
	);
	const [partialPostMeta, setPostMeta]: [
		Partial<PostMeta>,
		(m: Partial<PostMeta>) => void
	] = useEntityProp('postType', postType, 'meta');

	const meta: BlockAttributes = {
		...attributes,
		...(postType === 'course-page' ? removePrefix(partialPostMeta) : {}),
	};
	const setMeta = (m: BlockAttributes) => {
		setAttributes(m);
		if (postType === 'course-page') {
			setPostMeta(addPrefix(m));
		}
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Course Page', 'ftek-courses')}
					initialOpen={true}
					icon={panelIcon}
				>
					<PanelRow>
						<TextControl
							label={__('Course code', 'ftek-courses')}
							value={meta.code}
							onChange={(value) =>
								setMeta({ ...meta, code: value })
							}
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label={__('Credits', 'ftek-courses')}
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
							label={__('Course homepage URL', 'ftek-courses')}
							value={meta.homepage_url}
							onChange={(value) =>
								setMeta({ ...meta, homepage_url: value })
							}
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label={__('Course info URL', 'ftek-courses')}
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
								'ftek-courses'
							)}
							value={meta.survey_url}
							onChange={(value) =>
								setMeta({ ...meta, survey_url: value })
							}
						/>
					</PanelRow>
					<hr />
					<PanelRow>
						<div className={styles['list-selector']}>
							<div className={styles['panel-label']}>
								{__('Student representatives', 'ftek-courses')}
							</div>
							{meta.student_representatives.map(
								(representative, i) => (
									<div
										key={i}
										className={styles['list-selector-item']}
									>
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
										<div
											className={styles['stacked-inputs']}
										>
											<TextControl
												label={__(
													'Full Name',
													'ftek-courses'
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
													'ftek-courses'
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
									'ftek-courses'
								)}
							</Button>
						</div>
					</PanelRow>
					<hr />
					<PanelRow>
						<div>
							<div className={styles['panel-label']}>
								{__('Study period', 'ftek-courses')}
							</div>
							{studyPerionds.map((sp, i) => (
								<CheckboxControl
									key={i}
									label={_x(
										'SP%$1s',
										'study period',
										'ftek-courses'
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
							label={_x('Year', 'grade', 'ftek-courses')}
							selected={meta.year}
							options={years.map((year) => ({
								label: formatYear(year),
								value: year,
							}))}
							onChange={(value) =>
								setMeta({ ...meta, year: value })
							}
						/>
					</PanelRow>
					<hr />
					<PanelRow>
						<div>
							<div className={styles['panel-label']}>
								{__('Progammes', 'ftek-courses')}
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
								'ftek-courses'
							)}
							help={__(
								'Used for sorting courses',
								'ftek-courses'
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
					<PanelRow>
						<CheckboxControl
							label={__('Elective course', 'ftek-courses')}
							checked={meta.elective}
							onChange={(checked) => {
								setMeta({
									...meta,
									elective: checked,
								});
							}}
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label={__('Comment', 'ftek-courses')}
							help={__(
								'Shown as footnote in course table',
								'ftek-courses'
							)}
							value={meta.comment}
							onChange={(value) => {
								setMeta({
									...meta,
									comment: value,
								});
							}}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<RenderedCoursePage meta={meta}>
				<InnerBlocks template={innerBlocksTemplate} />
			</RenderedCoursePage>
		</>
	);
}

function Edit({ attributes, setAttributes }): JSX.Element {
	return (
		<div {...useBlockProps()}>
			<EditableCoursePage
				attributes={attributes}
				setAttributes={setAttributes}
				panelIcon={
					<UrlSVG
						url={wpFtekCoursePagesCourseInfoEditor.iconUrl}
						style={{ width: 24, height: 24, marginLeft: 12 }}
					/>
				}
			/>
		</div>
	);
}

function Save({ attributes }): JSX.Element {
	return (
		<div {...useBlockProps.save()}>
			<RenderedCoursePage meta={attributes}>
				<InnerBlocks.Content />
			</RenderedCoursePage>
		</div>
	);
}

registerBlockType(metadata, {
	edit: Edit,
	save: Save,
	icon: <UrlSVG url={wpFtekCoursePagesCourseInfoEditor.iconUrl} />,
});
