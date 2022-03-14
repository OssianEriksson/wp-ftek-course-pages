import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';

import { __ } from '@wordpress/i18n';

function MyComponent(): JSX.Element {
	return <div>{__('Hello from MyComponent!', 'wp-ftek-course-pages')}</div>;
}

registerBlockType(metadata, { edit: MyComponent, save: MyComponent });
