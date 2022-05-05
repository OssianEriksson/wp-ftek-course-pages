import { __, _x } from '@wordpress/i18n';
import { Program, StudyPeriond, studyPerionds, Year } from '../types';

export const formatCode = (code: string): string =>
	code || __('Course Code', 'ftek-courses');

export const formatCredits = (credits: number): string =>
	_x('%$1s hec', 'higher education credits', 'ftek-courses').replace(
		'%$1s',
		(credits || 0).toString()
	);

export const formatProgramYear = (
	year: '' | Year,
	programs: Program[]
): string => {
	if (year === 'master') {
		return __("Master's course", 'ftek-courses');
	}
	if (programs.length > 0) {
		return programs
			.sort()
			.map((program) => program + year || '')
			.join(' ');
	}
	return _x('Year', 'grade', 'ftek-courses');
};

export const formatYear = (year: Year): string => {
	if (year === 'master') {
		return __("Master's course", 'ftek-courses');
	}
	return _x('Year %$1s', 'grade', 'ftek-courses').replace('%$1s', year);
};

export const formatSP = (sps: StudyPeriond[]): string =>
	sps.length > 0
		? sps
				.sort()
				.map((a) => [[a]])
				.reduce((previous, current) => {
					const range = previous[previous.length - 1];
					if (current[0][0] - range[range.length - 1] === 1) {
						range.push(current[0][0]);
					} else {
						previous.push(current[0]);
					}
					return previous;
				})
				.map((range) =>
					_x('SP%$1s', 'study period', 'ftek-courses').replace(
						'%$1s',
						range.length > 1
							? range[0] + '-' + range[range.length - 1]
							: range[0].toString()
					)
				)
				.join(' ')
		: _x('SP', 'study period', 'ftek-courses');
