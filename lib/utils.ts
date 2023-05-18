import { Genre } from "@/types/recommend";

function mins2hours(mins: number) {
  const time = new Date(mins * 60 * 1000)
    .toISOString()
    .substr(12, 4)
    .split(":");
  return `${time[0]}h ${time[1]}m`;
}

function genres(genreArr: Genre[]) {
  const allGenres = genreArr.map((genre) => genre.name);

  return `${allGenres[0] || ""}, ${allGenres[1] || ""}`;
}

export { mins2hours, genres };
