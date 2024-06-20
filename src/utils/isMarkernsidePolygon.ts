import { IMarker } from "@/types/slice.types";

//TODO: Этот алгоритм работает, пропуская луч из точки и проверяя, сколько раз он пересекает границы полигона. Если число пересечений нечетное, точка находится внутри полигона. Если число пересечений четное, точка находится снаружи полигона.

// export function isMarkerInsidePolygon(marker: IMarker, polygon: number[][]) {
//   if (marker.crd === null) {
//     return false
//   }
//   let x = marker.crd[0], y = marker.crd[1];

//   let inside = false;
//   for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
//       let xi = polygon[i][0], yi = polygon[i][1];
//       let xj = polygon[j][0], yj = polygon[j][1];

//       let intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
//       if (intersect) inside = !inside;
//   }

//   console.log(inside)
//   return inside;
// };

export function isMarkerInsidePolygon(marker: IMarker, polygon: {id: number, latLngs:{lat: number, lng: number}[]}) {
  if (marker.crd === null || polygon === undefined) {
    return false
  }
  let x = marker.crd[0], y = marker.crd[1];
  console.log(polygon)
  // Преобразование формата полигона
  let polygonCoordinates = polygon.latLngs.map(point => [point.lat, point.lng]);

  let inside = false;
  for (let i = 0, j = polygonCoordinates.length - 1; i < polygonCoordinates.length; j = i++) {
      let xi = polygonCoordinates[i][0], yi = polygonCoordinates[i][1];
      let xj = polygonCoordinates[j][0], yj = polygonCoordinates[j][1];

      let intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
  }

  return inside;
};