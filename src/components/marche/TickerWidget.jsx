import { useState } from 'react'

const TickerWidget = () => {
  const [executions] = useState([
    { ticker: 'SONATEL', prix: 12500, quantite: 100, heure: '14:30:15', sens: 'Achat' },
    { ticker: 'ORANGE', prix: 8900, quantite: 50, heure: '14:29:45', sens: 'Vente' },
    { ticker: 'BOA', prix: 4500, quantite: 200, heure: '14:28:20', sens: 'Achat' },
    { ticker: 'SGB', prix: 3200, quantite: 150, heure: '14:27:10', sens: 'Vente' },
    { ticker: 'CGF', prix: 2100, quantite: 300, heure: '14:26:05', sens: 'Achat' },
    { ticker: 'NSIA', prix: 3800, quantite: 220, heure: '14:25:40', sens: 'Achat' },
  ])

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-primary">Flux d&apos;exécutions en direct</h3>
          <p className="text-xs uppercase tracking-widest text-slate-400">
            Dernières transactions enregistrées sur la BRVM
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          Live
        </span>
      </div>
      <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
        {executions.map((exec, index) => (
          <div
            key={`${exec.ticker}-${exec.heure}-${index}`}
            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {exec.ticker.slice(0, 2)}
              </span>
              <div>
                <p className="text-sm font-semibold text-primary">{exec.ticker}</p>
                <p className="text-xs text-slate-500">
                  {exec.prix.toLocaleString('fr-FR')} FCFA · Qté {exec.quantite}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  exec.sens === 'Achat'
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-rose-100 text-rose-600'
                }`}
              >
                {exec.sens}
              </span>
              <span className="text-xs uppercase tracking-widest text-slate-400">{exec.heure}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TickerWidget
