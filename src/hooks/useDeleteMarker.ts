import { editObjectService } from "@/services/editObject.servece"
import { actions as dataObjectInfoAction } from "@/store/data-object-info/dataObjectInfo.slice"
import { actions as dataObjectsInMapAction } from "@/store/data-objects-in-map/dataObjectsInMap.slice"
import { RootState } from "@/store/store"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"

export const useDeleteMarker = () => {
  const dispatch = useDispatch()
  const dataObjectInfo = useSelector((state:RootState)=> state.dataObjectInfo)
  const {query} = useRouter()

  const deleteMarker = async () => {
    await dispatch(dataObjectInfoAction.deleteCrd(''))

      if (typeof query.map === 'string') {
  
        console.log(dataObjectInfo.crd)
        const data = await editObjectService.saveFieldForAddObject(query.map, {...dataObjectInfo, crd: [null, null]})
        await dispatch(dataObjectsInMapAction.replacementNewObject(data))
      }
    }

  return {deleteMarker}
}