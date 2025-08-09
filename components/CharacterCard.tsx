import { SpatialNavigationNode } from "react-tv-space-navigation";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  ReduceMotion,
} from "react-native-reanimated";

const CharacterCard = ({ img, id, handleSelect }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animateTo = (to: number) => {
    "worklet";
    scale.value = withTiming(to, {
      duration: 340,
      easing: Easing.ease,
      reduceMotion: ReduceMotion.System,
    });
  };

  return (
    <SpatialNavigationNode
      isFocusable
      onFocus={() => {
        handleSelect(id);
        animateTo(1.07);
      }}
      onBlur={() => animateTo(1)}
    >
      {() => (
        <Pressable>
          <Animated.Image
            source={{ uri: img }}
            style={[styles.card, animatedStyle]}
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
});

export default CharacterCard;
