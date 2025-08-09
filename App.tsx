import { SpatialNavigationRoot } from "react-tv-space-navigation";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { StyleSheet, View } from "react-native";
import "./helpers/configureRemote";
import CharactersRow from "./components/CharacterRow";
import CharacterInfo from "./components/CharacterInfo";
import { useState } from "react";

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
        <View style={styles.container}>
          <View style={styles.infoSection}>
            <CharacterInfo selectedChar={selectedChar} />
          </View>
          <View style={styles.rowSection}>
            <CharactersRow
              selectedChar={selectedChar}
              handleSelect={handleSelect}
            />
          </View>
        </View>
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
    alignItems: "center",
    padding: 20,
  },
  rowSection: {
    flex: 1.3,
    justifyContent: "center",
  },
});
