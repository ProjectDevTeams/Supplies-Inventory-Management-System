import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./pages/login";
import Consumable from "./pages/consumable";
import AddnewPopup from "./components/addnew-popup";


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route index element={<Login/>} />
          <Route index path='/login' element={<Login/>}/>
          <Route index path='/consumable' element={<Consumable/>}/>
          <Route index path='/popup' element={<AddnewPopup/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
