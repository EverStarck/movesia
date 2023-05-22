import { Recommend } from "@/types/recommend";

// export function MovieParser(state: RecommendData[]) {
//   return state.reduce(
//     (acc, cur) => {
//       if (cur.original.title in acc === false) {
//         acc[cur.original.title] = cur.original;
//       }

//       Object.keys(cur.recommended).forEach((rec) => {
//         if (rec in acc === false) {
//           acc[cur.recommended[rec].title] = cur.recommended[rec];
//         }
//       });

//       return acc;
//     },
//     {} as {
//       [key: string]: Original;
//     }
//   );
// }

export function getRecomMoviesArr(movies: Recommend["data"], id: number) {
  return movies[id].recommended.map((rec) => movies[rec]);
}
