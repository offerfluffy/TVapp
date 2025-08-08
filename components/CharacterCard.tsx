import { StyleSheet, Text, View, Image } from "react-native";
import { SpatialNavigationNode } from "react-tv-space-navigation";

const CharactersCard = ({ name, img }) => (
  <SpatialNavigationNode isFocusable>
    {({ isFocused }) => (
      <View
        style={[styles.charactersCard, isFocused && styles.scrollItemFocused]}
      >
        <Image source={{ uri: img }} style={styles.image} />
        <Text style={styles.itemText}>{name}</Text>
      </View>
    )}
  </SpatialNavigationNode>
);

const styles = StyleSheet.create({
  charactersCard: {
    backgroundColor: "#444",
    borderRadius: 12,
    height: 250,
    width: 180,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  scrollItemFocused: {
    borderColor: "red",
    transform: [{ scale: 1.04 }],
  },
  itemText: {
    color: "white",
    fontSize: 18,
  },
  image: { height: 120, width: 180, borderRadius: 12, marginBottom: 8 },
});

export default CharactersCard;
