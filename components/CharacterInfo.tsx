import { StyleSheet, Text, View, Image } from "react-native";
import { useQuery, gql } from "@apollo/client";

const GET_CHARACTER_BY_ID = gql`
  query GetCharacterByID($id: ID!) {
    character(id: $id) {
      name
      image
      status
      species
      origin {
        name
      }
    }
  }
`;

const CharacterInfo = ({ selectedChar }) => {
  const { loading, error, data } = useQuery(GET_CHARACTER_BY_ID, {
    variables: { id: selectedChar },
  });

  if (loading) {
    return <Text style={styles.statusText}>Loading character...</Text>;
  }

  if (error) {
    return <Text style={styles.statusText}>Error: {error.message}</Text>;
  }

  const { name, image, status, species, origin } = data.character;

  return (
    <View style={styles.infoContainer}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.detail}>{status}</Text>
      <Text style={styles.detail}>{species}</Text>
      <Text style={styles.detail}>Origin: {origin.name}</Text>
    </View>
  );
};

export default CharacterInfo;

const styles = StyleSheet.create({
  infoContainer: {
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  detail: {
    fontSize: 18,
    color: "black",
    marginTop: 4,
  },
  statusText: {
    padding: 20,
    fontSize: 18,
    color: "black",
    textAlign: "center",
  },
});
