import React from "react";

import { RecommendData } from "@/types/recommend";

// TODO: Fix types
type MoviesContextProps = {
  movies: RecommendData[];
  setMovies: React.Dispatch<React.SetStateAction<RecommendData[]>>;
};
export const MoviesContext = React.createContext({} as MoviesContextProps);

export function useMovies() {
  return React.useContext(MoviesContext);
}

export function MoviesProvider({ children }: { children: React.ReactNode }) {
  const [movies, setMovies] = React.useState<RecommendData[]>([]);

  return (
    <MoviesContext.Provider
      value={{
        movies,
        setMovies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}
