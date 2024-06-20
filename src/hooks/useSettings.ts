import { settingsService } from "@/services/settings.service"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"

export const useSettings = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const mapFunc = () => {
    if (router.query.map && typeof router.query.map === 'string') settingsService.maps(router.query.map, dispatch)
  }

  const listsFunc = () => {
    if (router.query.map && typeof router.query.map === 'string') settingsService.lists(router.query.map, dispatch)
  }

  const fieldsFunc = () => {
    if (router.query.map && typeof router.query.map === 'string') settingsService.fields(router.query.map, dispatch)
  }

  const getIconsFunc = () => {
    if (router.query.map && typeof router.query.map === 'string') settingsService.getIcons(router.query.map, dispatch)
  }

  return {
    mapFunc,
    listsFunc,
    fieldsFunc,
    getIconsFunc
  }
}