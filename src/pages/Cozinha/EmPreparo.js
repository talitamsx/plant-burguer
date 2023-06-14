import styles from "./Cozinha.module.css";
import LogoMenor from "../../componentes/LogoMenor";
import Tag from "../../componentes/Tag";
import CaixaFundo from "../../componentes/CaixaFundo";
import { useEffect, useState } from "react";
import { obterPedidos } from "../../API/orders";
import Botao from "../../componentes/Botao";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { finalizados } from "../../API/orders";

const EmPreparo = () => {
  const [pedidos, setPedidos] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchData() {
      const response = await obterPedidos(token);
      const listaPedidos = await response.data
      setPedidos(listaPedidos.filter(pedido => pedido.status !== "finalizado"));
      console.log(listaPedidos);
    }
    fetchData();
  },[]);

  const navegar = useNavigate();
  const [erro, setErro] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

   function abrirModal() {
    setIsOpen(true); 
  }

  function fecharModal() {
    setIsOpen(false);
  }

  const finalizarPedido = async (orderId) => {
    // console.log(orderId);
    setErro("");    
    try {
      const response = await finalizados(token, orderId);
      const jsonData = await response.data
      localStorage.setItem("orderId", jsonData.id);
     setPedidos(prevStat => prevStat.filter(pedido => pedido.id !== orderId))
      if (jsonData.status === "finalizado") {        
        setErro("foi?.");
        abrirModal();
        navegar("/finalizados")
      } 
     
      else {
        setErro("Ocorreu um erro ao finalizar o pedido.");
        abrirModal();
      }
    } catch (error) {
      setErro("Algo inesperado aconteceu, tente novamente.");
      abrirModal();
    }
    
  };

  return (
    <section>
      <LogoMenor />
      <div className={styles.txtItens}>
        <Tag texto="EM PREPARO" />
        <Tag texto="PEDIDOS FINALIZADOS" />
      </div>
      {pedidos.map((pedido) => (
        <CaixaFundo>
          <div key={pedido.id}>
            <span className={styles.nomeCliente}>
            Cliente: {pedido.cliente ? pedido.cliente.toUpperCase() : ''}
            </span>
            <div className={styles.fundoBranco}>
              <div className={styles.qtdValor}>
                <span>ITEM</span>
                <span>QTD</span>
              </div>
              <div className={styles.pedidosCozinha}>
                <div>
                  {pedido.products && pedido.products.map((product) => (
                    <div className={styles.produtos} key={product.id}>
                      <span>{product.name}</span>
                      <span>{product.quantidade}</span>
                    </div>
                  ))}
                </div>
                <Botao onClick={() => finalizarPedido(pedido.id)}>PRONTO</Botao>
              </div>
            </div>
          </div>
        </CaixaFundo>
      ))}
      <Modal
        className="modal"
        overlayClassName="modal-fundo"
        isOpen={modalIsOpen}
        onRequestClose={fecharModal}
      >
        <div className="modal-conteudo">
          <p className="textoModal">{erro}</p>
          <button className="botao-ok" onClick={fecharModal}>
            OK
          </button>
        </div>
      </Modal>
      
    </section>
  );
};

export default EmPreparo;
