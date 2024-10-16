import { Dispatch, SetStateAction } from 'react';

import { IIconsData } from './data.types';
import { IDataFilters, IDataObjectInfo, IFields, ILists, IMaps, IMarker } from './slice.types';

export interface IZoomTracker {
	setZoomLevel: Dispatch<SetStateAction<number>>;
}

export interface IRenderMarkers {
	isMobile: boolean;
	zoomLevel: number;
}

export interface IIconMarker {
	object: IDataObjectInfo;
	size: any
}

export interface IFlyToLocation {
	centerMapObject: [number, number];
	isInitialized: boolean;
	setIsInitialized: Dispatch<SetStateAction<boolean>>;
}

export interface ICanvasMarkersLayer {
	markersData: IDataObjectInfo[];
	isMobile: boolean;
}

export interface IButton {
	icon: IIconsData;
	newCenter?: (arr: number[]) => void;
	elem?: IMarker;
	isDisabled?: boolean;
}

export interface IButtonEditing {
	icon: IIconsData;
	isDisabled?: boolean;
}

export interface ILoading {
	height: string;
}

export interface IAllObjects {
	isDisplay?: boolean;
	isMobile?: boolean;
	data?:any
	initialLoad?:any
}

export interface IInput {
	placeholder: string;
	name: string;
	clearFilter: boolean;
}

export interface IBlockInput {
	title: string;
	id: number;
	clearFilter: boolean;
}

export interface ICustomSelect {
	isMultiChoice: boolean;
	title: string;
	isImage: boolean;
	dataSelect: IDataFilters;
	clearFilter: boolean;
}

export interface IBlockSettings {
	title: string;
}

export interface IInputSettings {
	formState: any;
	field: string;
	handleChange: any;
}

export interface ICheckboxSettings {
	formStateCheck: any;
	checkbox: string;
	handleChangeCheckbox: any;
}

export interface IOptionSetting {
	title: string;
	index: number;
	data: IFields | ILists | IMaps
	length: number;
}

export interface IButtonOptionSettings {
	isMouseEnter: boolean;
	text: string;
	title?: string;
	data?: IFields | ILists | IMaps
}

export interface ISelectData {
	valueSelect:string;
	setValueSelect: Dispatch<SetStateAction<string>>;
}

export interface IOptionBlock {
	option: {id: number, name: string, icon_name?: string, color?: string};
	index: number;
	listItems: any;
	handleChange: any;
	deleteOption: any;
	setListItems: any;
	viewColor: any; 
	setViewColor: Dispatch<SetStateAction<any>>
	viewIcon:any; 
	setViewIcon: Dispatch<SetStateAction<any>>
}

export interface IChoiceIcon {
	option: {id: number, name: string, icon_name?: string, color?: string};
	setListItems: any;
	// setIsViewIcon: Dispatch<SetStateAction<boolean>>;
	setViewIcon:Dispatch<SetStateAction<any>>
}