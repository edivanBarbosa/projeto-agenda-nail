import { useState } from "react";
import { supabase } from "../../supabaseClient";
import "./style.css";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "http://localhost:5173/admin",
        },
      });

      if (error) {
        console.error("Erro ao fazer login:", error.message);
        alert("Erro ao fazer login. Tente novamente.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page_login">
      <div className="logo">
        <img src="/logo.jpeg" alt="Simone Rocha - Nail Designer" />
      </div>

      <div className="login_card">
        <h2>Bem-vinda!</h2>
        <p>Entre com sua conta Google para continuar</p>

        <button
          className="google_button"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar com Google"}
        </button>
      </div>
    </main>
  );
};

export default Login;