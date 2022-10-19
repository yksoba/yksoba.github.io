import { CssBaseline } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
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
      <Box width="100vw" height="100vh">
        <Box width="100%" height="100%" ref={container} />
        <Readout gameRef={game} />
      </Box>
    </>
  );
};

const Readout = ({ gameRef }: { gameRef: { current?: MyGame } }) => {
  const game = gameRef.current;
  const camera = game?.camera;

  const [_, setCounter] = useState(0);
  const refresh = () => setCounter((i) => +!i);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const cb = () => {
      refresh();
      timeout = setTimeout(cb, 100);
    };
    cb();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Box
      position="absolute"
      left={0}
      bottom={0}
      m={2}
      p={1}
      borderRadius={1}
      bgcolor="rgba(0,0,0,0.1)"
      color="rgba(255,255,255,0.8)"
      textAlign="right"
    >
      <table>
        <tbody>
          {camera && (
            <>
              <tr>
                <td>Camera pos: </td>
                <td>
                  <Box component="span" color="red">
                    {camera.position.x.toFixed(4)}
                  </Box>
                  ,
                </td>
                <td>
                  <Box component="span" color="green">
                    {camera.position.y.toFixed(4)}
                  </Box>
                  ,
                </td>
                <td>
                  <Box component="span" color="blue">
                    {camera.position.z.toFixed(4)}
                  </Box>
                </td>
              </tr>
              <tr>
                <td>Camera rot ({camera.rotation.order}): </td>
                <td>
                  <Box component="span" color="red">
                    {camera.rotation.x.toFixed(4)}
                  </Box>
                  ,
                </td>
                <td>
                  <Box component="span" color="green">
                    {camera.rotation.y.toFixed(4)}
                  </Box>
                  ,
                </td>
                <td>
                  <Box component="span" color="blue">
                    {camera.rotation.z.toFixed(4)}
                  </Box>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </Box>
  );
};

export default GameComponent;
