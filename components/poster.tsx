import { ImageBackground, Text, View, ViewProps } from "react-native";
import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";

import tw from "@/lib/tw";
import { genres, mins2hours } from "@/lib/utils";
import { MoviesContext } from "@/context/movies";
import { Icons } from "@/components/icons";

interface PosterProps extends Partial<ViewProps> {
  id: string;
}

export function Poster({ id, ...props }: PosterProps) {
  const { movies } = React.useContext(MoviesContext);
  console.log("🚀 ~ file: poster.tsx:16 ~ Poster ~ movies:", movies);
  const movie = movies[id];
  console.log("🚀 ~ file: poster.tsx:15 ~ Poster ~ movie:", movie);
  return (
    <View style={tw`h-7/12`}>
      <ImageBackground
        source={{ uri: movie.tmdb.data.full_path }}
        style={tw`w-screen h-full`}
        resizeMode="cover"
      >
        <View style={tw`flex-1`}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={["transparent", "#000"]}
            style={tw`w-full h-full`}
          >
            {/* Header */}
            <View style={tw`flex-row justify-between items-center p-4`}>
              <Link href="/home">
                <Icons.back
                  size={24}
                  color={tw.color("background")}
                  style={tw`p-1 rounded-full border-solid border border-muted`}
                />
              </Link>
            </View>
            {/* Info */}
            <View
              style={tw`flex-1 flex-column items-center justify-end mb-8 gap-4`}
            >
              <Text style={tw`text-foreground text-2xl font-bold`}>
                {movie.title}
              </Text>

              <View style={tw`flex flex-row gap-1`}>
                <Icons.star
                  size={16}
                  color={tw.color("myYellow")}
                  fill={tw.color("myYellow")}
                />
                <Text style={tw`text-foreground`}>
                  {movie.tmdb.data.vote_average.toFixed(2)}
                </Text>
              </View>

              <View style={tw`flex flex-row gap-2`}>
                <View style={tw`flex flex-row gap-1 items-center`}>
                  <Icons.calendar size={16} color={tw.color("foreground")} />
                  <Text style={tw`text-foreground `}>
                    {movie.tmdb.data.release_date.split("-")[0]} |
                  </Text>
                </View>
                <View style={tw`flex flex-row gap-1 items-center`}>
                  <Icons.clock size={16} color={tw.color("foreground")} />
                  <Text style={tw`text-foreground `}>
                    {mins2hours(movie.tmdb.data.runtime)} |
                  </Text>
                </View>
                <View style={tw`flex flex-row gap-1 items-center`}>
                  <Icons.camera size={16} color={tw.color("foreground")} />
                  <Text style={tw`text-foreground `}>
                    {genres(movie.tmdb.data.genres)}
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
      </ImageBackground>
    </View>
  );
}
