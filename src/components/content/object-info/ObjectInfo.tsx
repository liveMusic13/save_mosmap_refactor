import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loading } from '@/components/ui/loading/Loading';

import { IAllObjects } from '@/types/props.types';
import { IValues } from '@/types/slice.types';

import { actions as deleteObjectInfoAction } from '@/store/data-object-info/dataObjectInfo.slice';
import { RootState } from '@/store/store';
import { actions as viewSettingsAction } from '@/store/view-settings/viewSettings.slice';

import useWindowDimensions from '@/hooks/useWindowDimensions';

import styles from './ObjectInfo.module.scss';

const ObjectInfo: FC<IAllObjects> = ({ isDisplay }) => {
	const viewSettings = useSelector((state: RootState) => state.viewSettings);
	const dataObjectInfo = useSelector(
		(state: RootState) => state.dataObjectInfo,
	);
	const dispatch = useDispatch();
	const { width } = useWindowDimensions();

	return (
		<div
			className={styles.block__info}
		>
			<div className={styles.block__title}>
				<h2 className={styles.title}>Просмотр объекта</h2>
				<button
					className={styles.button__close}
					onClick={() => {
						dispatch(viewSettingsAction.defaultObjectInfo(''));
						if (width && width <= 767.98)
							dispatch(viewSettingsAction.toggleFilters(''));

						dispatch(deleteObjectInfoAction.deleteObjectInfo(''));
					}}
				>
					<span></span>
				</button>
			</div>
			<div className={styles.block__aboutObjects}>
				{viewSettings.isLoadingObject ? (
					<>
						<div className={styles.block__loader}>
							<Loading height='calc(67/1440 * 100vw)' />
						</div>
						<div className={styles.block__loader}>
							<Loading height='calc(67/1440 * 100vw)' />
						</div>
						<div className={styles.block__loader}>
							<Loading height='calc(67/1440 * 100vw)' />
						</div>
						<div className={styles.block__loader}>
							<Loading height='calc(67/1440 * 100vw)' />
						</div>
						<div className={styles.block__loader}>
							<Loading height='calc(67/1440 * 100vw)' />
						</div>
					</>
				) : (
					<>
						{dataObjectInfo?.values?.map((elem: IValues) => {
							return (
								<div
									key={Math.random() + Math.random()}
									className={styles.block__descriptionInfo}
								>
									<h2 className={styles.title__info}>{elem.label}</h2>
									<p className={styles.description__info}>{elem.value}</p>
								</div>
							);
						})}
					</>
				)}
			</div>
		</div>
	);
};

export default ObjectInfo;
