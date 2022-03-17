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
		...(meta.code
			? [
					{
						text: __('Exam statistics', 'wp-ftek-course-pages'),
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
