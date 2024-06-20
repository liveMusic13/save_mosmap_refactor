import { editObjectService } from "@/services/editObject.servece"
import { actions as dataObjectInfoAction } from "@/store/data-object-info/dataObjectInfo.slice"
import { actions as dataObjectsInMapAction } from "@/store/data-objects-in-map/dataObjectsInMap.slice"
import { RootState } from "@/store/store"
import { actions as viewSettingsAction } from "@/store/view-settings/viewSettings.slice"
import { useDispatch, useSelector } from "react-redux"

export const useDeleteObject = () => {
  const dispatch = useDispatch()
  const dataObjectInfo = useSelector((state:RootState)=> state.dataObjectInfo)

  const deleteObject = async () => {
    const data = await editObjectService.deleteObject(dataObjectInfo.id)

    if (data?.delete) {
      dispatch(viewSettingsAction.defaultObjectInfo(''));
      dispatch(dataObjectInfoAction.deleteObjectInfo(''))
      dispatch(dataObjectsInMapAction.deleteObjectById(data.id))
    }
  }

  return {deleteObject}
}