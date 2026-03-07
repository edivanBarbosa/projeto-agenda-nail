import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import "./style.css";

const BUCKET_NAME = "servicos-imagens";

export default function AdminPanel() {

  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    desc: "",
    horario: ""
  });

  const [imgFile, setImgFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // carregar serviços
  const loadServices = async () => {

    try {

      const { data, error } = await supabase
        .from("servicos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setServices(data || []);

    } catch (err) {

      console.error("Erro ao carregar:", err);
      showToast("Erro ao carregar lista.", "error");

    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const showToast = (msg, type = "success") => {

    setToast({ msg, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);

  };

  const handleImgChange = (file) => {

    if (!file) return;

    setImgFile(file);

    const preview = URL.createObjectURL(file);
    setImgPreview(preview);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!form.name || !form.price) {
      showToast("Nome e preço são obrigatórios!", "error");
      return;
    }

    try {

      setLoading(true);

      let imgUrl = null;

      if (imgFile) {

        const fileExt = imgFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `servicos/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(filePath, imgFile);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(filePath);

        imgUrl = data.publicUrl;

      }

      const { error: insertError } = await supabase
        .from("servicos")
        .insert([
          {
            name: form.name,
            price: parseFloat(form.price),
            descricao: form.desc,
            horario: form.horario,
            img_url: imgUrl
          }
        ]);

      if (insertError) throw insertError;

      showToast("Serviço cadastrado com sucesso!");

      setForm({
        name: "",
        price: "",
        desc: "",
        horario: ""
      });

      setImgFile(null);
      setImgPreview(null);

      loadServices();

    } catch (err) {

      console.error(err);
      showToast("Erro ao salvar serviço.", "error");

    } finally {

      setLoading(false);

    }

  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm("Deseja realmente excluir este serviço?");

    if (!confirmDelete) return;

    try {

      const { error } = await supabase
        .from("servicos")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setServices((prev) => prev.filter((s) => s.id !== id));

      showToast("Removido com sucesso!");

    } catch (err) {

      console.error(err);
      showToast("Erro ao deletar.", "error");

    }

  };

  return (

    <div className="admin-root">

      <header className="topbar">

        <div className="topbar-brand">
          <div className="topbar-avatar">S</div>

          <div>
            <div className="topbar-name">Simone Rocha</div>
            <div className="topbar-role">Gerenciamento de Serviços</div>
          </div>

        </div>

        <h2 className="topbar-title">Painel Administrativo</h2>

        <button
          className="btn-logout"
          onClick={() => navigate("/logout")}
        >
          Sair
        </button>

      </header>

      <main className="admin-main">

        <div className="form-card">

          <div className="form-header">
            <h3>Novo Serviço</h3>
            <p>Adicione fotos e detalhes para sua vitrine</p>
          </div>

          <form onSubmit={handleSubmit} className="form-grid">

            <div className="form-group">

              <label>Nome do Procedimento</label>

              <input
                type="text"
                placeholder="Ex: Alongamento em Fibra"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

            </div>

            <div className="form-group">

              <label>Preço (R$)</label>

              <input
                type="number"
                step="0.01"
                placeholder="0,00"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
              />

            </div>

            <div className="form-group full">

              <label>Descrição</label>

              <textarea
                placeholder="Explique o serviço..."
                value={form.desc}
                onChange={(e) =>
                  setForm({ ...form, desc: e.target.value })
                }
              />

            </div>

            <div className="form-group full">

              <label>Tempo estimado</label>

              <input
                type="text"
                placeholder="Ex: 2 horas"
                value={form.horario}
                onChange={(e) =>
                  setForm({ ...form, horario: e.target.value })
                }
              />

            </div>

            <div className="form-group full">

              <label>Foto do Serviço</label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImgChange(e.target.files[0])
                }
              />

              {imgPreview && (
                <img
                  src={imgPreview}
                  alt="preview"
                  className="preview-img"
                />
              )}

            </div>

            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Salvar Serviço"}
            </button>

          </form>

        </div>

        <section className="services-section">

          <h4>Serviços cadastrados ({services.length})</h4>

          <div className="service-list">

            {services.map((s) => (

              <div key={s.id} className="service-item">

                <div className="item-img">
                  {s.img_url
                    ? <img src={s.img_url} alt={s.name} />
                    : <span>💅</span>}
                </div>

                <div className="item-info">
                  <strong>{s.name}</strong>
                  <span>R$ {Number(s.price || 0).toFixed(2)}</span>
                </div>

                <button
                  className="btn-del"
                  onClick={() => handleDelete(s.id)}
                >
                  🗑️
                </button>

              </div>

            ))}

          </div>

        </section>

      </main>

      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.msg}
        </div>
      )}

    </div>
  );
}