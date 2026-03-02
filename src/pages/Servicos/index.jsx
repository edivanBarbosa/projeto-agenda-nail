import { useApp } from '../context/AppContext';

const ListaAgendamentos = ({ dataSelecionada }) => {
    const { agendamentos } = useApp();

    const formatarData = (dataString) => {
        const data = new Date(dataString + 'T00:00:00');
        return data.toLocaleDateString('pt-BR');
    };

    const agendamentosFiltrados = dataSelecionada
        ? agendamentos.filter(a => {
            const dataAgendamento = new Date(a.data + 'T00:00:00');
            return dataAgendamento.toDateString() === dataSelecionada.toDateString();
        })
        : agendamentos.slice(0, 5);

    return (
        <div className="lista-agendamentos">
            {agendamentosFiltrados.length === 0 ? (
                <p className="sem-agendamentos">
                    {dataSelecionada
                        ? 'Nenhum agendamento para esta data.'
                        : 'Nenhum agendamento cadastrado.'}
                </p>
            ) : (
                agendamentosFiltrados.map(agendamento => (
                    <div key={agendamento.id} className="agendamento-item">
                        <div className="agendamento-info">
                            <span className="agendamento-icon">👤</span>
                            <div>
                                <strong>{agendamento.cliente}</strong>
                                <p>{agendamento.servico}</p>
                            </div>
                        </div>
                        <div className="agendamento-data">
                            <span>{formatarData(agendamento.data)}</span>
                            <span className="data-icon">📅</span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ListaAgendamentos;
