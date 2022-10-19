import { CssBaseline } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef } from "react";
import { MyGame } from "../../lib/prototype/my-game";

const GameComponent = () => {
  const game = useRef<MyGame>();
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    game.current = new MyGame();
  }, []);

  useEffect(() => {
    if (game.current && container.current) {
      game.current.mount(container.current);
      return () => game.current?.unmount();
    }
  }, [game.current, container.current]);

  return (
    <>
      <CssBaseline />
      <Box width="100vw" height="100vh" ref={container} />
    </>
  );
};

export default GameComponent;
