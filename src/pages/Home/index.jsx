import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import "./style.css";



export default function Home() {
  console.log("HOME FOI CARREGADA");
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const { data, error } = await supabase
          .from("servicos")
          .select("*")
          .order("name", { ascending: true });

        if (error) {
          console.error("Erro ao buscar serviços:", error.message);
          return;
        }

        setServicos(data || []);
      } catch (err) {
        console.error("Erro inesperado:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServicos();
  }, []);

  const handleAgendar = (servicoId) => {
    navigate(`/agendamento?servicod=${servicoId}`);
  };

  if (loading) {
    return (
      <div className="home-container">
        <p className="loading">Carregando serviços...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo-placeholder">
          <img
            img src="/logo.jpeg" alt="Simone Rocha - Nail Designer"
            className="main-logo"
          />
          <h1>Simone Rocha</h1>
          <p>Nail Designer & Estética</p>
        </div>
      </header>

      <main className="vitrine-servicos">
        <h2>Nossos Serviços</h2>

        <div className="grid-servicos">
          {servicos.map((s) => (
            <div
              key={s.id}
              className="card-servico"
              onClick={() => handleAgendar(s.id)}
            >
              <div className="card-image">
                {s.img_url ? (
                  <img src={s.img_url} alt={s.name} />
                ) : (
                  <div className="no-image">💅</div>
                )}
              </div>

              <div className="card-info">
                <h3>{s.name}</h3>

                <p className="desc">
                  {s.descricao || "Serviço de estética especializado"}
                </p>

                <div className="card-footer">
                  <span className="preco">
                    R$ {Number(s.price || 0).toFixed(2)}
                  </span>

                  <button
                    className="btn-agendar"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAgendar(s.id);
                    }}
                  >
                    Agendar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {servicos.length === 0 && (
          <p className="no-servicos">Nenhum serviço cadastrado.</p>
        )}
      </main>
    </div>
  );
}