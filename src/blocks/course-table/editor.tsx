import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';

import UrlSVG from '../../components/url-svg';
import CourseTable from '../../components/course-table';

import metadata from './block.json';

declare const wpFtekCoursePagesCourseTableEditor: { iconUrl: string };

function Edit(): JSX.Element {
	return (
		<div {...useBlockProps()}>
			<CourseTable />
		</div>
	);
}

function Save(): JSX.Element {
	return <div {...useBlockProps.save()}></div>;
}

registerBlockType(metadata, {
	edit: Edit,
	save: Save,
	icon: <UrlSVG url={wpFtekCoursePagesCourseTableEditor.iconUrl} />,
});
