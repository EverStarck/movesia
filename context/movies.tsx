import React from "react";

// TODO: Fix types
type MoviesContextProps = {
  movies: [];
  setMovies: (movies: []) => void;
};
export const MoviesContext = React.createContext({} as MoviesContextProps);

export function useMovies() {
  return React.useContext(MoviesContext);
}

export function MoviesProvider({ children }: { children: React.ReactNode }) {
  const [movies, setMovies] = React.useState([]);

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
