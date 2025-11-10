import { useState } from 'react'
import { Calendar, Edit, Plus, ArrowUpRight, PieChart } from 'lucide-react'

const Portefeuille = () => {
  const [dateSelectionnee, setDateSelectionnee] = useState('actuel')
  const [editing, setEditing] = useState(false)

  const periodes = [
    { value: 'actuel', label: 'Portefeuille actuel' },
    { value: '2024-01-01', label: '01 janv. 2024' },
    { value: '2024-01-15', label: '15 janv. 2024' },
  ]

  const portefeuille = [
    {
      type: 'Action',
      titre: 'SONATEL',
      qte: 100,
      qteDisponible: 100,
      cmp: 12000,
      cours: 12500,
      value: 50000,
      rendement: 4.17,
      ponderation: 40,
      dividende: 5000,
      montant: 1250000,
      montantInvesti: 1200000,
    },
    {
      type: 'Action',
      titre: 'ORANGE',
      qte: 50,
      qteDisponible: 50,
      cmp: 8500,
      cours: 8900,
      value: 20000,
      rendement: 4.71,
      ponderation: 35.6,
      dividende: 3000,
      montant: 445000,
      montantInvesti: 425000,
    },
    {
      type: 'Obligation',
      titre: 'BOA',
      qte: 200,
      qteDisponible: 200,
      cmp: 4400,
      cours: 4500,
      value: 20000,
      rendement: 2.27,
      ponderation: 14.4,
      dividende: 0,
      montant: 900000,
      montantInvesti: 880000,
    },
  ]

  const totaux = {
    totalPortefeuille: 2595000,
    totalLiquider: 2595000,
    liquideDisponible: 2500000,
    liquiditeReserve: 0,
    totalMontantInvesti: 2505000,
    totalGeneral: 5095000,
  }

  const stats = [
    {
      label: 'Valorisation totale',
      value: `${totaux.totalPortefeuille.toLocaleString('fr-FR')} FCFA`,
      variation: '+2.4%',
      positive: true,
    },
    {
      label: 'Performance YTD',
      value: '+4.2%',
      variation: 'vs 2023',
      positive: true,
    },
    {
      label: 'Liquidité disponible',
      value: `${totaux.liquideDisponible.toLocaleString('fr-FR')} FCFA`,
      variation: 'Prête à investir',
      positive: true,
    },
  ]

  const allocations = [
    { label: 'Actions', value: 74, color: 'bg-primary' },
    { label: 'Obligations', value: 18, color: 'bg-emerald-500' },
    { label: 'Liquidités', value: 8, color: 'bg-slate-400' },
  ]

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400">Portefeuille multi-actifs</p>
            <h2 className="mt-1 text-2xl font-semibold text-primary">Pilotage en temps réel</h2>
            <p className="text-sm text-slate-500">
              Visualisez la répartition de vos positions et rééquilibrez en un clic.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2">
              <Calendar size={18} className="text-slate-500" />
              <span className="text-sm font-medium text-slate-600">{periodes.find((p) => p.value === dateSelectionnee)?.label}</span>
            </div>
            <button
              onClick={() => setEditing((prev) => !prev)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                editing ? 'bg-rose-500 text-white hover:bg-rose-600' : 'bg-primary text-white hover:bg-primary-light'
              }`}
            >
              <Edit size={16} />
              {editing ? 'Quitter le mode édition' : 'Activer le mode édition'}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {periodes.map((periode) => (
            <button
              key={periode.value}
              onClick={() => setDateSelectionnee(periode.value)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                dateSelectionnee === periode.value
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-slate-200 bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {periode.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-widest text-slate-400">{stat.label}</p>
              <div className="mt-2 flex items-end justify-between">
                <p className="text-xl font-semibold text-primary">{stat.value}</p>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                    stat.positive ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                  }`}
                >
                  <ArrowUpRight size={14} />
                  {stat.variation}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400">Allocation stratégique</p>
              <h3 className="text-lg font-semibold text-primary">Répartition par classe d&apos;actifs</h3>
            </div>
            <PieChart size={20} className="text-primary" />
          </div>
          <div className="space-y-3">
            {allocations.map((allocation) => (
              <div key={allocation.label}>
                <div className="flex items-center justify-between text-sm font-medium text-slate-600">
                  <span>{allocation.label}</span>
                  <span>{allocation.value}%</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
                  <div
                    className={`h-2 rounded-full ${allocation.color}`}
                    style={{ width: `${allocation.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-6 py-4">
          <div>
            <h3 className="text-lg font-semibold text-primary">Positions détaillées</h3>
            <p className="text-xs uppercase tracking-widest text-slate-400">
              Valorisation, pondération et revenus prévisionnels
            </p>
          </div>
          <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:border-primary hover:text-primary transition">
            Exporter en CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-sm">
            <thead>
              <tr className="bg-slate-900/95 text-white text-xs uppercase tracking-widest">
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Titre</th>
                <th className="px-4 py-3 text-right">Qté</th>
                <th className="px-4 py-3 text-right">Qté dispo.</th>
                <th className="px-4 py-3 text-right">CMP</th>
                <th className="px-4 py-3 text-right">Cours</th>
                <th className="px-4 py-3 text-right">+/- Value</th>
                <th className="px-4 py-3 text-right">Rend.</th>
                <th className="px-4 py-3 text-right">Pondération</th>
                <th className="px-4 py-3 text-right">Dividende</th>
                <th className="px-4 py-3 text-right">Montant</th>
                <th className="px-4 py-3 text-right">Investi</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {portefeuille.map((ligne) => (
                <tr key={ligne.titre} className="bg-white/80 hover:bg-primary/5">
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {ligne.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-primary">{ligne.titre}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{ligne.qte}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{ligne.qteDisponible}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{ligne.cmp.toLocaleString('fr-FR')}</td>
                  <td className="px-4 py-3 text-right text-primary font-semibold">
                    {ligne.cours.toLocaleString('fr-FR')}
                  </td>
                  <td className={`px-4 py-3 text-right font-semibold ${
                    ligne.value >= 0 ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {ligne.value >= 0 ? '+' : ''}
                    {ligne.value.toLocaleString('fr-FR')}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-600">{ligne.rendement}%</td>
                  <td className="px-4 py-3 text-right text-slate-600">{ligne.ponderation}%</td>
                  <td className="px-4 py-3 text-right text-slate-600">{ligne.dividende.toLocaleString('fr-FR')}</td>
                  <td className="px-4 py-3 text-right font-semibold text-primary/80">
                    {ligne.montant.toLocaleString('fr-FR')}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-600">
                    {ligne.montantInvesti.toLocaleString('fr-FR')}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white shadow hover:bg-primary-light transition">
                      <Plus size={14} />
                      Passer un ordre
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {editing && (
          <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 text-sm text-slate-500">
            Mode édition actif : sélectionnez une ligne pour modifier les quantités ou passer un ordre rapide.
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs uppercase tracking-widest text-slate-400">Total portefeuille</p>
          <p className="mt-2 text-xl font-semibold text-primary">
            {totaux.totalPortefeuille.toLocaleString('fr-FR')} FCFA
          </p>
          <p className="text-xs text-emerald-500 mt-1">+2.4% sur la semaine</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs uppercase tracking-widest text-slate-400">Total liquide</p>
          <p className="mt-2 text-xl font-semibold text-primary">
            {totaux.totalLiquider.toLocaleString('fr-FR')} FCFA
          </p>
          <p className="text-xs text-slate-500 mt-1">Inclut réserves et espèces disponibles</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs uppercase tracking-widest text-slate-400">Total général</p>
          <p className="mt-2 text-xl font-semibold text-primary">
            {totaux.totalGeneral.toLocaleString('fr-FR')} FCFA
          </p>
          <p className="text-xs text-slate-500 mt-1">Valeur consolidée portefeuille + liquidités</p>
        </div>
      </div>

      <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-primary">Besoin d&apos;ajuster votre stratégie ?</h3>
          <p className="text-sm text-primary/80">
            Simulez un rééquilibrage ou programmez un investissement récurrent en quelques secondes.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-primary-light transition">
          <ArrowUpRight size={16} />
          Simuler un rééquilibrage
        </button>
      </div>
    </div>
  )
}

export default Portefeuille
