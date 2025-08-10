import { StyleSheet, Image, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useEffect } from "react";

const error = require("../../assets/gif/error.gif");

const Error = () => {
  const opacity = useSharedValue(0);

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
  }, []);

  return (
    <Animated.View style={[styles.errorOverlay, opacityStyle]}>
      <Image source={error} style={styles.error} />
    </Animated.View>
  );
};

export default Error;

const styles = StyleSheet.create({
  errorOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    width: 100,
    height: 100,
    padding: 10,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
});
