import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskPage from "./TaskPage";
import AddUserPage from "./AddUserPage";
import AddActivityPage from "./AddActivityPage";
import EditTaskPage from "./EditTaskPage"

export default function App() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<TaskPage/>}/>
                <Route path="/adicionarUser" element={<AddUserPage/>}/>
                <Route path="/adicionarTarefa" element={<AddActivityPage/>}/>
                <Route path="/edit-task/:id" element={<EditTaskPage />} />
            </Routes>
        </Router>
    )
}