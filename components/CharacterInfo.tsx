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
      <View style={styles.nameDetailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.detailsContiner}>
          <Text style={styles.detail}>Species: {species} </Text>
          <Text style={styles.detail}>Status: {status} </Text>
          <Text style={styles.detail}>Origin: {origin.name} </Text>
        </View>
        <Text style={[styles.detail, {marginTop: 25}]}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat
          facilis expedita earum deserunt recusandae? Repellat porro
          perspiciatis fuga cum, vero cumque ab reiciendis doloremque at animi?
          Nemo animi voluptatum sapiente?
        </Text>
      </View>
      <Image source={{ uri: image }} style={styles.image} />
    </View>
  );
};

export default CharacterInfo;

const styles = StyleSheet.create({
  infoContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 400,
    height: 400,
    borderRadius: 12,
  },
  name: {
    fontSize: 57,
    color: "white",
  },
  nameDetailsContainer: {
    flexDirection: "column",
    maxWidth: 800
  },
  detail: {
    fontSize: 29,
    color: "white",
    marginTop: 20,
    marginRight: 20,
  },
  detailsContiner: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  statusText: {
    padding: 20,
    fontSize: 18,
    color: "black",
    textAlign: "center",
  },
});
