import { Stack } from "expo-router";

import { MoviesProvider } from "@/context/movies";

const Layout = () => {
  return (
    <MoviesProvider>
      <Stack>
        <Stack.Screen name="home" options={{ headerShown: false }} />
      </Stack>
    </MoviesProvider>
  );
};

export default Layout;
