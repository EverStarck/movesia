import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View,
  ViewProps,
} from "react-native";
import * as React from "react";

import { Datum } from "@/types/recommend";
import { getRecomMoviesArr } from "@/lib/movie";
import tw from "@/lib/tw";
import { MoviesContext } from "@/context/movies";
import { Movie } from "@/components/movie";
import { MoreLessComponent } from "@/components/read-more";

interface InfoProps extends Partial<ViewProps> {
  id: string;
}

export function Info({ id, ...props }: InfoProps) {
  const { movies } = React.useContext(MoviesContext);
  const movie = movies[id];
  const [clippedText, setClippedText] = React.useState<string>("");

  const similarMovies = getRecomMoviesArr(movies, Number(id));

  return (
    <View
      style={tw.style("flex-1", {
        marginTop: -50,
      })}
    >
      <View style={tw`gap-2 px-8`}>
        <Text style={tw`text-foreground text-xl font-semibold`}>About</Text>

        {clippedText ? (
          <MoreLessComponent
            truncatedText={clippedText}
            fullText={movie.tmdb.data.overview}
          />
        ) : (
          <Text
            numberOfLines={3}
            ellipsizeMode={"tail"}
            style={tw`text-muted-foreground`}
            onTextLayout={(event) => {
              const { lines } = event.nativeEvent;
              let text = lines
                .splice(0, 3)
                .map((line) => line.text)
                .join("");
              setClippedText(text.substr(0, text.length - 9));
            }}
          >
            {movie.tmdb.data.overview}
          </Text>
        )}
      </View>

      <View style={tw`mt-8 px-8`}>
        <Image
          style={tw`w-full h-9`}
          source={require("@/assets/ad.png")}
          resizeMode="contain"
        />
      </View>

      <View style={tw`mt-8 gap-2 pl-8 pb-6`}>
        <Text style={tw`text-foreground text-xl font-semibold`}>
          Similar Movies
        </Text>
        {similarMovies.length === 0 ? (
          <View style={tw`h-full justify-center items-center`}>
            <ActivityIndicator size="large" color={tw.color(`bg-foreground`)} />
          </View>
        ) : (
          <FlatList
            data={similarMovies}
            keyExtractor={(item) => String(item.movie_id)}
            renderItem={({ item }: { item: Datum }) => {
              if (item.movie_id === Number(id)) return null;

              return <Movie movie={item} />;
            }}
            contentContainerStyle={tw`flex gap-5`}
            horizontal
          />
        )}
      </View>
    </View>
  );
}
