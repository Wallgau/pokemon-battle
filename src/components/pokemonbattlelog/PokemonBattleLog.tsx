import React from "react";
import { usePokemon } from "../../state/pokemonContext";
import "./pokemonbattlelog.css";

const BattleLog: React.FC = () => {
  const { battleLog } = usePokemon();

  return <div className="battle-log">{battleLog && <p>{battleLog}</p>}</div>;
};

export default React.memo(BattleLog);
