import Botao from "../../componentes/Botao"
import CaixaFundo from "../../componentes/CaixaFundo"
import CampoTexto from "../../componentes/CampoTexto"
import Logo from "../../componentes/Logo"
import styles from "./Atendimento.module.css"
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ClienteContext } from "../../context/clienteContetx";

const NovoPedido = () => {
  const { addCliente } = useContext(ClienteContext);
  const navegar = useNavigate();

  const clicar = () => {
    navegar("/cardapio");
  }

    return (
        <section className={styles.login}>
          <Logo />
          <CaixaFundo>
          <CampoTexto 
            placeholder="NOME DO CLIENTE"
            aoAlterado={(valor) => addCliente(valor) }
          />
          <div className={styles.botao}>
          <Botao onClick={clicar}> NOVO PEDIDO </Botao>
          </div>
          </CaixaFundo>
        </section>    
    )
}

export default NovoPedido
