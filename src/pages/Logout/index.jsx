import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import "./style.css";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId;

    const logout = async () => {
      try {
        const { error } = await supabase.auth.signOut();

        if (error) {
          console.error("Erro ao encerrar sessão:", error.message);
        }

        // Aguarda um pouco antes de redirecionar
        timeoutId = setTimeout(() => {
          navigate("/", { replace: true });
        }, 1500);

      } catch (err) {
        console.error("Erro inesperado ao sair:", err);
        navigate("/", { replace: true });
      }
    };

    logout();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [navigate]);

  return (
    <div className="logout-container">
      <div className="logout-card">
        <div className="logout-spinner"></div>
        <h2 className="logout-title">Saindo com segurança...</h2>
        <p className="logout-text">
          Até breve! Estamos desconectando sua conta.
        </p>
      </div>
    </div>
  );
};

export default Logout;