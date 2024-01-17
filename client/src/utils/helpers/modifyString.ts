export const modifyString = (title: string, maxChar: number): string => {
	const modifiedTitle =
		title.length > maxChar ? `${title.slice(0, maxChar - 4)}...` : `${title}`;

	return modifiedTitle;
};
