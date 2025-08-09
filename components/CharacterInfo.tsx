import { StyleSheet, View, Image } from "react-native";
import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  ReduceMotion,
} from "react-native-reanimated";

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
  const opacity = useSharedValue(0);

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    if (data?.character) {
      opacity.value = 0;

      opacity.value = withTiming(1, {
        duration: 500,
        easing: Easing.ease,
        reduceMotion: ReduceMotion.System,
      });
    }
  }, [data]);

  if (loading) {
    return (
      <View style={styles.center}>
        <Animated.Text style={styles.loadingText}>
          Loading character...
        </Animated.Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Animated.Text style={styles.loadingText}>
          Error: {error.message}
        </Animated.Text>
      </View>
    );
  }

  const { name, image, status, species, origin } = data.character;

  return (
    <View style={styles.container}>
      <View style={styles.detailsBlock}>
        <Animated.Text style={[styles.characterName, opacityStyle]}>
          {name}
        </Animated.Text>
        <Animated.View style={opacityStyle}>
          <View style={styles.metaGroup}>
            <Animated.Text style={styles.metaText}>
              Species: {species}
            </Animated.Text>
            <Animated.Text style={styles.metaText}>
              Status: {status}
            </Animated.Text>
            <Animated.Text style={styles.metaText}>
              Origin: {origin.name}
            </Animated.Text>
          </View>
        </Animated.View>
        <Animated.Text style={[styles.description, opacityStyle]}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat
          facilis expedita earum deserunt recusandae? Repellat porro
          perspiciatis fuga cum, vero cumque ab reiciendis doloremque at animi?
          Nemo animi voluptatum sapiente?
        </Animated.Text>
      </View>
      <Animated.Image
        source={{ uri: image }}
        style={styles.characterImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailsBlock: {
    flexDirection: "column",
    maxWidth: 800,
  },
  characterImage: {
    width: 400,
    height: 400,
    borderRadius: 12,
    backgroundColor: "#444",
  },
  characterName: {
    fontSize: 57,
    color: "white",
  },
  metaGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  metaText: {
    fontSize: 29,
    color: "white",
    marginRight: 20,
  },
  description: {
    fontSize: 29,
    color: "white",
    marginTop: 25,
  },
  loadingText: {
    padding: 20,
    fontSize: 18,
    color: "black",
    textAlign: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default CharacterInfo;
