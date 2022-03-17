import { AddPrefix, RemovePrefix } from '../types';

export const removePrefix = <T>(meta: T): RemovePrefix<T> => {
	return Object.fromEntries(
		Object.entries(meta)
			.filter(([k]) => k.startsWith('wp_ftek_course_pages_'))
			.map(([k, v]) => [k.replace('wp_ftek_course_pages_', ''), v])
	) as RemovePrefix<T>;
};

export const addPrefix = <T>(meta: T): AddPrefix<T> => {
	return Object.fromEntries(
		Object.entries(meta).map(([k, v]) => [`wp_ftek_course_pages_${k}`, v])
	) as AddPrefix<T>;
};
