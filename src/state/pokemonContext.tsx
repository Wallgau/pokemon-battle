import React, { createContext, useContext, useState, ReactNode } from "react";
import { fetchRandomPokemon, Pokemon } from "../api/client";

interface PokemonContextProps {
  pokemonOne: Pokemon | null;
  pokemonTwo: Pokemon | null;
  isBattleOver: boolean;
  battleLog: string | null;
  isLoading: boolean;
  fetchRandomPokemons: () => void;
  startBattle: () => void;
}

const PokemonContext = createContext<PokemonContextProps | undefined>(
  undefined
);

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemon must be used within a PokemonProvider");
  }
  return context;
};

const getBattleResult = (pokemonOne: Pokemon, pokemonTwo: Pokemon): string => {
  if (pokemonOne.movePower > pokemonTwo.movePower) {
    return `${pokemonOne.name} lands a decisive blow with ${pokemonOne.move} knocking out ${pokemonTwo.name}!`;
  } else if (pokemonOne.movePower < pokemonTwo.movePower) {
    return `${pokemonTwo.name} lands a decisive blow with ${pokemonTwo.move} knocking out ${pokemonOne.name}!`;
  } else {
    return "Draw";
  }
};

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
  const [pokemonOne, setPokemonOne] = useState<Pokemon | null>(null);
  const [pokemonTwo, setPokemonTwo] = useState<Pokemon | null>(null);
  const [battleLog, setBattleLog] = useState<string | null>(null);
  const [isBattleOver, setBattleOver] = useState<boolean>(false);
  const [controller, setController] = useState<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchError = (error: any) => {
    if (error.name !== "AbortError") {
      console.error("Error fetching Pokémon data:", error);
    }
  };

  const fetchRandomPokemons = async () => {
    if (controller) {
      // Cancel previous fetch if still ongoing
      controller.abort();
    }
    const newController = new AbortController();
    setController(newController);

    try {
      setIsLoading(true);
      setBattleLog(null);
      const [firstPokemon, secondPokemon] = await Promise.all([
        fetchRandomPokemon(newController.signal),
        fetchRandomPokemon(newController.signal),
      ]);
      setPokemonOne(firstPokemon);
      setPokemonTwo(secondPokemon);
      setBattleOver(false);
    } catch (error) {
      handleFetchError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const startBattle = () => {
    if (!pokemonOne || !pokemonTwo) {
      return;
    }
    setBattleLog(getBattleResult(pokemonOne, pokemonTwo));
    setBattleOver(true);
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemonOne,
        pokemonTwo,
        battleLog,
        isBattleOver,
        isLoading,
        fetchRandomPokemons,
        startBattle,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
