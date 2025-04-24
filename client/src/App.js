import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./pages/login";
import Consumable from "./components/Consumablebar";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route index element={<Login/>} />
          <Route index path='/login' element={<Login/>}/>
          <Route index path='/consumablebar' element={<Consumable/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;