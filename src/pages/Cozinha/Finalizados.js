import styles from "./Cozinha.module.css"
import LogoMenor from "../../componentes/LogoMenor";
import Tag from "../../componentes/Tag";
import CaixaFundo from "../../componentes/CaixaFundo";
import { useEffect, useState } from "react";
import { obterPedidos } from "../../API/orders";
import Botao from "../../componentes/Botao";

const Finalizados = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      const response = await obterPedidos(token);
      const listaPedidos = await response.data
      setPedidos(listaPedidos);
      console.log(listaPedidos)
    }
    fetchData()
  }, []);

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
            <span className={styles.nomeCliente}>Cliente: {pedido.client.toUpperCase()}</span>
            <div className={styles.fundoBranco}>
              <div className={styles.qtdValor}>
                <span>ITEM</span>
                <span>QTD</span>
              </div>
              <div className={styles.pedidosCozinha}>
                <div>
                  {pedido.products.map((product) => (
                    <div className={styles.produtos} key={product.id}>
                      <span>{product.name}</span>
                      <span>{product.quantidade}</span>
                    </div>
                  ))}
                </div>
              <Botao>PRONTO</Botao>
              </div>
            </div>
          </div>
        </CaixaFundo>
      ))}

    </section>
  )
}

export default Finalizados