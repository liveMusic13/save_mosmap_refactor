import { settingsService } from "@/services/settings.service"
import { actions as dataSettingsAction } from "@/store/data-settings/dataSettings.slice"
import { RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"

export const useDeleteList = () => {
  const dispatch = useDispatch()
  const {deleteId} = useSelector((state:RootState)=> state.popupEdit)

  const deleteListFunc = async () => {
    // const data = await settingsService.deleteList(deleteId) 
    const data = await settingsService.deleteField(deleteId) 


    if (data?.delete) {
      console.log('data.id', )
      dispatch(dataSettingsAction.removeFieldById({id: data.id}))
    }
  }

  return {deleteListFunc}
}