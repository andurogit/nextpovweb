import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import styles from "../styles/DraggeableForm.module.css";

interface Option {
  text: string;
}

interface RouletteProps {
  data: Option[];
}

const Roulette: React.FC<RouletteProps> = ({ data }) => {
  const [mustSpin, setMustSpin] = useState<boolean>(false);
  const [prizeNumber, setPrizeNumber] = useState<number>(0);
  const [rouletteData, setRouletteData] = useState<
    {
      completeOption: string;
      option: string;
    }[]
  >(
    data.map((item) => ({
      completeOption: item.text,
      option:
        item.text.length >= 30
          ? item.text.substring(0, 30).trimEnd() + "..."
          : item.text,
    }))
  );

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  useEffect(() => {
    const addShortString = data.map((item) => ({
      completeOption: item.text,
      option:
        item.text.length >= 30
          ? item.text.substring(0, 30).trimEnd() + "..."
          : item.text,
    }));
    setRouletteData(addShortString);
  }, [data]);

  return (
    <>
      <div className={styles["roulette-container"]}>
        <Wheel
          mustStartSpinning={mustSpin}
          //   spinDuration={[0.2]}
          prizeNumber={prizeNumber}
          data={rouletteData}
          innerBorderColor={"#ccc"}
          outerBorderWidth={9}
          radiusLineColor={"tranparent"}
          radiusLineWidth={1}
          textColors={["#f5f5f5"]}
          textDistance={55}
          fontSize={10}
          backgroundColors={[
            "#3f297e",
            "#175fa9",
            "#169ed8",
            "#239b63",
            "#64b031",
            "#efe61f",
            "#f7a416",
            "#e6471d",
            "#dc0936",
            "#e5177b",
            "#be1180",
            "#871f7f",
          ]}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
        />
        <button
          className={styles["button roulette-button"]}
          onClick={handleSpinClick}
        >
          돌려🚀
        </button>
      </div>
      <br />
      <button
        className={styles["prize-message"]}
        onClick={handleSpinClick}
        disabled={mustSpin}
      >
        {!mustSpin ? rouletteData[prizeNumber].completeOption : "돌리는 중..."}
      </button>
    </>
  );
};

export default Roulette;
