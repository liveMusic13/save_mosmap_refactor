import dynamic from 'next/dynamic';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import BlockInput from '@/components/ui/block-input/BlockInput';
import CustomSelect from '@/components/ui/custom-select/CustomSelect';

import { IDataFilters } from '@/types/slice.types';

import { RootState } from '@/store/store';

import { useClearRequestData } from '@/hooks/useClearRequestData';
import { useGetFiltersObject } from '@/hooks/useGetFiltersObject';
import styles from './Filters.module.scss';

const DynamicInput = dynamic(
	() => import('../../ui/input/Input').then(mod => mod.default),
	{ ssr: false },
);

const Filters: FC = () => {
	const dataFilters: IDataFilters[] | any = useSelector(
		(state: RootState) => state.dataFilters,
	);
	const [clearFilter, setClearFilter] = useState<boolean>(false);
	const clearRequestData = useClearRequestData()
	const getFiltersObject = useGetFiltersObject()

	return (
		<div
			className={styles.block__filters}
		>
			<h2 className={styles.title}>Фильтры</h2>
			<div className={styles.wrapper_block__filters}>
				{(dataFilters.error || dataFilters === undefined|| dataFilters === null) ? [] : dataFilters.map((field: IDataFilters) => {
					if (field.type === 'number') {
						return (
							<BlockInput
								key={field.id}
								title={field.caption}
								id={field.id}
								clearFilter={clearFilter}
							/>
						);
					} else {
						return (
							<CustomSelect
								key={field.id}
								isMultiChoice={field.multiple === 1 ? true : false}
								title={field.caption}
								isImage={field.multiple === 1 ? true : false}
								dataSelect={field}
								clearFilter={clearFilter}
							/>
						);
					}
				})}
				<DynamicInput
					placeholder='От'
					name={`fix_bag_247`}
					clearFilter={clearFilter}
				/>
				<div className={styles.block__buttons}>
					<button
						className={styles.button_clear}
						onClick={() => {
							setClearFilter(true);
							const timeoutId = setTimeout(() => {
								setClearFilter(false);
								clearRequestData()
							}, 1000);

							return () => clearTimeout(timeoutId);
						}}
					>
						очистить
					</button>
					<button className={styles.button} onClick={getFiltersObject}>
						показать
					</button>
				</div>
			</div>
		</div>
	);
};

export default Filters;
