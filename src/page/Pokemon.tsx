import { usePokemon } from "../state/pokemonContext";
import { loadComponent } from "../utils/lazyComponentLoader";
import "./pokemon.css";

const PokemonSelector = loadComponent("PokemonSelector");
const PokemonBattle = loadComponent("PokemonBattle");
const PokemonBattleLog = loadComponent("PokemonBattleLog");

const Pokemon = () => {
  const { isLoading } = usePokemon();
  return (
    <div className="pokemon-page">
      <h1 className="title">Pokémon Battle</h1>
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <>
          <PokemonBattle />
          <PokemonBattleLog />
        </>
      )}
      <PokemonSelector />
    </div>
  );
};
export default Pokemon;
