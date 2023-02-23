import { GetServerSideProps } from "next";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BiTrash, BiGridVertical, BiPlus } from "react-icons/bi";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DragUpdate,
  resetServerContext,
} from "react-beautiful-dnd";
import Roulette from "./Roulette";
import styles from "../styles/DraggeableForm.module.css";

// interface InputItem {
//   id: string;
//   text: string;
// }

// 숙제 검사 받는 느낌
// 1. 인자로 data 는 불필요.
const FormularioTexto: React.FC = (data) => {
  // | undefined;

  //2. useState 제너릭으로는 InputItem 인터페이스 선언해서 사용.
  const [inputList, setInputList] = useState<{ id: string; text: string }[]>([
    // useState<InputItem[]>
    {
      id: uuidv4(),
      text: "Menu1",
    },
    {
      id: uuidv4(),
      text: "Menu2",
    },
    {
      id: uuidv4(),
      text: "Menu3",
    },
    {
      id: uuidv4(),
      text: "Menu4",
    },
  ]);

  // handle input change
  // 3. e 파라미터는 target 프로퍼티에 지정하는게 아니라 ChangeEvent<HTMLInputElement> 로 사용.
  const handleInputChange = (
    e: { target: { name: string; value: string } }, // 3-1. e: React.ChangeEvent<HTMLInputElement>
    index: number
  ) => {
    // 4. state 갱신은 짧게 가능. 일단 name 과 value 는 구조 분해 할당으로 사용 한다.
    // const { name, value } = e.target
    // const list = [...inputList] 리스트는 스프레드를 이용한다.
    // list[index][name] = value; 이전에 오류났던 부분이 오류가 없어졌다. index는 number 오류였던거 같다.
    // 그럼 지정하는 것도 문제 없다.
    let lists = [...inputList];

    let item = {
      ...inputList[index],
      [e.target.name]: e.target.value,
    };

    lists[index] = item;

    setInputList(lists);

    // const { name, value } = event.target;
    // const list = [...inputList];
    // list[index][name];

    // setInputList(list);
  };

  // handle click event of delete button
  // 5. 이거는 정답이네?
  function handleRemoveClick(index: number) {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  }

  // handle click event of Add button
  // 6. add 도 정답
  function handleAddClick() {
    setInputList([...inputList, { text: "", id: uuidv4() }]);
  }

  // 7. 이거도 정답.
  function handleOnDragEnd(result: DragUpdate) {
    if (!result.destination) return;

    const items = Array.from(inputList);
    const [reorderdItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderdItem);

    setInputList(items);
  }

  return (
    <div className={styles["main-form"]}>
      <div className={styles["text-title"]}>
        <h2>Rolling Rolling Roulette</h2>
      </div>
      {/* <Roulette inputData={inputList} /> */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="items">
          {(provided) => (
            <ul
              // className="items"
              className="items"
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ listStyle: "none" }}
            >
              {inputList.map((x, index) => {
                return (
                  <Draggable key={x.id} draggableId={x.id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={styles["list-item"]}
                      >
                        <div className={styles.item}>
                          <BiGridVertical />
                          <input
                            name="text"
                            placeholder="항목을 입력하세요 ( 입력하지 않음 )"
                            value={x.text}
                            onChange={(e) => handleInputChange(e, index)}
                            className={styles["input"]}
                          />
                          <div className={styles["btn-box"]}>
                            {inputList.length !== 1 && (
                              <button
                                className={styles["button"]}
                                onClick={() => handleRemoveClick(index)}
                              >
                                <BiTrash />
                              </button>
                            )}
                          </div>
                        </div>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <button
        onClick={handleAddClick}
        style={{ marginLeft: "2.1rem" }}
        className={styles["button"]}
      >
        <BiPlus />
      </button>
    </div>
  );
};

export default FormularioTexto;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  resetServerContext(); // <-- CALL RESET SERVER CONTEXT, SERVER SIDE

  return { props: { data: [] } };
};
