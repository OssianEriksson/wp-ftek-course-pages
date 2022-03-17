import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';

import UrlSVG from '../../components/url-svg';
import CourseList from '../../components/course-list';

import metadata from './block.json';

declare const wpFtekCoursePagesCourseListEditor: { iconUrl: string };

function Edit(): JSX.Element {
	return (
		<div {...useBlockProps()}>
			<CourseList />
		</div>
	);
}

function Save(): JSX.Element {
	return <div {...useBlockProps.save()}></div>;
}

registerBlockType(metadata, {
	edit: Edit,
	save: Save,
	icon: <UrlSVG url={wpFtekCoursePagesCourseListEditor.iconUrl} />,
});
