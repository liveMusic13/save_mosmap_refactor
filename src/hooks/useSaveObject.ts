import { editObjectService } from "@/services/editObject.servece"
// import { actions as dataObjectInfoAction } from "@/store/data-object-info/dataObjectInfo.slice"
import { actions as dataObjectsInMapAction } from "@/store/data-objects-in-map/dataObjectsInMap.slice"
import { RootState } from "@/store/store"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"

export const useSaveObject = () => {
  const dispatch = useDispatch()
  const {query} = useRouter()
  const dataObjectInfo = useSelector((state:RootState)=> state.dataObjectInfo)
  const {editingObjects} = useSelector((state:RootState)=> state.viewSettings)

  const saveObject = async () => {
    if (typeof query.map === 'string') {
      // const data = await editObjectService.saveFieldForAddObject(query.map, {crd: dataObjectInfo.crd, id: dataObjectInfo.id, values: dataObjectInfo.values})
      if (editingObjects.isActiveEditButton) {
        const data = await editObjectService.saveFieldForAddObject(query.map, dataObjectInfo)
        await dispatch(dataObjectsInMapAction.deleteNewObject(''))
        // await dispatch(dataObjectInfoAction.addObjectInfo(data))
        await dispatch(dataObjectsInMapAction.replacementNewObject(data))
      } else {
        const data = await editObjectService.saveFieldForAddObject(query.map, dataObjectInfo)
        await dispatch(dataObjectsInMapAction.deleteNewObject(''))
        // await dispatch(dataObjectInfoAction.addObjectInfo(data))
        await dispatch(dataObjectsInMapAction.addNewObject(data))
      }
    }
  }

  const saveObjectMobile = async () => { //HELP: ДЛЯ ТОГО ЧТОБЫ В МОБИЛЬНОЙ ВЕРСИИ СРАБАТЫВАЛО СОХРАНЕНИЕ, Т.К. В ХЕДЕРЕ КОГДА ОТКЛЮЧАЕШЬ ТАРГЕТ, МЕНЯЕТСЯ НА НЕАКТИВНОЕ СОСТОЯНИЕ editingObjects.isActiveEditButton И СПУСТЯ СЕКУНДУ, КОГДА СРАБАТЫВАЕТ ЗАПРОС ПО ТАЙМАУТУ, ОТЫГРЫВАЕТ УСЛОВИЕ УДАЛЕНИЯ В saveObject. Поэтому сделана эта функция с 1 вариантом условия
    if (typeof query.map === 'string') {
      // const data = await editObjectService.saveFieldForAddObject(query.map, {crd: dataObjectInfo.crd, id: dataObjectInfo.id, values: dataObjectInfo.values})
        const data = await editObjectService.saveFieldForAddObject(query.map, dataObjectInfo)
        await dispatch(dataObjectsInMapAction.deleteNewObject(''))
        // await dispatch(dataObjectInfoAction.addObjectInfo(data))
        await dispatch(dataObjectsInMapAction.addNewObject(data))
    }
  }

  return {saveObject, saveObjectMobile}
}