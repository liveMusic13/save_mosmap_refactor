import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'

import { mapService } from '@/services/map.service'
import { actions as dataObjectsInMapAction } from '@/store/data-objects-in-map/dataObjectsInMap.slice'
import { actions as viewSettingsAction } from '@/store/view-settings/viewSettings.slice'
import { IDataSearchAddress } from '@/types/data.types'
import { useDispatch } from 'react-redux'
import styles from './SearchAddress.module.scss'

const SearchAddress: FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('');
  const [dataResponse, setDataResponse] = useState<IDataSearchAddress | any>({
    url: '',
    list: [],
  });
  const inputRef = useRef<HTMLInputElement>(null);

  // Обработчик изменения инпута
  const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  // Функция для отправки запроса при вводе в инпут
  const getData = async () => {
    const response = await mapService.getHelpSearchAddress(dispatch, value);
    setDataResponse(response);
  };

  useEffect(() => {
    if (value.length > 2) {
      getData();
    } else {
      setDataResponse({ url: '', list: [] }); // Очищаем список, если введено менее 3 символов
    }
  }, [value]);

  useEffect(() => { 
    if (inputRef.current) { 
      setTimeout(() => { 
        inputRef.current?.focus(); // Устанавливаем фокус в инпут 
      }, 0); 
    } 
  }, [dataResponse]);

  // Обработчик нажатия на элемент списка
  const onClick = async (e: any) => {
    const selectedValue = e.target.innerText;

    // Устанавливаем значение выбранного элемента в инпут и добавляем пробел 
    setValue((prevValue) => `${selectedValue} `)

    // Отправляем запрос с выбранным значением
    const response = await mapService.getHelpSearchAddress(dispatch, selectedValue);
    setDataResponse(response);

    const filterValue =  response.list.filter((el:any) => el.name === selectedValue) 
    console.log(response)
    
    if (filterValue.length > 0 && selectedValue === filterValue[0].name && filterValue[0].coords) {
      dispatch(dataObjectsInMapAction.addNewCenter(response.list[0].coords));
      dispatch(viewSettingsAction.toggleSearchAddress(''));
    }
  };

  return (
    <div className={styles.block__searchAddress}>
      <input
        ref={inputRef}
        type="text"
        className={styles.input}
        onChange={onChange}
        value={value}
        placeholder="Введите адрес дома"
      />
      {dataResponse.list.length > 0 && (
        <div className={styles.block__variables}>
          {dataResponse.list.map((el: any) => (
            <p key={el.id} className={styles.variables} onClick={onClick}>
              {el.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};


export default SearchAddress