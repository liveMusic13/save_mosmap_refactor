import dynamic from 'next/dynamic';
import { FC } from 'react';

import { IBlockInput } from '@/types/props.types';

import styles from './BlockInput.module.scss';

const DynamicInput = dynamic(
	() => import('../input/Input').then(mod => mod.default),
	{ ssr: false },
);

const BlockInput: FC<IBlockInput> = ({ title, id, clearFilter }) => {
	return (
		<div className={styles.block__inputs}>
			<h2 className={styles.title__inputs}>{title}</h2>
			<div className={styles.inputs}>
				<DynamicInput
					placeholder='От'
					name={`num_from[${id}]`}
					clearFilter={clearFilter}
				/>
				<DynamicInput
					placeholder='До'
					name={`num_to[${id}]`}
					clearFilter={clearFilter}
				/>
			</div>
		</div>
	);
};

export default BlockInput;
