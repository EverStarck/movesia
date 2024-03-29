import {
  ImageBackground,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";
import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import tw from "@/lib/tw";
import { genres, mins2hours } from "@/lib/utils";
import { MoviesContext } from "@/context/movies";
import { Icons } from "@/components/icons";

interface PosterProps extends Partial<ViewProps> {
  id: string;
}

export function Poster({ id, ...props }: PosterProps) {
  const router = useRouter();
  const { movies } = React.useContext(MoviesContext);
  const movie = movies[id];

  return (
    <View style={tw`flex-1`}>
      <StatusBar animated={true} barStyle="light-content" />
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
            <View
              style={tw.style(`flex-row justify-between items-center pl-8`, {
                paddingTop:
                  Platform.OS === "android" ? StatusBar.currentHeight : 0,
              })}
            >
              <TouchableOpacity
                style={tw.style(`p-1 rounded-full`, {
                  backgroundColor: "rgba(0,0,0,0.7)",
                })}
                onPress={() => {
                  router.back();
                }}
              >
                <Icons.back
                  size={24}
                  color={tw.color("foreground")}
                  // style={tw`p-1 rounded-full border-solid border border-muted`}
                />
              </TouchableOpacity>
            </View>
            {/* Info */}
            <View
              style={tw`flex-1 flex-column items-center justify-end mb-28 gap-4`}
            >
              <Text style={tw`text-foreground text-2xl font-bold text-center`}>
                {movie.title}
              </Text>

              <View style={tw`flex flex-row gap-1 items-center`}>
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
