import { editObjectService } from "@/services/editObject.servece"
import { actions as dataObjectInfoAction } from "@/store/data-object-info/dataObjectInfo.slice"
import { actions as dataObjectsInMapAction } from "@/store/data-objects-in-map/dataObjectsInMap.slice"
import { useDispatch } from "react-redux"

export const useAddObject = () => {
  const dispatch = useDispatch()
  
  const getField = async () => {
      const data = await editObjectService.getFieldForAddObject()
      dispatch(dataObjectInfoAction.addObjectInfo(data))
      dispatch(dataObjectsInMapAction.addNewObject(data))
      console.log('zdes', data)
  }
  
  return {getField}
}