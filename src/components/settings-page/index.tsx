import { useState, useEffect } from '@wordpress/element';
import {
	Placeholder,
	Spinner,
	TextControl,
	Button,
	SnackbarList,
	SelectControl,
} from '@wordpress/components';
import { store as noticesStore } from '@wordpress/notices';
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

import './index.scss';
import { studyPerionds } from '../../types';

export type Option = {
	slug: string;
	study_periods_end: { month: number; day: number }[];
};

const ErrorDisplay = (error: any): JSX.Element => (
	<>
		{__('The following error has occurred:', 'wp-ftek-course-pages')}
		<pre className="error">{JSON.stringify(error, null, 4)}</pre>
	</>
);

const NoticeBar = (): JSX.Element => {
	const notices = useSelect((select) =>
		select(noticesStore).getNotices()
	).filter((notice) => notice.type === 'snackbar');
	const { removeNotice } = useDispatch(noticesStore);
	return <SnackbarList notices={notices} onRemove={removeNotice} />;
};

const SpinnerPlaceholder = (): JSX.Element => (
	<Placeholder>
		<div className="placeholder-center">
			<Spinner />
		</div>
	</Placeholder>
);

const SettingsContent = (): JSX.Element => {
	const [error, setError] = useState<unknown>(null);
	const [option, setOption] = useState<Option>(null);
	useEffect(() => {
		apiFetch({ path: '/wp-ftek-course-pages/v1/settings' })
			.then((response) => {
				setOption(response as Option);
			})
			.catch((reason) => setError(reason));
	}, []);

	const { createNotice } = useDispatch(noticesStore);

	if (error) {
		return <ErrorDisplay error={error} />;
	}

	if (!option) {
		return <SpinnerPlaceholder />;
	}

	const save = () => {
		apiFetch({
			path: '/wp-ftek-course-pages/v1/settings',
			method: 'POST',
			data: option,
		})
			.then(() =>
				createNotice(
					'success',
					__('Settings saved.', 'wp-ftek-course-pages'),
					{ type: 'snackbar' }
				)
			)
			.catch((reason) =>
				createNotice(
					'error',
					reason?.message || JSON.stringify(reason),
					{ type: 'snackbar' }
				)
			);
	};

	return (
		<>
			<h2>{__('Dates', 'wp-ftek-course-pages')}</h2>
			<p>
				{__(
					'Enter the final date of each study period.',
					'wp-ftek-course-pages'
				)}
			</p>
			{studyPerionds.map((sp) => (
				<div key={sp} className="last-day">
					<span>
						{__(
							'Last day of study period %$1s',
							'wp-ftek-course-pages'
						).replace('%$1s', sp.toString())}
					</span>
					<SelectControl
						label={__('Month', 'wp-ftek-course-pages')}
						value={option.study_periods_end[sp - 1].month}
						options={[...Array(12).keys()].map((i) => ({
							label: `${i + 1}`,
							value: i + 1,
						}))}
						onChange={(value) => {
							const sps = [...option.study_periods_end];
							sps[sp - 1] = {
								...sps[sp - 1],
								month: Number(value),
							};
							setOption({
								...option,
								study_periods_end: sps,
							});
						}}
					/>
					<SelectControl
						label={__('Day', 'wp-ftek-course-pages')}
						value={option.study_periods_end[sp - 1].day}
						options={[...Array(31).keys()].map((i) => ({
							label: `${i + 1}`,
							value: i + 1,
						}))}
						onChange={(value) => {
							const sps = [...option.study_periods_end];
							sps[sp - 1] = {
								...sps[sp - 1],
								day: Number(value),
							};
							setOption({
								...option,
								study_periods_end: sps,
							});
						}}
					/>
				</div>
			))}
			<h2>{__('Miscellaneous settings', 'wp-ftek-course-pages')}</h2>
			<TextControl
				label={__('Course page slug', 'wp-ftek-course-pages')}
				value={option.slug}
				onChange={(value: string) =>
					setOption({ ...option, slug: value })
				}
			/>
			<Button onClick={save} isPrimary>
				{__('Save changes', 'wp-ftek-course-pages')}
			</Button>
		</>
	);
};

const SettingsPage = (): JSX.Element => (
	<div className="wp-ftek-course-pages-settings">
		<h1>{__('Course Pages Settings', 'wp-ftek-course-pages')}</h1>
		<SettingsContent />
		<NoticeBar />
	</div>
);

export default SettingsPage;
