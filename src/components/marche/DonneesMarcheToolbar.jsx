import {
  Mail,
  Flag,
  Calendar,
  Zap,
  Printer,
  TrendingUp,
  TrendingDown,
  Coins,
  ArrowLeftRight,
  List,
  Save,
  Settings,
  Bell,
} from 'lucide-react'

const DonneesMarcheToolbar = () => {
  const actions = [
    { icon: Mail, label: 'Messages', badge: '0' },
    { icon: Flag, label: 'Favoris' },
    { icon: Calendar, label: 'Calendrier' },
    { icon: Zap, label: 'Flash Infos' },
    { icon: Printer, label: 'Imprimer' },
  ]

  const indices = [
    { id: 'brvmc', label: 'BRVM C', active: true },
    { id: 'brvm30', label: 'BRVM 30', active: false },
    { id: 'brvmprestige', label: 'BRVM Prestige', active: false },
  ]

  const outils = [
    { icon: TrendingUp, label: 'Hausse' },
    { icon: TrendingDown, label: 'Baisse' },
    { icon: Coins, label: 'Volumes' },
    { icon: ArrowLeftRight, label: 'Échanges' },
    { icon: List, label: 'Tableaux' },
    { icon: Save, label: 'Sauvegarder' },
    { icon: Settings, label: 'Options' },
    { icon: Bell, label: 'Alertes' },
  ]

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-400">Données du marché</p>
          <h3 className="text-lg font-semibold text-primary">Accès rapide aux flux et outils</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {actions.map(({ icon: Icon, label, badge }) => (
            <button
              key={label}
              className="relative inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:border-primary hover:text-primary transition"
            >
              <Icon size={18} />
              <span>{label}</span>
              {badge && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs font-semibold text-white">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {indices.map((indice) => (
          <button
            key={indice.id}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              indice.active
                ? 'bg-primary text-white shadow'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {indice.label}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {outils.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 hover:border-primary hover:text-primary hover:bg-primary/5 transition"
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default DonneesMarcheToolbar
