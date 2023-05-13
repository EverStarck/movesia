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
import { MovieParser } from "@/lib/movie";
import tw from "@/lib/tw";
import { MoviesContext } from "@/context/movies";
import { Icons } from "@/components/icons";

const Movie = () => {
  const { name } = useSearchParams();
  const { movies, setMovies } = useContext(MoviesContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  async function fetchMovie() {
    // Check movie exists in context
    console.log("here", name, movies);
    try {
      const res = await fetch(`${API_URL}/recommend?movie=${name}`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
      console.log("🚀 ~ file: [name].tsx:31 ~ fetchMovie ~ res:", res);

      const data: Recommend = await res.json();

      if (data.error) {
        setError(data.message);
      }

      setMovies([...movies, data.data]);
      console.log("🚀 ~ file: [name].tsx:34 ~ fetchMovie ~ data:", data);
      console.log(MovieParser([...movies, data.data]), "xd");
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <SafeAreaView
      style={tw.style(`flex-1`, {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      })}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`flex-1 bg-background px-8`}
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

        {error && (
          <View style={tw`flex-1 justify-center items-center`}>
            <Text style={tw`text-foreground`}>{error}</Text>
          </View>
        )}

        <View style={tw`flex-1 justify-center items-center`}>
          <Text style={tw`text-foreground`}>{name}</Text>
        </View>

        {/* <View style={tw`flex-1 pt-1`}>
          <Text style={tw`text-foreground`}>My Details for: {id}</Text>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Movie;
