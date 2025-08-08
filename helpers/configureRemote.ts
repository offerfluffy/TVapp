import { Platform, TVEventHandler } from "react-native";
import { SpatialNavigation, Directions } from "react-tv-space-navigation";

SpatialNavigation.configureRemoteControl({
  remoteControlSubscriber: (callback) => {
    if (!Platform.isTV) return null;

    const subscription = TVEventHandler.addListener((evt) => {
      const mapping = {
        right: Directions.RIGHT,
        left: Directions.LEFT,
        up: Directions.UP,
        down: Directions.DOWN,
        select: Directions.ENTER,
      };

      const dir = mapping[evt?.eventType];

      if (dir) {
        callback(dir);
      }
    });

    return { remove: () => subscription?.remove?.() };
  },

  remoteControlUnsubscriber: (handle) => {
    handle?.remove?.();
  },
});
