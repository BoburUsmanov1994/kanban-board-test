import React, {useEffect, useState} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {v4 as uuid} from 'uuid';
import {useDeleteQuery, useGetAllQuery, usePutQuery} from "../hooks/api";
import {KEYS} from "../constants/keys";
import {URLS} from "../constants/urls";
import {get} from "lodash";
import styled from "styled-components";
import Button from "../components/button";
import Modal from "../components/modal";
import Form from "../components/form";
import {Trash2, Edit2} from "react-feather";
import Dropzone from "../components/dropzone";

const Styled = styled.div`
  .board {
    &__column {
    }

    &__item {
      position: relative;
      padding-right: 15px;
    }

    &__remove {
      position: absolute;
      top: 35px;
      right: 5px;
      cursor: pointer;
    }

    &__edit {
      position: absolute;
      top: 10px;
      right: 5px;
      cursor: pointer;
    }
  }
`;

const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const {source, destination} = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
        });
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        });
    }
};

const KanbanPage = ({...rest}) => {

    const {data, isLoading, isFetching, isError} = useGetAllQuery({key: KEYS.tasks, url: URLS.tasks});
    const {mutate: deleteRequest} = useDeleteQuery({listKeyId: KEYS.tasks})

    const [columns, setColumns] = useState({});
    const [show, setShow] = useState(false);
    const [id, setId] = useState(null);

    useEffect(() => {
        setColumns({
            [uuid()]: {
                name: "Requested",
                items: get(data, 'data', [])
            },
            [uuid()]: {
                name: "To do",
                items: []
            },
            [uuid()]: {
                name: "In Progress",
                items: []
            },
            [uuid()]: {
                name: "Done",
                items: []
            }
        })
    }, [data])

    console.log('columns', columns, data)

    const add = () => {
        setShow(true);
    }

    const remove = (id) => {
        deleteRequest({url: `${URLS.tasks}/${id}`})
    }

    const edit = (id) => {
        setId(id);
        setShow(true);
    }

    return (
        <Styled
            style={{display: "flex", justifyContent: "center", alignItems: "flex-start", height: "100%", padding: 30}}>
            <Button onClick={add}>Add task</Button>
            <DragDropContext
                onDragEnd={result => onDragEnd(result, columns, setColumns)}
            >
                {Object.entries(columns).map(([columnId, column], index) => {
                    return (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: 15
                            }}
                            key={columnId}
                        >
                            <h2>{column.name}</h2>
                            <div style={{margin: 8}}>
                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                className={'board__column'}
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    background: snapshot.isDraggingOver
                                                        ? "lightblue"
                                                        : "lightgrey",
                                                    padding: 10,
                                                    width: 250,
                                                    minHeight: 500
                                                }}
                                            >
                                                {column.items.map((item, index) => {
                                                    return (
                                                        <Draggable
                                                            key={item.id}
                                                            draggableId={item.id}
                                                            index={index}
                                                        >
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    <div
                                                                        className={'board__item'}
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={{
                                                                            userSelect: "none",
                                                                            padding: 16,
                                                                            margin: "0 0 8px 0",
                                                                            minHeight: "50px",
                                                                            backgroundColor: snapshot.isDragging
                                                                                ? "#263B4A"
                                                                                : "#456C86",
                                                                            color: "white",
                                                                            ...provided.draggableProps.style
                                                                        }}
                                                                    >
                                                                        <h3>  {item.title}</h3>
                                                                        <p>{item.description}</p>
                                                                        <Edit2 className={"board__edit"} size={18}
                                                                               onClick={() => edit(get(item, 'id'))}/>
                                                                        <Trash2 className={"board__remove"} size={18}
                                                                                onClick={() => remove(get(item, 'id'))}/>
                                                                                <Dropzone />

                                                                    </div>
                                                                );
                                                            }}
                                                        </Draggable>
                                                    );
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        );
                                    }}
                                </Droppable>
                            </div>
                        </div>
                    );
                })}
            </DragDropContext>
            {show && <Modal onClose={setShow}><Form setShow={setShow} id={id}/></Modal>}
        </Styled>
    );
}

export default KanbanPage;
