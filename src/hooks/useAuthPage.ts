import { authService } from "@/services/auth.service";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useAuth } from "./useAuth";

export const useAuthPage = () => {
  const { setIsAuth } = useAuth();
  const router = useRouter()
  const searchParams = new URLSearchParams(window.location.search);
  const dispatch = useDispatch()

  const auth = async (data:any) => {
    await authService.login(data.login, data.password, setIsAuth, searchParams, router, dispatch)
  }

  return auth
}