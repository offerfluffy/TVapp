import { SpatialNavigationRoot } from "react-tv-space-navigation";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./helpers/configureRemote";
import CharactersRow from "./components/CharacterRow";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <SpatialNavigationRoot>
        <CharactersRow />
      </SpatialNavigationRoot>
    </ApolloProvider>
  );
}
