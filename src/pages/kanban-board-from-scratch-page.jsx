import React, {useCallback, useMemo, useState} from 'react';
import styled from "styled-components";
import Card from "../components/card";
import {useGetAllQuery} from "../hooks/api";
import {KEYS} from "../constants/keys";
import {URLS} from "../constants/urls";
import {get, isEqual} from "lodash";

const Styled = styled.div`
  display: flex;
  padding: 100px;
  justify-content: center;
  align-items: flex-start;
`;
const KanbanBoardFromScratchPage = ({
                                        ...rest
                                    }) => {
    const [currentBoard, setCurrentBoard] = useState({})
    const [currentCard, setCurrentCard] = useState({})

    const [boards, setBoards] = useState([
        {
            id: 1,
            title: "Todo",
            status: "new",
            items: [
                {
                    id: 1,
                    title: "Task1",
                    description: "Description1"
                },
                {
                    id: 2,
                    title: "Task2",
                    description: "Description2"
                },
                {
                    id: 3,
                    title: "Task3",
                    description: "Description3"
                }
            ]
        },
        {
            id: 2,
            title: "In progress",
            status: "in_progress",
            items: [
                {
                    id: 1,
                    title: "Task4",
                    description: "Description4"
                },
                {
                    id: 2,
                    title: "Task4",
                    description: "Description4"
                },
                {
                    id: 3,
                    title: "Task5",
                    description: "Description5"
                }
            ]
        },
        {
            id: 3,
            title: "Completed",
            status: "completed",
            items: [
                {
                    id: 1,
                    title: "Task6",
                    description: "Description6"
                },
                {
                    id: 2,
                    title: "Task7",
                    description: "Description7"
                },
                {
                    id: 3,
                    title: "Task8",
                    description: "Description8"
                }
            ]
        }
    ])

    const {data, isLoading, isFetching, isError} = useGetAllQuery({key: KEYS.tasks, url: URLS.tasks});

    // const boards = useMemo(() => [
    //     {id: 1, title: "Todo", status: "new"},
    //     {id: 2, title: "In progress", status: "in_progress"},
    //     {id: 3, title: "Completed", status: "completed"},
    // ], [])


    const dragStartHandler = useCallback((e, board, item) => {
        setCurrentCard(item);
    }, [])


    const dragEndHandler = useCallback((e) => {

    }, [])

    const dragOverHandler = useCallback((e) => {
        e.preventDefault()
    }, [])

    const dropHandler = (e, status, card) => {
        console.log('drop', card, status)
        e.preventDefault();
    }

    if (isError) {
        return "Something is wrong";
    }

    if (isLoading) {
        return "Loading...";
    }

    if (isFetching) {
        return "Fetching...";
    }


    return (
        <Styled {...rest}>
            {
                boards && boards.map(board => <Card
                    key={get(board, 'id')}
                    board={board}
                    title={get(board, "title")}
                    tasks={get(board, 'items', [])}
                    hasAddBtn={isEqual(get(board, 'status'), 'new')}
                    dragStartHandler={dragStartHandler}
                    dragEndHandler={dragEndHandler}
                    dragOverHandler={dragOverHandler}
                    dropHandler={dropHandler}
                    draggable={true}
                />)
            }

        </Styled>
    );
};

export default KanbanBoardFromScratchPage;