import React from "react";
import { usePokemon } from "../../state/pokemonContext";
import "./pokemonselector.css";

const PokemonSelector: React.FC = () => {
  const { fetchRandomPokemons } = usePokemon();

  return (
    <div>
      <button onClick={fetchRandomPokemons} className="select-pokemon">
        Select Random Pokémon
      </button>
    </div>
  );
};

export default React.memo(PokemonSelector);
