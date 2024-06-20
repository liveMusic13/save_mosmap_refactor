import { mapService } from "@/services/map.service";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export const useClearRequestData = () => {
  const {query} = useRouter()
  const dispatch = useDispatch();

  const clearRequest = () => {
    mapService.clearRequestData(dispatch, query)
  }

  return clearRequest
}