import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import ConsumablePage from "./pages/ConsumablePage";
import AddnewPopup from "./components/addnew-popup";
import OrganizationsPage from "./pages/OrganizationsPage";


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage/>} />
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/consumable' element={<ConsumablePage/>}/>
          <Route path='/organizations' element={<OrganizationsPage/>}/>
          <Route path='/popup' element={<AddnewPopup/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
