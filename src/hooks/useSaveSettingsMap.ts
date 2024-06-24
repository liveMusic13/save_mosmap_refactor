import { settingsService } from "@/services/settings.service"
import { RootState } from "@/store/store"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"

export const useSaveSettingsMap = () => {
  const dispatch = useDispatch()
  const { query } = useRouter()
  const { data } = useSelector((state:RootState) => state.dataMapSettings)

  const save = () => {
    if (typeof query.map === 'string')  settingsService.saveSettings(query.map, dispatch, data)
  }

  return save
}