export const programs = ['F', 'TM'] as const;
export const studyPerionds = [1, 2, 3, 4] as const;
export const years = ['1', '2', '3', 'master'] as const;

export type Program = typeof programs[number];
export type StudyPeriond = typeof studyPerionds[number];
export type Year = typeof years[number];
export type StudentRepresentative = { name: string; cid: string };

export type PostMetaShort = {
	code: string;
	credits: number;
	homepage_url: string;
	info_url: string;
	survey_url: string;
	student_representatives: StudentRepresentative[];
	study_perionds: StudyPeriond[];
	year: '' | Year;
	programs: Program[];
	participant_count: number;
	elective: boolean;
	comment: string;
};

export type AddPrefix<T> = {
	[K in keyof T as `wp_ftek_course_pages_${string & K}`]: T[K];
};
export type RemovePrefix<T> = {
	[K in keyof T as K extends `wp_ftek_course_pages_${infer U}`
		? U
		: never]: T[K];
};

export type PostMeta = AddPrefix<PostMetaShort>;

export type CoursePage = {
	meta: PostMeta;
	link: string;
	title: {
		rendered: string;
	};
};

export type Option = {
	slug: string;
	study_periods_end: { month: number; day: number }[];
	schedules: { [P in Program]: string }[];
};
