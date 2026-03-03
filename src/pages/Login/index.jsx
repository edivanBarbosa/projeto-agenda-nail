import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import './Login.css';

const Login = () => {

    const navigate = useNavigate();
    const handleGoogleLogin = async () => {

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'http://localhost:5173/servicos' // ou sua URL de produção
            }
        });

        if (error) {
            console.error('Erro ao fazer login:', error.message);
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
                >
                    Entrar com Google
                </button>

            </div>

            <button onClick={() => navigate('/logout')}>
                Sair
            </button>

        </main>
    );
};

export default Login;