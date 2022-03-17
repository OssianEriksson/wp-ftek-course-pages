export default function hasIntersection<T>(a: T[], b: T[]): boolean {
	return a.some((elem) => b.includes(elem));
}
