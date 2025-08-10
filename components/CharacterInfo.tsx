import { StyleSheet, View, Image } from "react-native";
import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  ReduceMotion,
} from "react-native-reanimated";

import Spinner from "./UI/Spinner";

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

  const imageOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);

  const imageStyle = useAnimatedStyle(() => ({
    opacity: imageOpacity.value,
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  useEffect(() => {
    if (data?.character) {
      imageOpacity.value = 0;
      textOpacity.value = 0;

      imageOpacity.value = withTiming(1, {
        duration: 250,
        easing: Easing.ease,
        reduceMotion: ReduceMotion.System,
      });

      textOpacity.value = withDelay(
        100,
        withTiming(1, {
          duration: 350,
          easing: Easing.ease,
          reduceMotion: ReduceMotion.System,
        })
      );
    }
  }, [data?.character]);

  if (loading) {
    return <></>;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Spinner />
      </View>
    );
  }

  const { name, image, status, species, origin } = data.character;

  return (
    <View style={styles.container}>
      <View style={styles.detailsBlock}>
        <Animated.Text style={[styles.characterName, textStyle]}>
          {name}
        </Animated.Text>
        <Animated.View style={textStyle}>
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
        <Animated.Text style={[styles.description, textStyle]}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat
          facilis expedita earum deserunt recusandae? Repellat porro
          perspiciatis fuga cum, vero cumque ab reiciendis doloremque at animi?
          Nemo animi voluptatum sapiente?
        </Animated.Text>
      </View>

      <Animated.Image
        source={{ uri: image }}
        style={[styles.characterImage, imageStyle]}
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
  center: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default CharacterInfo;
