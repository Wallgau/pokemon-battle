import React, { ComponentType } from "react";
import { lazyLoad } from "./lazyLoad";

const componentMap: Record<
  string,
  () => Promise<{ default: ComponentType<any> }>
> = {
  PokemonSelector: () =>
    import("../components/pokemonselector/PokemonSelector"),
  PokemonBattle: () => import("../components/pokemonbattle/PokemonBattle"),
  PokemonBattleLog: () =>
    import("../components/pokemonbattlelog/PokemonBattleLog"),
};

export const loadComponent = (componentName: string) => {
  const importFunc = componentMap[componentName];
  if (!importFunc) {
    throw new Error(`Component ${componentName} not found in component map.`);
  }
  return lazyLoad(importFunc);
};
