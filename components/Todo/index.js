import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { deleteTodo, updateTodo } from "../../redux/actions/todoActions";
import { useDispatch, useSelector } from "react-redux";

const Todo = ({ item }) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [color, setColor] = useState("rgb(131, 205, 134)");
  const ref = useRef();

  useEffect(() => {
    if (item.status == "completed") {
      setColor("rgba(131, 205, 134,0.1)");
    }
    if (item.status == "important") {
      setColor("orange");
    }
  }, []);
  let offsetTop;
  if (ref.current) {
    offsetTop = ref.current.offsetTop;
  }

  const updateHandler = (status) => {
    if (status == "completed") {
      setColor("rgba(131, 205, 134,0.1)");
    }
    if (status == "important") {
      setColor("orange");
    }
    dispatch(updateTodo(item._id, status));
  };
  return (
    <Wrapper onClick={() => setEdit(!edit)} ref={ref}>
      <TodoWrapper color={color}>
        {item.todo}

        {edit && (
          <>
            <EditWrapper height={offsetTop}>
              <EditItem
                color="green"
                onClick={() => updateHandler("completed")}
              >
                Y
              </EditItem>
              <EditItem
                color="red"
                onClick={() => dispatch(deleteTodo(item._id))}
              >
                X
              </EditItem>
              <EditItem
                color="orange"
                onClick={() => updateHandler("important")}
              >
                X
              </EditItem>
            </EditWrapper>
          </>
        )}
      </TodoWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const zoom = keyframes`
  from {transform: scale(0.5, 0.5);}
  to {background-color: rgba(256,256,256,0.8); transform: scale(1, 1);}

`;

const EditWrapper = styled.div`
    padding:12px;
    display: flex;
    position: absolute;
    top: ${(props) => props.height};
    background-color: rgba(256,256,256,0.5);
    animation: ${zoom} 0.3s forwards;
    border-radius:1.5rem;
`;



const EditItem = styled.div`
  border-radius: 3rem;
  background-color: ${(props) => (props.color ? props.color : "#cc0000")};
  padding: 4px 14px;
  margin: 0 4px;
  color: white;
  font-size: 20px;
`;
const TodoWrapper = styled.div`
  border-radius: 2rem;
  background-color: ${(props) => (props.color ? props.color : "green")};
  padding: 4px 20px;
  color: white;
  font-size: 20px;
  margin: 8px 16px;
  width: auto;
`;

export default Todo;
