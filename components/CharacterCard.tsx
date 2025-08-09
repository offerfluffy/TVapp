import { SpatialNavigationNode } from "react-tv-space-navigation";
import { Pressable, Image, StyleSheet } from "react-native";

const CharacterCard = ({ img, id, handleSelect }) => {
  return (
    <SpatialNavigationNode isFocusable onFocus={() => handleSelect(id)}>
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
    height: 230,
    width: 410,
    borderColor: "transparent",
  },
  cardFocused: {
    shadowColor: 'rgb(66, 68, 90)',
    shadowOffset: { width: 14, height: 17 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    transform: [{ scale: 1.04 }],
  },
});

export default CharacterCard;
