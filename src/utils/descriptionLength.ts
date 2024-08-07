export const truncateDescription = (description:string, maxLength:number) => {
	if (description.length <= maxLength) {
		return description;
	}

	return description.slice(0, maxLength) + '...';
};