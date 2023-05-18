import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { API_URL } from "@env";
import { Stack, useRouter, useSearchParams } from "expo-router";

import { Recommend } from "@/types/recommend";
import tw from "@/lib/tw";
import { MoviesContext } from "@/context/movies";
import { Icons } from "@/components/icons";
import { Poster } from "@/components/poster";

const Movie = () => {
  const { id } = useSearchParams();
  const { movies, setMovies } = useContext(MoviesContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  console.log("🚀 ~ file: [id].tsx:21 ~ Movie ~ id:", id);

  async function fetchMovie() {
    // Check movie exists in context
    console.log("here", id, movies);
    try {
      const res = await fetch(`${API_URL}/recommend?movie=${id}`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
      console.log("🚀 ~ file: [name].tsx:31 ~ fetchMovie ~ res:", res);

      const data: Recommend = await res.json();
      console.log("🚀 ~ file: [id].tsx:41 ~ fetchMovie ~ data:", data);

      if (data.error) {
        setError(data.message);
        return;
      }

      setMovies({ ...movies, ...data.data });
      setLoading(false);
      setError("");
    } catch (error: any) {
      console.log("🚀 ~ file: [name].tsx:49 ~ fetchMovie ~ error:", error);
      setError(error.message);
    }
  }

  useEffect(() => {
    if (id === undefined) return;
    fetchMovie();
  }, [id]);

  if (!id || typeof id !== "string") return;

  if (error) {
    console.log("🚀 ~ file: [id].tsx:58 ~ Movie ~ error:", error);
    return (
      <View style={tw`flex-1 bg-background justify-center items-center`}>
        <Text style={tw`text-foreground`}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={tw.style(`flex-1`, {
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      })}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`flex-1 bg-background`}
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

        {console.log("🚀 ~ file: [id].tsx:92 ~ Movie ~ loading:", loading)}
        {console.log("🚀 ~ file: [id].tsx:98 ~ Movie ~ error:", error)}
        {!loading && error === "" && (
          <>
            <Poster id={id} />
            <Text style={tw`text-white`}>{id}</Text>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Movie;
