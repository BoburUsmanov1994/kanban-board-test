import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainLayout from "../layouts/main-layout";
import NotFoundPage from "../pages/not-found-page";
import KanbanBoardPage from "../pages/kanban-board-page";

const Router = ({
                    ...rest
                }) => {
    return (
        <BrowserRouter {...rest}>
            <Routes>
                <Route path={"/"} element={<MainLayout/>}>
                        <Route path={""} index element={<KanbanBoardPage />} />
                        <Route path={"*"} element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;