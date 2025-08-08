import { StyleSheet, Image, Pressable } from "react-native";
import { SpatialNavigationNode } from "react-tv-space-navigation";
import { useEffect } from "react";

const CharacterCard = ({ img, id, handleSelect }) => (
  <SpatialNavigationNode isFocusable>
    {({ isFocused }) => {
      useEffect(() => {
        if (isFocused) {
          handleSelect(id);
        }
      }, [isFocused]);

      return (
        <Pressable>
          <Image
            source={{ uri: img }}
            style={[styles.card, isFocused && styles.cardFocused]}
          />
        </Pressable>
      );
    }}
  </SpatialNavigationNode>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#444",
    borderRadius: 12,
    height: 250,
    width: 180,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  cardFocused: {
    borderColor: "red",
    transform: [{ scale: 1.04 }],
  },
});

export default CharacterCard;
