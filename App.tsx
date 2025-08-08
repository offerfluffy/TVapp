import { SpatialNavigationRoot } from "react-tv-space-navigation";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./helpers/configureRemote";
import CharactersRow from "./components/CharacterRow";
import CharacterInfo from "./components/CharacterInfo";
import { useState } from "react";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  const [selectedChar , setSelectedChar] = useState(1);

  const handleSelect = (id) => {
    setSelectedChar(id)
  }

  return (
    <ApolloProvider client={client}>
      <SpatialNavigationRoot> 
        <CharacterInfo selectedChar={selectedChar} />
        <CharactersRow handleSelect={handleSelect}/>
      </SpatialNavigationRoot>
    </ApolloProvider>
  );
}
