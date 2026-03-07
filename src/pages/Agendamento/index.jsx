// Importação dos hooks do React
import { useEffect, useState } from "react";

// Hook do React Router para ler parâmetros da URL
import { useSearchParams } from "react-router-dom";

// Cliente do Supabase para acessar o banco
import { supabase } from "../../supabaseClient";

// Estilo da página
import "./style.css";


function Agendamento() {

  // Captura parâmetros da URL
  // Exemplo: /agendamento?servico=3
  const [searchParams] = useSearchParams();

  // Pega o ID do serviço enviado pela Home
  const servicoId = searchParams.get("servico");

  // Estado para armazenar o serviço carregado do banco
  const [servico, setServico] = useState(null);


  // Executa quando a página carrega
  useEffect(() => {

    // Se existir id do serviço na URL
    if (servicoId) {
      buscarServico();
    }

  }, [servicoId]);


  // Função que busca o serviço no Supabase
  async function buscarServico() {

    const { data, error } = await supabase
      .from("servicos")
      .select("*")
      .eq("id", servicoId)
      .single();

    if (error) {
      console.log("Erro ao buscar serviço:", error);
      return;
    }

    // Salva serviço no estado
    setServico(data);

  }


  // Enquanto o serviço não carregar
  if (!servico) {
    return <p>Carregando serviço...</p>;
  }


  return (

    <div className="container">

      <h1>Agendamento</h1>

      {/* Serviço selecionado */}
      <div className="servicoSelecionado">

        {servico.img_url ? (
          <img
            src={servico.img_url}
            alt={servico.name}
          />
        ) : (
          <div className="no-image">💅</div>
        )}

        <h2>{servico.name}</h2>

        <p>
          Valor:
          {" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          }).format(servico.price || 0)}
        </p>

      </div>


      {/* Formulário de agendamento */}
      <form className="formAgendamento">

        <input
          type="text"
          placeholder="Seu nome"
          required
        />

        <input
          type="tel"
          placeholder="Telefone"
          required
        />

        <input
          type="date"
          required
        />

        <input
          type="time"
          required
        />

        <button type="submit">
          Confirmar Agendamento
        </button>

      </form>

    </div>

  );
}

export default Agendamento;