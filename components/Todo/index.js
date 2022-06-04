import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { deleteTodo, updateTodo } from "../../redux/actions/todoActions";
import { useDispatch, useSelector } from "react-redux";
import { faCheckCircle, faFlag, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Todo = ({ item, screen }) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [color, setColor] = useState("rgb(57, 120, 57)");
  const ref = useRef();

  useEffect(() => {
    if (item.status == "completed") {
      setColor("rgba(131, 205, 134,0.1)");
    }
    if (item.status == "important") {
      setColor("orange");
    }
  }, []);

  useEffect(() => {
    const handler = (event) => {
      if (open && ref.current && !ref.current.contains(event.target)) {
        setEdit(false)
      }
    }

    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [open])

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


        {edit && (
          <>
            <EditWrapper>
              <EditItem
                color="green"
                onClick={() => updateHandler("completed")}
              >
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  color="white"
                  size="1x"
                />
              </EditItem>
              <EditItem
                color="red"
                onClick={() => dispatch(deleteTodo(item._id))}
              >
                <FontAwesomeIcon
                  icon={faTrashCan}
                  color="white"
                  size="1x"
                />
              </EditItem>
              <EditItem
                color="orange"
                onClick={() => updateHandler("important")}
              >
                <FontAwesomeIcon
                  icon={faFlag}
                  color="white"
                  size="1x"
                />
              </EditItem>
            </EditWrapper>
          </>
        )}
        {item.todo}
      </TodoWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: 0.3;
`;
const zoom = keyframes`
  from {transform: scale(0.5, 0.5);}
  to { transform: scale(1, 1);}

`;

const EditWrapper = styled.div`
    padding:4px 0px;
    display: flex;
    animation: ${zoom} 0.3s forwards;
    border-radius:1.5rem;
    > *:not(:last-child) {
    margin-right: 16px;
  }

`;


const EditItem = styled.div`
&:hover{opacity:1}
opacity: 0.85;
  border-radius: 3rem;
  background-color: ${(props) => (props.color ? props.color : "#cc0000")};
  padding: 4px 12px;
  color: white;
  font-size: 20px;
  font-weight: 900;
  transition: 0.3s;
`;
const TodoWrapper = styled.div`
  border-radius: 0.8rem;
  background-color: ${(props) => (props.color ? props.color : "green")};
  padding: 3px 16px;
  color: white;
  font-size: 17px;
  margin: 6px 16px;
`;

export default Todo;
