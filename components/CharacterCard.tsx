import { SpatialNavigationNode } from "react-tv-space-navigation";
import { Pressable, Image, StyleSheet } from "react-native";

const CharacterCard = ({ img, id, handleSelect }) => {
  return (
    <SpatialNavigationNode
      isFocusable
      onFocus={() => handleSelect(id)}
    >
      {({ isFocused }) => (
        <Pressable>
          <Image
            source={{ uri: img }}
            style={[styles.card, isFocused && styles.cardFocused]}
          />
        </Pressable>
      )}
    </SpatialNavigationNode>
  );
};

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
