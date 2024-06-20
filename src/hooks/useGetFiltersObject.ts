import { mapService } from "@/services/map.service";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import useWindowDimensions from "./useWindowDimensions";

export const useGetFiltersObject = () => {
  const { width } = useWindowDimensions();
  const adresFilterString = useSelector(
		(state: RootState) => state.adresFilterString,
	);
  const { map } = useSelector((state: RootState) => state.userMap);
  const dispatch = useDispatch();

  const filtersObject = () => {
    mapService.getFiltersObject(dispatch, width, adresFilterString, map)
  }

  return filtersObject
}