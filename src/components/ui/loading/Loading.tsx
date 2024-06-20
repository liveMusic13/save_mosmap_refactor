import { FC } from 'react';

import { ILoading } from '@/types/props.types';

import styles from './Loading.module.scss';

export const Loading: FC<ILoading> = ({ height }) => {
	return (
		<div
			className={styles.loading}
			style={height ? { height: height } : {}}
		></div>
	);
};
