import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';


const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            const { error } = await supabase.auth.signOut();

            if (error) {
                console.error('Erro ao fazer logout:', error.message);
            } else {
                navigate('/logout'); // redireciona para login
            }
        };

        handleLogout();
    }, [navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h2>Saindo...</h2>
            <p>Você está sendo desconectado.</p>
        </div>
    );
};

export default Logout;