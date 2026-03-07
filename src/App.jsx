import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Servicos from "./pages/Servicos";
import Adm from "./pages/Adm";
import Logout from "./pages/Logout";
import Agendamento from "./pages/Agendamento";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Página inicial */}
        <Route path="/" element={<Home />} />

        {/* Permite acessar também /home */}
        <Route path="/home" element={<Home />} />

        {/* Outras páginas */}
        <Route path="/login" element={<Login />} />

        <Route path="/servicos" element={<Servicos />} />

        <Route path="/agendamento" element={<Agendamento />} />

        <Route path="/adm" element={<Adm />} />

        <Route path="/logout" element={<Logout />} />

        {/* Qualquer rota inexistente volta para Home */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;