import { SpatialNavigationRoot } from "react-tv-space-navigation";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { StyleSheet, View, ImageBackground } from "react-native";
import "./helpers/configureRemote";
import { Inter_400Regular } from "@expo-google-fonts/inter/400Regular";
import { LinearGradient } from "expo-linear-gradient";
import Animated from 'react-native-reanimated';

import CharactersRow from "./components/CharacterRow";
import CharacterInfo from "./components/CharacterInfo";
import { useState } from "react";

const bg = require("./assets/images/background/bg.png");

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  const [selectedChar, setSelectedChar] = useState(1);

  const handleSelect = (id) => {
    setSelectedChar(id);
  };

  return (
    <ApolloProvider client={client}>
      <SpatialNavigationRoot>
        <LinearGradient
          colors={["#000000", "#002BA1", "#090979"]}
          locations={[0.4, 0.7, 0.9]}
          style={styles.container}
        >
          <Animated.View style={styles.infoSection}>
            <CharacterInfo selectedChar={selectedChar} />
          </Animated.View>
          <View style={styles.rowSection}>
            <CharactersRow
              selectedChar={selectedChar}
              handleSelect={handleSelect}
            />
          </View>
        </LinearGradient>
      </SpatialNavigationRoot>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    fontFamily: "Inter_400Regular"
  },
  infoSection: {
    flex: 3,
    justifyContent: "center",
    marginHorizontal: 250,
  },
  rowSection: {
    flex: 1.1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
});
