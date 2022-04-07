import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';

import UrlSVG from '../../components/url-svg';
import CurrentCourses from '../../components/current-courses';
import metadata from './block.json';

declare const wpFtekCoursePagesCurrentCoursesEditor: { iconUrl: string };

function Edit(): JSX.Element {
	return (
		<div {...useBlockProps()}>
			<CurrentCourses />
		</div>
	);
}

function Save(): JSX.Element {
	return <div {...useBlockProps.save()}></div>;
}

registerBlockType(metadata, {
	edit: Edit,
	save: Save,
	icon: <UrlSVG url={wpFtekCoursePagesCurrentCoursesEditor.iconUrl} />,
});
