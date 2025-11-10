import { useState } from 'react'
import { Bell, Plus, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'

const Alertes = () => {
  const [alertes, setAlertes] = useState([
    { id: 1, titre: 'SONATEL', condition: 'Cours >', seuil: '13 000 FCFA', canal: 'Email', active: true },
    { id: 2, titre: 'BRVM Composite', condition: 'Variation % >', seuil: '3%', canal: 'SMS', active: true },
    { id: 3, titre: 'ORANGE', condition: 'Volume >', seuil: '100 000', canal: 'Push', active: false },
  ])

  const [showForm, setShowForm] = useState(false)
  const [nouvelleAlerte, setNouvelleAlerte] = useState({
    titre: '',
    condition: 'Cours >',
    seuil: '',
    canal: 'Email',
  })

  const handleDelete = (id) => {
    setAlertes(alertes.filter((a) => a.id !== id))
  }

  const handleToggle = (id) => {
    setAlertes((prev) =>
      prev.map((alerte) => (alerte.id === id ? { ...alerte, active: !alerte.active } : alerte))
    )
  }

  const handleAdd = () => {
    if (nouvelleAlerte.titre && nouvelleAlerte.seuil) {
      setAlertes((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          ...nouvelleAlerte,
          active: true,
        },
      ])
      setNouvelleAlerte({ titre: '', condition: 'Cours >', seuil: '', canal: 'Email' })
      setShowForm(false)
    }
  }

  const stats = [
    { label: 'Alertes actives', value: alertes.filter((a) => a.active).length, accent: 'text-emerald-600' },
    { label: 'Alertes inactives', value: alertes.filter((a) => !a.active).length, accent: 'text-rose-600' },
    { label: 'Dernière alerte déclenchée', value: 'BRVM Composite · 14:32', accent: 'text-primary' },
  ]

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Bell className="text-primary" size={24} />
            <div>
              <h2 className="text-2xl font-semibold text-primary">Gestion des alertes</h2>
              <p className="text-sm text-slate-500">
                Suivez les seuils critiques et soyez informé instantanément des mouvements importants.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-primary-light transition"
          >
            <Plus size={18} />
            {showForm ? 'Fermer le formulaire' : 'Créer une alerte'}
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-widest text-slate-400">{stat.label}</p>
              <p className={`mt-2 text-xl font-semibold ${stat.accent}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {showForm && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs uppercase tracking-widest text-slate-400">Titre / Valeur</label>
                <input
                  type="text"
                  value={nouvelleAlerte.titre}
                  onChange={(e) => setNouvelleAlerte({ ...nouvelleAlerte, titre: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none"
                  placeholder="Ex: SONATEL"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-slate-400">Canal de notification</label>
                <select
                  value={nouvelleAlerte.canal}
                  onChange={(e) => setNouvelleAlerte({ ...nouvelleAlerte, canal: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none"
                >
                  <option value="Email">Email</option>
                  <option value="SMS">SMS</option>
                  <option value="Push">Notification mobile</option>
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-slate-400">Condition</label>
                <select
                  value={nouvelleAlerte.condition}
                  onChange={(e) => setNouvelleAlerte({ ...nouvelleAlerte, condition: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none"
                >
                  <option value="Cours >">Cours supérieur à</option>
                  <option value="Cours <">Cours inférieur à</option>
                  <option value="Variation % >">Variation % supérieure à</option>
                  <option value="Volume >">Volume supérieur à</option>
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-slate-400">Seuil déclencheur</label>
                <input
                  type="text"
                  value={nouvelleAlerte.seuil}
                  onChange={(e) => setNouvelleAlerte({ ...nouvelleAlerte, seuil: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none"
                  placeholder="Ex: 13 000 FCFA"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAdd}
                className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-light transition"
              >
                Ajouter l&apos;alerte
              </button>
              <button
                onClick={() => {
                  setShowForm(false)
                  setNouvelleAlerte({ titre: '', condition: 'Cours >', seuil: '', canal: 'Email' })
                }}
                className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Annuler
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {alertes.map((alerte) => (
            <div
              key={alerte.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold text-primary">{alerte.titre}</p>
                <p className="text-xs text-slate-500">
                  {alerte.condition} {alerte.seuil} · Canal {alerte.canal}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleToggle(alerte.id)}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:border-primary hover:text-primary transition"
                >
                  {alerte.active ? <ToggleRight size={18} className="text-emerald-500" /> : <ToggleLeft size={18} className="text-slate-400" />}
                  {alerte.active ? 'Active' : 'Inactive'}
                </button>
                <button
                  onClick={() => handleDelete(alerte.id)}
                  className="inline-flex items-center justify-center rounded-full border border-rose-200 px-3 py-2 text-rose-600 hover:bg-rose-50 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Alertes
