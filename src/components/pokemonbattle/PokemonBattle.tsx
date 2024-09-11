import React from "react";
import { usePokemon } from "../../state/pokemonContext";
import "./pokemonbattle.css";

const BattleView: React.FC = () => {
  const { pokemonOne, pokemonTwo, startBattle, battleLog, isBattleOver } =
    usePokemon();

  if (!pokemonOne || !pokemonTwo) {
    return <div>Please select Pokemon to battle.</div>;
  }

  const pokemonList = [pokemonOne, pokemonTwo];

  return (
    <div className="selector-container">
      <div className="pokemon-list">
        {pokemonList?.map((pokemon) => (
          <ul key={pokemon.name}>
            <li>
              <h2>{pokemon.name}</h2>
            </li>
            <li>
              <img src={pokemon.sprite} alt={pokemon.name} />
            </li>
            <li>Move: {pokemon.move}</li>
            <li>Power: {pokemon.movePower}</li>
          </ul>
        ))}
      </div>
      {!battleLog && !isBattleOver && (
        <button onClick={startBattle} className="select-button">
          Start Battle
        </button>
      )}
    </div>
  );
};

export default React.memo(BattleView);
