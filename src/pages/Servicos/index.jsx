import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import "./style.css";

const Servicos = () => {

  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchServicos = async () => {

      try {

        setLoading(true);

        const { data, error } = await supabase
          .from("servicos")
          .select("*")
          .order("name", { ascending: true });

        if (error) throw error;

        setServicos(data || []);

      } catch (error) {

        console.error("Erro ao carregar serviços:", error.message);

      } finally {

        setLoading(false);

      }

    };

    fetchServicos();

  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Carregando serviços...</p>
      </div>
    );
  }

  return (
    <div className="servicos-container">

      <header className="servicos-header">
        <h1>Nossos Serviços</h1>
        <p>Escolha o cuidado ideal para suas unhas</p>
      </header>

      <div className="servicos-grid">

        {servicos.length > 0 ? (

          servicos.map((servico) => (

            <div key={servico.id} className="servico-card">

              <div className="servico-img">

                {servico.img_url
                  ? <img src={servico.img_url} alt={servico.name} />
                  : <div className="no-image">💅</div>
                }

              </div>

              <div className="servico-info">

                <h3>{servico.name}</h3>

                <p className="descricao">
                  {servico.descricao || "Descrição não disponível"}
                </p>

                <div className="servico-footer">

                  <span className="preco">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL"
                    }).format(servico.price || 0)}
                  </span>

                  <button className="btn-agendar">
                    Agendar
                  </button>

                </div>

              </div>

            </div>

          ))

        ) : (

          <p className="no-data">Nenhum serviço encontrado.</p>

        )}

      </div>

    </div>
  );

};

export default Servicos;