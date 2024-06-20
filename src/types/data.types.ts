export interface IIconsData {
	id: number;
	src: string;
	hover_text: string;
	src_active?: string;
}

export interface IColumnData {
	id: number;
	name: string;
}

export interface ICheckedStates {
	[key: string]: boolean
}