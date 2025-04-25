import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
import Login from "./pages/login";
import Consumable from "./pages/consumable";

// import Consumable from "./components/Consumablebar";
=======
import LoginPage from "./pages/LoginPage";
import ConsumablePage from "./pages/ConsumablePage";
import OrganizationsPage from "./pages/OrganizationsPage";
import HumanPage from "./pages/HumanPage";
import HistoryPage from "./pages/HistoryPage";
import RegisterPage from "./pages/RegisterPage";
import StuffPage from "./pages/StuffPage";
>>>>>>> f659a2db1954d995cdfeb7a39283cc67c9136cec

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage/>} />
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/consumable' element={<ConsumablePage/>}/>
          <Route path='/organizations' element={<OrganizationsPage/>}/>
          <Route path='/human' element={<HumanPage/>}/>
          <Route path='/history' element={<HistoryPage/>}/>
          <Route path='/stuff' element={<StuffPage/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;