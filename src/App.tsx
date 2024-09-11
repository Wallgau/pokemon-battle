// src/App.tsx

import React from "react";
import { PokemonProvider } from "./state/pokemonContext";
import Pokemon from "./page/Pokemon";

const App: React.FC = () => {
  return (
    <PokemonProvider>
      <div className="App">
        <Pokemon />
      </div>
    </PokemonProvider>
  );
};

export default App;
