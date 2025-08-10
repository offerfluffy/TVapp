import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SpatialNavigationRoot } from "react-tv-space-navigation";

import { Inter_400Regular } from "@expo-google-fonts/inter/400Regular";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

import CharactersRow from "./components/CharacterRow";
import CharacterInfo from "./components/CharacterInfo";

import "./helpers/configureRemote";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  const [selectedChar, setSelectedChar] = useState(null);

  const handleSelect = (id) => {
    setSelectedChar(id);
  };

  return (
    <ApolloProvider client={client}>
      <SpatialNavigationRoot>
        <LinearGradient
          colors={[
            "rgba(0,0,0,0.9)", 
            "rgba(0,43,161,0.85)", 
            "rgba(9,9,121,0.9)", 
            "rgba(0,0,0,1)",
          ]}
          locations={[0, 0.4, 0.8, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.container}
        >
          <View style={styles.infoSection}>
            <CharacterInfo selectedChar={selectedChar} />
          </View>
          <BlurView intensity={20} style={styles.rowSection}>
            <CharactersRow
              selectedChar={selectedChar}
              handleSelect={handleSelect}
            />
          </BlurView>
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
    fontFamily: "Inter_400Regular",
  },
  infoSection: {
    flex: 3,
    justifyContent: "center",
    marginHorizontal: 250,
  },
  rowSection: {
    flex: 1.1,
    justifyContent: "center",
  },
});
