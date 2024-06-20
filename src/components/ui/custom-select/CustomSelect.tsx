import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { ICustomSelect } from '@/types/props.types';
import { ISelectedOption } from '@/types/select.types';
import { IDataFilters, IItemsFilter } from '@/types/slice.types';

import { actions as adresFilterStringAction } from '@/store/adres-filter-string/adresFilterString.slice';
import { RootState } from '@/store/store';

import { getNumbersFromString } from '@/utils/numbersFromString';
import { transformFieldForSelect } from '@/utils/transformFieldForSelect';

import styles from './CustomSelect.module.scss';

const CustomSelect: FC<ICustomSelect> = ({
	isMultiChoice,
	title,
	isImage,
	dataSelect,
	clearFilter,
}) => {
	const filtersData = useSelector((state: RootState) => state.dataFilters);
	const [selectedOption, setSelectedOption] = useState<any>(null);
	const optionsAgent = dataSelect.items
		? transformFieldForSelect(dataSelect.items)
		: [];
	const router = useRouter();
	const dispatch = useDispatch();
	const search = window.location.search;

	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);
		if (searchParams.get(dataSelect.name)) {
			const nameSelect = dataSelect.name; //HELP: ПОЛУЧАЕМ ИМЯ ФИЛЬТРА

			if (isMultiChoice) {
				const paramValue = searchParams.get(dataSelect.name);
				const arrayValue =
					paramValue !== null ? getNumbersFromString(paramValue) : [];

				const multiTargetSelect = filtersData //HELP: НАХОДИМ ТОТ СЕЛЕКТ И ТЕ ОПЦИИ КОТОРЫЕ ЕСТЬ В АДРЕСНОЙ СТРОКЕ
					.filter(
						(filterObj: IDataFilters) => filterObj.name === nameSelect,
					)[0];

				const matchingItems = multiTargetSelect.items.filter(
					(
						item: IItemsFilter, //HELP: СРАВНИВАЕМ С МАССИВОМ ЗНАЧЕНИЙ ИЗ СТРОКИ И ВОЗВРАЩАЕМ МАССИВ С ОБЪЕКТАМИ, КОТОРЫЕ СОВПАЛИ
					) => arrayValue.includes(item.item_id),
				);

				const transformedItems = transformFieldForSelect(matchingItems); //HELP: МЕНЯЕМ ПОЛЯ

				setSelectedOption(transformedItems);
			} else {
				const targetSelect = filtersData //HELP: НАХОДИМ ТОТ СЕЛЕКТ И ТЕ ОПЦИИ КОТОРЫЕ ЕСТЬ В АДРЕСНОЙ СТРОКЕ
					.filter((filterObj: IDataFilters) => filterObj.name === nameSelect)[0]
					.items.filter(
						(option: IItemsFilter) =>
							option.item_id === Number(searchParams.get(dataSelect.name)),
					);

				const newKeyInObj = transformFieldForSelect(targetSelect); //HELP: С ПОМОЩЬЮ ФУНКЦИИ МЕНЯЕМ НАЗВАНИЯ ПОЛЕЙ, ЧТОБЫ REACT-SELECT МОГ СЧИТЫВАТЬ ЗНАЧЕНИЯ.
				setSelectedOption(newKeyInObj); //HELP: ЗАПИСЫВАЕМ МАССИВ С ОДНИМ ОБЪЕКТОМ В ЗНАЧЕНИЯ СЕЛЕКТА
			}
		}
	}, []);

	const handleChange = (
		selectedOption: ISelectedOption | ISelectedOption[],
	) => {
		const searchParams = new URLSearchParams(window.location.search);
		setSelectedOption(selectedOption);

		if (Array.isArray(selectedOption)) {
			//HELP: ПРОВЕРКА НА МАССИВ, ЕСЛИ ДА, ЗНАЧИТ ЭТО МУЛЬТИСЕЛЕКТ
			let arrValue: any = [];

			selectedOption.forEach(option => {
				arrValue.push(option.value); //HELP: ЗАПИСЬ ВСЕХ ЗНАЧЕНИЙ МУЛЬТИСЛЕКТА В МАССИВ
			});

			if (arrValue.length > 0) {
				searchParams.set(dataSelect.name, arrValue.join(','));
			} else {
				searchParams.delete(dataSelect.name);
			} //HELP: ЗАПИСЬ ЗНАЧЕНИЙ В СТРОКУ

			router.replace('?' + searchParams.toString(), undefined, { shallow: true });
		} else {
			if (selectedOption && selectedOption.value) {
				searchParams.set(dataSelect.name, String(selectedOption.value));
			} else {
				searchParams.delete(dataSelect.name);
			}

			router.replace('?' + searchParams.toString(), undefined, { shallow: true });
		}
	};

	useEffect(() => {
		if (clearFilter) {
			setSelectedOption(null);
			dispatch(adresFilterStringAction.clearGetParams(''));
		}
	}, [clearFilter]);

	const customStyles = {
		option: (provided: any, state: any) => {
			if (isImage) {
				return {
					...provided,
					backgroundImage: state.isSelected
						? 'url("../images/icons/ok.svg")'
						: 'url("../images/icons/test.png")',
					backgroundRepeat: 'no-repeat',
					backgroundSize: '10%',
					backgroundPosition: 'center left',
					paddingLeft: '12%',
					backgroundColor: state.isSelected ? '#e0e0e0' : 'transparent',
					color: '#9e9e9e',
					'&:hover': {
						cursor: 'pointer',
					},
				};
			} else {
				return {
					'&:hover': {
						cursor: 'pointer',
					},
				};
			}
		},
		control: (provided: any, state: any) => ({
			...provided,
			maxHeight: 'calc(40 / 1440 * 100vw)',
			overflow: 'auto',
			border: state.isFocused ? '1px solid #26a69a' : 'none',
			boxShadow: state.isFocused ? '0px 0px 3px #26a69a' : 'none',
			borderBottom: state.isFocused ? '1px solid #26a69a' : '1px solid #121212',
			borderRadius: '0px',
			'&:hover': {
				borderColor: '#26a69a',
				boxShadow: '0px 0px 3px #26a69a',
				cursor: 'pointer',
			},
		}),
	};

	return (
		<div className={styles.block__select}>
			<h2 className={styles.title}>{title}</h2>
			<Select
				className={styles.custom_select}
				classNamePrefix='custom_select'
				placeholder=''
				isMulti={isMultiChoice}
				options={optionsAgent}
				closeMenuOnSelect={!isMultiChoice}
				hideSelectedOptions={false}
				value={selectedOption}
				onChange={handleChange}
				styles={customStyles}
			/>
		</div>
	);
};

export default CustomSelect;
