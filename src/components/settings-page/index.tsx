import { useState, useEffect, Fragment } from '@wordpress/element';
import {
	Placeholder,
	Spinner,
	TextControl,
	Button,
	SnackbarList,
	SelectControl,
} from '@wordpress/components';
import { store as noticesStore } from '@wordpress/notices';
import { __, _x } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

import styles from './index.module.scss';
import { Option, programs, studyPerionds, Year } from '../../types';
import { formatProgramYear } from '../../utils/meta-formatting';

const ErrorDisplay = (error: any): JSX.Element => (
	<>
		{__('The following error has occurred:', 'ftek-courses')}
		<pre className={styles.error}>{JSON.stringify(error, null, 4)}</pre>
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
		<div className={styles['placeholder-center']}>
			<Spinner />
		</div>
	</Placeholder>
);

const SettingsContent = (): JSX.Element => {
	const [error, setError] = useState<unknown>(null);
	const [option, setOption] = useState<Option>(null);
	useEffect(() => {
		apiFetch({ path: '/ftek-courses/v1/settings' })
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
			path: '/ftek-courses/v1/settings',
			method: 'POST',
			data: option,
		})
			.then(() =>
				createNotice('success', __('Settings saved.', 'ftek-courses'), {
					type: 'snackbar',
				})
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
			<h2>{__('Dates', 'ftek-courses')}</h2>
			<p>
				{__(
					'Enter the final date of each study period.',
					'ftek-courses'
				)}
			</p>
			{studyPerionds.map((sp) => (
				<div key={sp} className={styles['last-day']}>
					<span>
						{__(
							'Last day of study period %$1s',
							'ftek-courses'
						).replace('%$1s', sp.toString())}
					</span>
					<SelectControl
						label={__('Month', 'ftek-courses')}
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
						label={__('Day', 'ftek-courses')}
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
			<h2>{__('Schedules', 'ftek-courses')}</h2>
			<p>
				{__(
					'Enter the URL to the schedule for each class. The schedule should begin at the current week and end one year later.',
					'ftek-courses'
				)}
			</p>
			{(['1', '2', '3'] as Exclude<Year, 'master'>[]).map((year, i) => {
				const yeari = Number(year) - 1;
				return (
					<Fragment key={i}>
						<h3>
							{_x('Year %$1s', 'grade', 'ftek-courses').replace(
								'%$1s',
								year
							)}
						</h3>
						{programs.map((program, j) => (
							<TextControl
								key={j}
								label={__(
									'URL to schedule for %$1s',
									'ftek-courses'
								).replace(
									'%$1s',
									formatProgramYear(year, [program])
								)}
								value={option.schedules[yeari][program]}
								onChange={(value: string) => {
									const schedules = [...option.schedules];
									schedules[yeari] = {
										...schedules[yeari],
										[program]: value,
									};
									setOption({ ...option, schedules });
								}}
							/>
						))}
					</Fragment>
				);
			})}
			<h2>{__('Miscellaneous settings', 'ftek-courses')}</h2>
			<TextControl
				label={__('Course page slug', 'ftek-courses')}
				value={option.slug}
				onChange={(value: string) =>
					setOption({ ...option, slug: value })
				}
			/>
			<Button onClick={save} isPrimary>
				{__('Save changes', 'ftek-courses')}
			</Button>
		</>
	);
};

const SettingsPage = (): JSX.Element => (
	<>
		<h1>{__('Course Pages Settings', 'ftek-courses')}</h1>
		<SettingsContent />
		<NoticeBar />
	</>
);

export default SettingsPage;
