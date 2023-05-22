import * as React from "react";

import { Datum, Recommend } from "@/types/recommend";

type MoviesContextProps = {
  movies: { [key: string]: Datum };
  setMovies: React.Dispatch<React.SetStateAction<{ [key: string]: Datum }>>;
  setRecomMovie: (data: Recommend["data"], id: string) => void;
  setMoviesWithoutUpdateRecom: (data: Recommend["data"]) => void;
};
export const MoviesContext = React.createContext({} as MoviesContextProps);

export function useMovies() {
  return React.useContext(MoviesContext);
}

export function MoviesProvider({ children }: { children: React.ReactNode }) {
  const [movies, setMovies] = React.useState<{ [key: string]: Datum }>({});

  function setRecomMovie(data: Recommend["data"], id: string) {
    const movieToUpdate = movies[id];
    const updatedMovie = {
      ...movieToUpdate,
      recommended: data[id].recommended,
    };

    // Avoid update if movie already has recommended property
    const final = structuredClone(movies);
    Object.keys(data).forEach((key) => {
      // append new movie
      if (!final[key]) {
        final[key] = data[key];
        return;
      }
    });
    final[id] = updatedMovie;

    setMovies(final);
  }

  function setMoviesWithoutUpdateRecom(data: Recommend["data"]) {
    const final = structuredClone(movies);

    // Avoid update if movie already has recommended property
    Object.keys(data).forEach((key) => {
      // append new movie
      if (!final[key]) {
        final[key] = data[key];
        return;
      }
    });

    setMovies(final);
  }
  return (
    <MoviesContext.Provider
      value={{
        movies,
        setMovies,
        setRecomMovie,
        setMoviesWithoutUpdateRecom,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}
