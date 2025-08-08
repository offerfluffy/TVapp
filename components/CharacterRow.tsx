import { SpatialNavigationScrollView } from "react-tv-space-navigation";
import { StyleSheet, Text, View, Image } from "react-native";
import { useQuery, gql } from "@apollo/client";
import CharacterCard from "./CharacterCard";

const GET_CHARACTERS = gql`
  query {
    characters(page: 1) {
      results {
        id
        name
        image
      }
    }
  }
`;

const CharactersRow = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const limited = data?.characters?.results?.slice(0, 10) ?? [];

  return (
    <SpatialNavigationScrollView
      horizontal
      offsetFromStart={20}
      contentContainerStyle={styles.row}
    >
      {limited.map(({ id, name, image }) => (
        <CharacterCard key={id} name={name} img={image} />
      ))}
    </SpatialNavigationScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
});

export default CharactersRow;
