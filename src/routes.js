import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ClienteStore } from "./context/clienteContetx";
import Modal from 'react-modal';
import FormLogin from "./pages/Login";
import NovoPedido from "./pages/Atendimento";
import Cardapio from "./pages/Cardapio";
import EmPreparo from "./pages/Cozinha/EmPreparo";
import Finalizados from "./pages/Cozinha/Finalizados";

// Código necessário para os recursos de acessibilidade
Modal.setAppElement('#root');

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormLogin />}></Route>       
        <Route path="/atendimento" element={<ClienteStore> <NovoPedido /> </ClienteStore> }></Route>
        <Route path="/cardapio" element={<ClienteStore> <Cardapio /> </ClienteStore>}></Route>
        <Route path="/preparo" element={<ClienteStore> <EmPreparo /> </ClienteStore>}></Route>
        <Route path="/finalizados" element={<ClienteStore> <Finalizados /> </ClienteStore>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes