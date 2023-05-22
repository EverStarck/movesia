import { FlatList, Text, View, ViewProps } from "react-native";
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

  return (
    <View
      style={tw.style("flex-1 flex-column px-8", {
        marginTop: -50,
      })}
    >
      <View style={tw`gap-2`}>
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

      <View style={tw`mt-8 gap-2`}>
        <Text style={tw`text-foreground text-xl font-semibold`}>
          Similar Movies
        </Text>
        <FlatList
          // This is getting all the state movies and not only the ones that are similar
          data={getRecomMoviesArr(movies, Number(id))}
          keyExtractor={(item) => String(item.movie_id)}
          renderItem={({ item }: { item: Datum }) => {
            if (item.movie_id === Number(id)) return null;

            return <Movie movie={item} />;
          }}
          contentContainerStyle={tw`flex gap-5`}
          horizontal
        />
      </View>
    </View>
  );
}
