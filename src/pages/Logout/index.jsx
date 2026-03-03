import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import './Logout.css'; // Importando o CSS separado

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                // Encerra a sessão no Supabase
                const { error } = await supabase.auth.signOut();
                if (error) throw error;

                // Pequena pausa para o usuário ler a mensagem, depois redireciona para o login
                setTimeout(() => {
                    navigate('/', { replace: true });
                }, 1500);

            } catch (error) {
                console.error('Erro ao encerrar sessão:', error.message);
                navigate('/');
            }
        };

        handleLogout();
    }, [navigate]);

    return (
        <div className="logout-container">
            <div className="logout-card">
                <div className="logout-spinner"></div>
                <h2 className="logout-title">Saindo com segurança...</h2>
                <p className="logout-text">Até breve! Estamos desconectando sua conta.</p>
            </div>
        </div>
    );
};

export default Logout;