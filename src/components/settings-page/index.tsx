import { render, useState, useEffect } from '@wordpress/element';
import {
	Placeholder,
	Spinner,
	TextControl,
	Button,
	SnackbarList,
} from '@wordpress/components';
import { store as noticesStore } from '@wordpress/notices';
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

import './index.scss';

type Option = {
	slug: string;
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
	<>
		<h1>{__('Course Pages Settings', 'wp-ftek-course-pages')}</h1>
		<SettingsContent />
		<NoticeBar />
	</>
);

export default SettingsPage;
