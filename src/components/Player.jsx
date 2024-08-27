import { useState } from "react";
import { useRef } from "react";

export default function Player() {
  const [playerName, setPlayerName] = useState();
  const playerNameRef = useRef();
  const handleClick = () => {
    setPlayerName(playerNameRef.current.value);
    playerNameRef.current.value = "";
  };

  return (
    <section id="player">
      <h2>Welcome {playerName ?? "unknown entity"}</h2>
      <p>
        <input ref={playerNameRef} type="text" />
        <button onClick={() => handleClick()}>Set Name</button>
      </p>
    </section>
  );
}
