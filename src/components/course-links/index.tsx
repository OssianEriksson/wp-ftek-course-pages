import { __ } from '@wordpress/i18n';

function CourseLinks({
	header,
	meta,
}: {
	header?: JSX.Element;
	meta: {
		homepage_url: string;
		info_url: string;
		survey_url: string;
		code: string;
	};
}): JSX.Element {
	const linkItems: { text: string; url: string }[] = [
		{
			text: __('Course homepage', 'ftek-courses'),
			url: meta.homepage_url,
		},
		{
			text: __('General info', 'ftek-courses'),
			url: meta.info_url,
		},
		{
			text: __('Latest survey', 'ftek-courses'),
			url: meta.survey_url,
		},
		...(meta.code
			? [
					{
						text: __('Exam statistics', 'ftek-courses'),
						url: `https://stats.ftek.se/${meta.code}`,
					},
			  ]
			: []),
	].filter((link) => link.url);

	if (linkItems.length === 0) {
		return <></>;
	}

	return (
		<>
			{header}
			<ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
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
	);
}

export default CourseLinks;
