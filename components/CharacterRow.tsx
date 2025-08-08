import {
  SpatialNavigationScrollView,
  DefaultFocus,
} from "react-tv-space-navigation";
import { StyleSheet, Text } from "react-native";
import { useQuery, gql } from "@apollo/client";
import CharacterCard from "./CharacterCard";

const GET_CHARACTERS = gql`
  query GetCharacters {
    characters(page: 1) {
      results {
        id
        name
        image
      }
    }
  }
`;

const CharactersRow = ({ handleSelect }) => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  return (
    <SpatialNavigationScrollView
      horizontal={true}
      offsetFromStart={20}
      contentContainerStyle={styles.row}
    >
      {loading ? (
        <Text style={styles.statusText}>Loading characters...</Text>
      ) : error ? (
        <Text style={styles.statusText}>Error: {error.message}</Text>
      ) : (
        data?.characters?.results.map(({ id, image }) =>
          id === 1 ? (
            <DefaultFocus>
              <CharacterCard
                key={id}
                img={image}
                id={id}
                handleSelect={handleSelect}
              />
            </DefaultFocus>
          ) : (
            <CharacterCard
              key={id}
              img={image}
              id={id}
              handleSelect={handleSelect}
            />
          )
        )
      )}
    </SpatialNavigationScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  statusText: {
    padding: 20,
    fontSize: 18,
    color: "black",
    textAlign: "center",
  },
});

export default CharactersRow;
