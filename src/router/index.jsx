import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainLayout from "../layouts/main-layout";
import KanbanBoardFromScratchPage from "../pages/kanban-board-from-scratch-page";
import NotFoundPage from "../pages/not-found-page";
import KanbanBoardWithLibraryPage from "../pages/kanban-board-with-library-page";

const Router = ({
                    ...rest
                }) => {
    return (
        <BrowserRouter {...rest}>
            <Routes>
                <Route path={"/"} element={<MainLayout/>}>
                        <Route path={""} index element={<KanbanBoardFromScratchPage />} />
                        <Route path={"library"} element={<KanbanBoardWithLibraryPage />} />
                        <Route path={"*"} element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;