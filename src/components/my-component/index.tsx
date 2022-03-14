import { __ } from '@wordpress/i18n';

export default function MyComponent(): JSX.Element {
	return <div>{__('Hello from MyComponent!', 'wp-ftek-course-pages')}</div>;
}
