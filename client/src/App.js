import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import ConsumablePage from "./pages/ConsumablePage";
import AddnewPopup from "./components/addnew-popup";
import OrganizationsPage from "./pages/OrganizationsPage";
import HumanPage from "./pages/HumanPage";
import HistoryPage from "./pages/HistoryPage";
import RegisterPage from "./pages/RegisterPage";
import Stuff from "./pages/stuff";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage/>} />
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/consumable' element={<ConsumablePage/>}/>
          <Route path='/organizations' element={<OrganizationsPage/>}/>
          <Route path='/popup' element={<AddnewPopup/>}/>
          <Route path='/human' element={<HumanPage/>}/>
          <Route path='/history' element={<HistoryPage/>}/>
          <Route path='/stuff' element={<Stuff/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;