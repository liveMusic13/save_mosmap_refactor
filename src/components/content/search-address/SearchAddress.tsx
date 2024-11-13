import { ChangeEvent, FC, useEffect, useState } from 'react'

import { mapService } from '@/services/map.service'
import { actions as dataObjectsInMapAction } from '@/store/data-objects-in-map/dataObjectsInMap.slice'
import { actions as viewSettingsAction } from '@/store/view-settings/viewSettings.slice'
import { IDataSearchAddress } from '@/types/data.types'
import { useDispatch } from 'react-redux'
import styles from './SearchAddress.module.scss'

const SearchAddress: FC = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState<string>('')
  const [dataResponse, setDataResponse] = useState<IDataSearchAddress | any>({url: '', list: []})

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)

  const getData = async () => setDataResponse(await mapService.getHelpSearchAddress(dispatch, value))

  useEffect(()=> {
    if (value.length > 2) getData()
  }, [value])

  const extractCityAndStreet = (address: string): string => { // Разбиваем строку на части по запятой 
    const parts = address.split(', '); // Получаем первое слово и первые два слова после запятой 
    const city = parts[0]; const streetParts = parts[1].split(' ').slice(0, 2).join(' '); // Формируем и возвращаем новую строку 
    return `${city}, ${streetParts}`;
  }

  const onClick = async (e:any) => {
    const response = await mapService.getHelpSearchAddress(dispatch, e.target.innerText)
    setDataResponse(response)
    console.log('response.list[0].length: ', response.list.length)
  
    if (response.list.length === 1) {
      dispatch(dataObjectsInMapAction.addNewCenter(response.list[0].coords))
      dispatch(viewSettingsAction.toggleSearchAddress(''))
    } else if (response.list.length > 0) {
      setValue(extractCityAndStreet(response.list[0].name))
    }
  }

  return (
    <div className={styles.block__searchAddress}>
      <input type="text" className={styles.input} onChange={onChange} value={value} placeholder='Введите адрес дома' />
      {dataResponse.list.length > 0 && (
        <div className={styles.block__variables}>
          {
            dataResponse?.list.map((el:any) => (
              <p key={el.id} className={styles.variables} onClick={onClick}>{el.name}</p>
            ))
          }
        </div>
      )}
    </div>
  )
}

export default SearchAddress