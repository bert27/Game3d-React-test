import "./style.sass";
import { useEffect, useState } from "react";
export function ButtonsPanel({ changeDirHorizontal, positionX }) {
  const interval = 100;
  const [position, setposition] = useState(0);
  const [activeTempMore, setactiveTempMore] = useState(false);
  const [activeTempDis, setactiveTempDis] = useState(false);

  function stopPress() {
    setactiveTempMore(false);
    setactiveTempDis(false);
  }
  function starPress() {
    setactiveTempMore(true);
  }
  function starPressDis() {
    setactiveTempDis(true);
  }

  useEffect(() => {
    if (activeTempDis) {
      const timer = setInterval(() => {
        changeDirHorizontal(positionX + 1);
      }, interval);
      return () => {
        clearInterval(timer);
      };
    }
    if (activeTempMore) {
      const timer = setInterval(() => {
        changeDirHorizontal(positionX - 1);
      }, interval);
      return () => {
        clearInterval(timer);
      };
    }
  }, [position, activeTempDis, activeTempMore]);
  return (
    <div className="panelButtons">
      <button className="button" onMouseDown={starPress} onMouseUp={stopPress}>
        {"<"}
      </button>
      <button
        className="button"
        onMouseDown={starPressDis}
        onMouseUp={stopPress}
      >
        {">"}
      </button>
    </div>
  );
}
