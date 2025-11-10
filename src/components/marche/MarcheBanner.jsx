import { TrendingUp } from 'lucide-react'

const MarcheBanner = () => {
  const indices = [
    { name: 'BRVM C', value: 336.8, variation: 0.09 },
    { name: 'BRVM 30', value: 164.24, variation: 0.1 },
    { name: 'BRVM Prestige', value: 141.27, variation: 0.76 },
  ]

  const valeurTotale = 1112901547
  const derniereMAJ = new Date().toLocaleString('fr-FR', { timeZone: 'GMT' })

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-[#133a7a] to-[#061431] text-white p-8 shadow-2xl">
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent"></div>
      <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Marché ouvert — BRVM
          </div>
          <h1 className="text-3xl lg:text-4xl font-semibold leading-tight">
            Suivez en temps réel les mouvements du marché régional
          </h1>
          <p className="text-white/80">
            Indices, transactions, volumes et palmarès : toutes les données essentielles pour piloter vos décisions
            d’investissement sur la BRVM.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-white/90 text-primary font-semibold px-5 py-2 hover:bg-white transition">
              Configurer ma sélection
            </button>
            <button className="rounded-full border border-white/30 px-5 py-2 text-white/90 hover:bg-white/10 transition">
              Télécharger les données
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
          {indices.map((indice) => (
            <div
              key={indice.name}
              className="rounded-2xl bg-white/10 p-4 backdrop-blur shadow-inner shadow-black/10 flex flex-col gap-3"
            >
              <div className="text-xs uppercase tracking-widest text-white/70">{indice.name}</div>
              <div className="text-3xl font-semibold">{indice.value.toFixed(2)}</div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-1 ${
                    indice.variation >= 0 ? 'bg-emerald-400/20 text-emerald-200' : 'bg-rose-400/20 text-rose-200'
                  }`}
                >
                  <TrendingUp size={14} />
                  {indice.variation >= 0 ? '+' : ''}
                  {indice.variation.toFixed(2)}%
                </span>
              </div>
            </div>
          ))}
          <div className="sm:col-span-3 rounded-2xl bg-white/10 p-4 backdrop-blur flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-white/70">Valeur totale des transactions</div>
              <div className="text-2xl font-semibold">{valeurTotale.toLocaleString('fr-FR')} FCFA</div>
            </div>
            <div className="text-right text-sm text-white/70">
              Dernière mise à jour
              <br />
              {derniereMAJ} GMT
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarcheBanner
