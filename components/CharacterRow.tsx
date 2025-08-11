import { useQuery, gql } from "@apollo/client";

import { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { SpatialNavigationVirtualizedList } from "react-tv-space-navigation";

import perfectSize from "../helpers/pixelPerfect";

import CharacterCard from "./CharacterCard";
import Spinner from "./UI/Spinner";
import Error from "./UI/Error";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      results {
        id
        name
        image
      }
    }
  }
`;

const ITEM_WIDTH = Platform.isTVOS ? 440 : 220;

const CharactersRow = ({ selectedChar, handleSelect }) => {
  const [page, setPage] = useState(1);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const listRef = useRef(null);
  const isFetchingMoreRef = useRef(false);

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page },
    onCompleted: () => setIsInitialLoading(false),
  });

  useEffect(() => {
    if (!data?.characters?.results) return;

    const newResults = data.characters.results.filter(
      (c) => !characters.some((p) => p.id === c.id)
    );

    if (newResults.length > 0) {
      setCharacters((prev) => [...prev, ...newResults]);
    } else {
      setHasMore(false);
    }

    isFetchingMoreRef.current = false;
  }, [data]);

  useEffect(() => {
    if (!characters.length) return;
    if (selectedChar == null) {
      listRef.current?.focus(0);
    } else {
      const idx = characters.findIndex((c) => c.id === selectedChar);
      if (idx >= 0) listRef.current?.focus(idx);
    }
  }, [characters.length, selectedChar]);

  const handleEndReached = () => {
    if (loading) return;
    if (!hasMore) return;
    if (isFetchingMoreRef.current) return;

    isFetchingMoreRef.current = true;
    setPage((p) => p + 1);
  };

  return (
    <>
      {isInitialLoading ? (
        <Spinner />
      ) : error ? (
        <Error />
      ) : (
        <View style={{ position: "relative" }}>
          <SpatialNavigationVirtualizedList
            ref={listRef}
            data={characters}
            renderItem={({ item }) => (
              <CharacterCard
                img={item.image}
                id={item.id}
                handleSelect={handleSelect}
              />
            )}
            itemSize={ITEM_WIDTH}
            orientation="horizontal"
            onEndReached={handleEndReached}
            onEndReachedThresholdItemsNumber={4}
            scrollBehavior="stick-to-start"
            style={styles.row}
          />
          {loading && <Spinner />}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: perfectSize(20),
    paddingVertical: perfectSize(30),
  },
});

export default CharactersRow;
