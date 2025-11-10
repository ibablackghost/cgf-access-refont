const CompteSelectionne = () => {
  const compte = {
    type: 'Compte TITRES - LIBRE',
    numero: '0338631036',
    nom: 'M. PAPA IBRAHIMA DIAGNE',
  }

  const metrics = [
    { label: 'Encours total', value: '12 550 000 FCFA' },
    { label: 'Liquidité disponible', value: '2 500 000 FCFA' },
    { label: 'Dernière opération', value: 'Achat SONATEL · 15/01/2024' },
  ]

  const actions = [
    { label: 'Voir les documents', icon: 'document' },
    { label: 'Exporter', icon: 'download' },
    { label: 'Ajouter à la sélection', icon: 'plus' },
    { label: 'Réorganiser', icon: 'grid' },
  ]

  const renderIcon = (icon) => {
    switch (icon) {
      case 'document':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m1-15H8a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V6l-4-4z" />
          </svg>
        )
      case 'download':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
          </svg>
        )
      case 'plus':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        )
      case 'grid':
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zm0 10a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        )
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white/90 backdrop-blur shadow-sm p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary/70">Compte sélectionné</p>
          <p className="mt-1 text-xl font-semibold text-primary">
            {compte.type} · N° {compte.numero}
          </p>
          <p className="text-sm text-slate-500">{compte.nom}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {actions.map((action) => (
            <button
              key={action.label}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:border-primary hover:text-primary transition"
            >
              {renderIcon(action.icon)}
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <p className="text-xs uppercase tracking-widest text-slate-400">{metric.label}</p>
            <p className="mt-2 text-lg font-semibold text-primary">{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CompteSelectionne
