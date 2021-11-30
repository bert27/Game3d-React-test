import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, Suspense, useEffect } from "react";

import "./App.css";
import "./style.sass";

import { ButtonsPanel } from "./components/ButtonsPanel/ButtonsPanel";
import { PlayerBall } from "./components/Player/Player";
import { Positions } from "./components/Objects/Positions";

function Box(props) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => (mesh.current.rotation.x += 0.01));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

function App() {
  const material = useRef();
  const [puntuation, setpuntuation] = useState(0);
  const [positionX, setpositionX] = useState(-5);
  const [hiddenObjects, sethiddenObjects] = useState(Positions());
  function changeDirHorizontal(value) {
    setpositionX(value);
  }
  const LeftMove = useKeyPress("a");
  function useKeyPress(targetKey) {
    const [keyPressed, setKeyPressed] = useState(false);

    function downHandler({ key }) {
      if (key === targetKey) {
        setKeyPressed(true);
      }

      if (key === "ArrowLeft") {
        setpositionX(positionX - 1);
      }
      if (key === "ArrowRight") {
        setpositionX(positionX + 1);
      }
    }

    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    useEffect(() => {
      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);

      return () => {
        window.removeEventListener("keydown", downHandler);
        window.removeEventListener("keyup", upHandler);
      };
    }, [positionX]);
    return keyPressed;
  }
  useEffect(() => {
    hiddenObjects.forEach((element, index) => {
      if (
        positionX > element.position.x &&
        positionX < element.position.x + 2 &&
        element.visibility
      ) {
        element.visibility = false;
        sethiddenObjects([...hiddenObjects, element]);

        setpuntuation(puntuation + 100);
      } else {
      }
    });
  }, [positionX]);
  function Restart() {
    hiddenObjects.forEach((element) => {
      element.visibility = true;
      sethiddenObjects([...hiddenObjects, element]);
      setpuntuation(0);
      setpositionX(-3);
    });
  }
  return (
    <div className="App">
      <header className="App-header">
        <>
          Ejemplo 3D
          <div className="panelControls">
            <ButtonsPanel
              changeDirHorizontal={changeDirHorizontal}
              positionX={positionX}
            />

            <div className="button" onClick={Restart}>
              Reiniciar
            </div>
          </div>
          <div>Puntuación: {puntuation}</div>
          <Canvas shadows camera={{ position: [0, 10, 10], fov: 42 }}>
            <color attach="background" args={["#3C3A3A"]} />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
              {hiddenObjects?.map(
                (element, index) =>
                  element.visibility && (
                    <Box
                      position={[element.position.x, element.position.y, 0]}
                    />
                  )
              )}
              {PlayerBall(positionX, material)}
            </Suspense>
          </Canvas>
        </>
      </header>
    </div>
  );
}

export default App;
