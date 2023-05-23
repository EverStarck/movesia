import { SafeAreaView, ScrollView, Text, View } from "react-native";
import * as React from "react";
import { API_URL } from "@env";
import { Stack, useSearchParams } from "expo-router";

import { Recommend } from "@/types/recommend";
import tw from "@/lib/tw";
import { MoviesContext } from "@/context/movies";
import { Icons } from "@/components/icons";
import { Info } from "@/components/info";
import { Poster } from "@/components/poster";

const Movie = () => {
  const { id } = useSearchParams();
  const { movies, setMoviesWithoutUpdateRecom, setRecomMovie } =
    React.useContext(MoviesContext);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>("");

  async function fetchMovie(onlyRecommended = false) {
    try {
      console.log(
        "FETCH",
        `${API_URL}/recommend?movie=${id}${
          onlyRecommended ? "&recommended" : ""
        }`
      );
      const res = await fetch(
        `${API_URL}/recommend?movie=${id}${
          onlyRecommended ? "&recommended" : ""
        }`,
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      const data: Recommend = await res.json();
      if (data.error) {
        setError(data.message);
        return;
      }

      if (onlyRecommended) {
        setRecomMovie(data.data, id as string);
      } else {
        setMoviesWithoutUpdateRecom(data.data);
      }
      setLoading(false);
      setError("");
    } catch (error: any) {
      setError(error.message);
    }
  }

  React.useEffect(() => {
    if (id === undefined) return;

    // Movie exists in context
    if (movies[id as string] && movies[id as string].recommended.length > 0) {
      setLoading(false);
      setError("");
      return;
    }

    // Fetch only recommended movies
    if (movies[id as string] && movies[id as string].recommended.length === 0) {
      fetchMovie(true);
      return;
    }

    fetchMovie();
  }, [id]);

  if (!id || typeof id !== "string") return;

  if (error) {
    return (
      <View style={tw`flex-1 bg-background justify-center items-center`}>
        <Text style={tw`text-foreground`}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-background`}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`flex-1`}
      >
        <Stack.Screen options={{ headerShown: false }} />

        {loading && (
          <View style={tw`flex-1 justify-center items-center`}>
            <Icons.spinner
              style={tw`h-16 w-16 animate-spin`}
              color={tw.color(`bg-foreground`)}
            />
          </View>
        )}

        {!loading && error === "" && (
          <>
            {/* check movie is found in tmdb*/}
            <Poster id={id} />
            <Info id={id} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Movie;
