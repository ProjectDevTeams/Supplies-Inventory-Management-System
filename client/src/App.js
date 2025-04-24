import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./pages/login";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route index element={<Login/>} />
          <Route index path='/login' element={<Login/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;