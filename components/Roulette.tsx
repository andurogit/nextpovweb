import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import styles from "../styles/DraggeableForm.module.css";

// Roulette 에 들어오는 타입은 WheelDataType 이 아니라 DraggeableForm 에서 전달되는 객체이다.

// 1. 인터페이스 사용
// interface Option {
//   text: string;
// }

// interface RouletteProps {
//   data: Option[];
// }

// 2. 이것도 FC 이니까 React.FC 로 시작하고 제너릭으로 <RoulettePrpos> 로 시작
// const Roulette: React.FC<RouletteProps> = ({ data }) => {
//  ...

function Roulette(props: { inputData: any }) {
  //   inputData.map((data) => (data.option = ""));
  const { inputData } = props;
  const [mustSpin, setMustSpin] = useState<boolean>(false);
  const [prizeNumber, setPrizeNumber] = useState<number>(0);
  // 03. use state 는 any 가 아니라 string 으로 선언, completeOption, option
  // state inputData 자체도 data.map 을 이용하여 선언 해야 한다. effect 와 마찬가지로
  const [rouletteData, setRouletteData] = useState<any>(inputData);
  // state 선언이 이런식이 된다.
  // const [rouletteData, setRouletteData] = useState<
  // {
  //   completeOption: string;
  //   option: string;
  // }[]
  // >(
  //   data.map((item) => ({
  //     completeOption: item.text,
  //     option:
  //       item.text.length >= 30
  //         ? item.text.substring(0, 30).trimEnd() + "..."
  //         : item.text,
  //   }))
  // );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const addShortString = inputData.map((item: { text: string }) => {
        return {
          completeOption: item.text,
          option:
            item.text.length >= 30
              ? item.text.substring(0, 30).trimEnd() + "..."
              : item.text,
        };
      });
      setRouletteData(addShortString);
    }
  }, [inputData]);

  function handleSpinClick() {
    const newPrizeNumber = Math.floor(Math.random() * inputData.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  }

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
        <button className="button roulette-button" onClick={handleSpinClick}>
          돌려🚀
        </button>
      </div>
    </>
  );
}

export default Roulette;
