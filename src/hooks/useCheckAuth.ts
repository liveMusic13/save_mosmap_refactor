import { TOKEN } from "@/app.constants"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuth } from "./useAuth"

export const useCheckAuth = () => {
  const {isAuth, setIsAuth} = useAuth()
  const router = useRouter()

  useEffect(()=> {
    if (Cookies.get(TOKEN)) setIsAuth(true)
  }, [Cookies.get(TOKEN)])
}