import React from "react";

import { Datum } from "@/types/recommend";

// TODO: Fix types
type MoviesContextProps = {
  movies: { [key: string]: Datum };
  setMovies: React.Dispatch<React.SetStateAction<{ [key: string]: Datum }>>;
};
export const MoviesContext = React.createContext({} as MoviesContextProps);

export function useMovies() {
  return React.useContext(MoviesContext);
}

export function MoviesProvider({ children }: { children: React.ReactNode }) {
  const [movies, setMovies] = React.useState<{ [key: string]: Datum }>({});

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
