import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Servicos from './pages/Servicos';
// AJUSTE AQUI: Como o App.jsx está na raiz da src junto com o supabaseClient, usamos './'
import { supabase } from './supabaseClient'; 

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true); // Adicionado para evitar pulos de tela

  useEffect(() => {
    // 1. Pega a sessão atual ao carregar
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Escuta mudanças na autenticação (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoading(false);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Enquanto verifica se o usuário está logado, exibe nada ou um loading
  if (loading) return null; 

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={session ? <Navigate to="/servicos" /> : <Login />}
        />

        <Route
          path="/servicos"
          element={session ? <Servicos /> : <Navigate to="/" />}
        />

        <Route path="/logout" element={<Logout />} />
        
        {/* Rota de segurança: se digitar qualquer coisa errada, volta pro início */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;