import { SpatialNavigationVirtualizedList } from "react-tv-space-navigation";
import { StyleSheet, Text, View } from "react-native";
import { useQuery, gql } from "@apollo/client";
import CharacterCard from "./CharacterCard";
import { useEffect, useState, useRef } from "react";

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

const ITEM_WIDTH = 190;

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
    if (!characters.length || selectedChar == null) return;
    const idx = characters.findIndex((c) => c.id === selectedChar);
    if (idx >= 0) listRef.current?.focus(idx);
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
        <Text style={styles.statusText}>Loading characters...</Text>
      ) : error ? (
        <Text style={styles.statusText}>Error: {error.message}</Text>
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
            onEndReachedThresholdItemsNumber={8}
            scrollBehavior="stick-to-start"
            style={styles.row}
          />
          {loading && (
            <View style={styles.spinnerOverlay}>
              <Text style={styles.spinnerText}>Loading more characters...</Text>
            </View>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  statusText: {
    padding: 20,
    fontSize: 18,
    color: "black",
    textAlign: "center",
  },
  spinnerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.6)",
  },
  spinnerText: {
    fontSize: 18,
    color: "black",
  },
});

export default CharactersRow;
