import { SpatialNavigationRoot } from "react-tv-space-navigation";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { StyleSheet, View, ImageBackground } from "react-native";
import "./helpers/configureRemote";
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';

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
        <ImageBackground source={bg} style={styles.container}>
            <View style={styles.infoSection}>
              <CharacterInfo selectedChar={selectedChar} />
            </View>
            <View style={styles.rowSection}>
              <CharactersRow
                selectedChar={selectedChar}
                handleSelect={handleSelect}
              />
            </View>
        </ImageBackground>
      </SpatialNavigationRoot>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoSection: {
    flex: 3,
    justifyContent: "center",
    marginHorizontal: 250,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  rowSection: {
    flex: 1.1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
});
