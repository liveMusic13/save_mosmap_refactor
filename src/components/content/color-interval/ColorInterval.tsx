import { mapService } from '@/services/map.service';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loading } from '@/components/ui/loading/Loading';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import { RootState } from '@/store/store';
import { actions as viewSettingsAction } from '@/store/view-settings/viewSettings.slice';
import { useSearchParams } from 'next/navigation';
import styles from './ColorInterval.module.scss';
import Range from './range/Range';
import SelectInterval from './select-interval/SelectInterval';

const ColorInterval: FC = () => {
  const {query} = useRouter();
  const dispatch = useDispatch()
  const viewSettings = useSelector((state: RootState) => state.viewSettings);
  const [data, setData] = useState<any>({})
  const [targetEditObject, setTargetEditObject] = useState()
  const { width } = useWindowDimensions();
  const searchParams = useSearchParams();
  const isTable = width && width < 992;
  const isMobile = width && width < 768

  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // состояние для кнопки

  const getData = async () => setData(await mapService.color_interval(query, dispatch))

  useEffect(()=> {
    getData()
  }, [])

  useEffect(() => {
    // Получение значений из query параметров
    const sloiValue = query['Слой карты'];
    const modeValue = query['Способ раскраски'];
    const numFieldValue = query['Числовое поле'];
  
    console.log('query', 
      query['Слой карты']
    );

    // Проверка совпадения с id в соответствующих массивах
    const isSloiValid = data?.sloi_fields?.some((field: any) => field.id === Number(sloiValue));
    const isModeValid = data?.mode_list?.some((mode: any) => mode.id === Number(modeValue));
    const isNumFieldValid = data?.num_fields?.some((field: any) => field.id === Number(numFieldValue));
  
   

    // Установка состояния кнопки в зависимости от валидности всех параметров
    if (!isSloiValid || !isModeValid || !isNumFieldValid) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
    console.log('data',data)
    console.log('Query Validation:', { isSloiValid, isModeValid, isNumFieldValid });
  }, [query, data, searchParams.toString()]);
  

  let style: any = {};

  if (!viewSettings.isViewObjects && !viewSettings.isViewFilters && !viewSettings.isObjectInfo) {
    style.left = '0';
  } else if ((viewSettings.isObjectInfo || viewSettings.isViewFilters) && !viewSettings.isViewObjects) {
    // style.left = isTable ? 'calc(300/992*100vw)' : 'calc(300/1440*100vw)';
    style.left = 'calc(300/1440*100vw)';
  } else if (viewSettings.isViewObjects && !viewSettings.isObjectInfo && !viewSettings.isViewFilters) {
    style.left = isTable ? `calc(300/1440*100vw)` : 'calc(283/1440*100vw)';
    // style.left = 'calc(283/1440*100vw)';
  }

  // useEffect(()=> {
  //   console.log('проверяем данные для запроса: ', targetEditObject)
  // }, [targetEditObject])

  const saveIntervals = async () => {
    const obj:any = {
      values: targetEditObject,
      field_id: Number(query['Числовое поле']),
      sloi: Number(query['Слой карты']),
      type: Number(query['Способ раскраски'])
    }
  
    const dataSettingsInterval = await mapService.color_interval_save(query, dispatch, obj)
    
    setData(dataSettingsInterval)

    if (isMobile) {
      dispatch(viewSettingsAction.toggleSettingsMap(''));
			dispatch(viewSettingsAction.SetIsColorInterval(false))
    }

    await mapService.color_map(query, obj.sloi, obj.type, obj.field_id, dispatch)
  }

  const [isNumberField, setIsNumberField] = useState(true);
 
  useEffect(() => {
    const mode_list = searchParams.get('Способ раскраски');
    
    if (data && data.mode_list) {
      const convertValue = Number(mode_list) === 0
      setIsNumberField(!convertValue)
    }
  }, [searchParams.toString(), data])

  // const prepareDataSelect = (dataSelect: { id: number; name: string }[]) => {
  //   // Проверяем, есть ли уже элемент с "не установлено"
  //   const hasNullOption = dataSelect.some(option => option.id === null);
  //   if (!hasNullOption) {
  //     return [{ id: null, name: 'не установлено' }, ...dataSelect];
  //   }
  //   return dataSelect;
  // };
  

  return (
    <div className={styles.block__colorInterval} style={style}>
      <h2 className={styles.title}>Закрасить районы</h2>
      <div className={styles.block__options}>
        {
          (viewSettings.isLoading && (!data.sloi_fields || !data.mode_list || !data.num_fields)) ? <Loading height='calc(60/1440 * 100vw)' /> : (
            <>
              <SelectInterval title='Слой карты' dataSelect={data.sloi_fields ? data.sloi_fields : []} current_value={data.current_sloi ? data.current_sloi : null} />
              <SelectInterval title='Способ раскраски' dataSelect={data.mode_list ? data.mode_list : []} current_value={data.mode_list ? data.current_mode : null} />
              {
                 isNumberField && (
                  <>
                    <SelectInterval title='Числовое поле' dataSelect={data.num_fields ? data.num_fields : []} current_value={data.current_mode ? data.mode_list[0].id : null} />
                    {!isButtonDisabled && <Range data={data} setTargetEditObject={setTargetEditObject} />}
                  </>
                )
              }
              <button className={styles.button__confirm} onClick={saveIntervals} disabled={isButtonDisabled}>Применить</button>
            </>
          )
        }
         {/* {
          (viewSettings.isLoading && (!data.sloi_fields || !data.mode_list || !data.num_fields)) ? <Loading height='calc(60/1440 * 100vw)' /> : (
            <>
              <SelectInterval title='Слой карты' dataSelect={prepareDataSelect(data.sloi_fields || [])}  current_value={data.current_sloi || null} />
              <SelectInterval title='Способ раскраски' dataSelect={prepareDataSelect(data.mode_list || [])} current_value={data.current_mode || null} />
              {
                isNumberField && (
                  <>
                    <SelectInterval title='Числовое поле' dataSelect={prepareDataSelect(data.num_fields || [])} current_value={data.current_mode ? data.mode_list[0]?.id : null} />
                    <Range data={data} setTargetEditObject={setTargetEditObject} />
                  </>
                )
              }
              <button className={styles.button__confirm} onClick={saveIntervals}>Применить</button>
            </>
          )
        } */}
      </div>
    </div>
  )
}

export default ColorInterval