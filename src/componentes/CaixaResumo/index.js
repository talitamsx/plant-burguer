import React, { useContext } from "react";
import styles from "./CaixaResumo.module.css";
import { ClienteContext } from "../../context/clienteContetx";
import Botao from "../Botao";
import { useNavigate } from "react-router-dom";
import { pedidos } from "../../API/orders";
// import { getItem, setItem } from "../../storage/localStorage";

const CaixaResumo = ({ itemSelecionado, setItemSelecionado }) => {
  const { cliente } = useContext(ClienteContext);

  const navegar = useNavigate();

  const navegarParaCozinha = () => {
    navegar("/preparo");
  }

  const removerItem = (item) => {
    const itemResumo = itemSelecionado.find((i) => i.id === item.id);
    if (itemResumo) {
      if (itemResumo.quantidade > 1) {
        itemResumo.quantidade--;
        setItemSelecionado([...itemSelecionado]);
      } else {
        setItemSelecionado(itemSelecionado.filter((i) => i.id !== item.id));
      }
    }
  };

  const calcularTotal = () => {
    let total = 0;
    itemSelecionado.forEach((item) => {
      total += item.price * item.quantidade;
    });
    return total;
  };

  const enviarPedido = () => {
   
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")
    pedidos(token, userId, cliente, itemSelecionado)
};

return (
  <section className={styles.fundoResumo}>
    <div className={styles.textoResumo}>
      <h3>Cliente: {cliente.toUpperCase()} </h3>
      <h3>Resumo do Pedido</h3>
    </div>
    <div className={styles.fundoBranco}>
      <div className={styles.txtItens}>
        <h3> ITEM </h3>
        <div className={styles.qtdValor}>
          <h3> QTD </h3>
          <h3> VALOR </h3>
        </div>
      </div>
      {itemSelecionado.map((item) => (
        <div className={styles.txtSpan} key={item.id}>
          <span>{item.name}</span>
          <span className={styles.numerosResumo}>{item.quantidade}</span>
          <span>{`R$ ${item.price}`}</span>
          <img
            className={styles.imgLixo}
            src="/imagens/icon-lixo.png"
            alt="icone lixo"
            onClick={() => removerItem(item)}
          >
          </img>
        </div>
      ))}
      <div className={styles.totalPedido}>
        <h3> Total do Pedido: </h3>
        <p>R$ {calcularTotal()}</p>
      </div>
    </div>
    <Botao onClick={() => { enviarPedido(); navegarParaCozinha(); }}> ENVIAR </Botao>
  </section>
);
};

export default CaixaResumo;
