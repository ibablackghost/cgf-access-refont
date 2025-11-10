import { useState } from 'react'
import { Calendar, Filter, Download, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const ReleveEspeces = () => {
  const [dateSelectionnee, setDateSelectionnee] = useState('')
  const [filtre, setFiltre] = useState('tous')

  const filtres = [
    { id: 'tous', label: 'Tous' },
    { id: 'retrait', label: 'Retrait' },
    { id: 'encaissement', label: 'Encaissement' },
    { id: 'versement', label: 'Versement' },
    { id: 'souscriptions', label: 'Souscriptions' },
    { id: 'transfert de titre', label: 'Transfert de titre' },
  ]

  const releve = [
    { date: '15/01/2024', libelle: 'Versement', montant: 1000000, type: 'versement' },
    { date: '10/01/2024', libelle: 'Achat SONATEL', montant: -1200000, type: 'retrait' },
    { date: '05/01/2024', libelle: 'Encaissement Dividende', montant: 50000, type: 'encaissement' },
    { date: '01/01/2024', libelle: 'Souscription', montant: -500000, type: 'souscriptions' },
  ]

  const soldeFinal = 2500000
  const totalMouvements = releve.reduce((acc, r) => acc + r.montant, 0)
  const soldeInitial = soldeFinal - totalMouvements

  const releveFiltre =
    filtre === 'tous' ? releve : releve.filter((r) => r.type === filtre.toLowerCase())

  const stats = [
    {
      label: 'Entrées',
      value: releve.filter((r) => r.montant > 0).reduce((sum, r) => sum + r.montant, 0).toLocaleString('fr-FR'),
      suffixe: ' FCFA',
      positive: true,
    },
    {
      label: 'Sorties',
      value: Math.abs(releve.filter((r) => r.montant < 0).reduce((sum, r) => sum + r.montant, 0)).toLocaleString('fr-FR'),
      suffixe: ' FCFA',
      positive: false,
    },
    {
      label: 'Solde initial',
      value: soldeInitial.toLocaleString('fr-FR'),
      suffixe: ' FCFA',
      positive: true,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400">Flux espèces / cash</p>
            <h2 className="mt-1 text-2xl font-semibold text-primary">Relevé espèces</h2>
            <p className="text-sm text-slate-500">
              Visualisez toutes les entrées et sorties de trésorerie et ajustez vos disponibilités.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2">
              <Calendar size={18} className="text-slate-500" />
              <input
                type="date"
                value={dateSelectionnee}
                onChange={(e) => setDateSelectionnee(e.target.value)}
                className="bg-transparent text-sm text-slate-600 focus:outline-none"
              />
            </div>
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-primary hover:text-primary transition">
              <Download size={16} />
              Exporter
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-widest text-slate-400">{stat.label}</p>
              <p className="mt-2 text-xl font-semibold text-primary">
                {stat.value}
                {stat.suffixe}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {stat.positive ? 'Flux favorable' : 'Flux sortant'}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Filter size={18} className="text-slate-500" />
          {filtres.map((f) => (
            <button
              key={f.id}
              onClick={() => setFiltre(f.id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                filtre === f.id
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-slate-200 bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-6 py-4">
          <div>
            <h3 className="text-lg font-semibold text-primary">Mouvements de trésorerie</h3>
            <p className="text-xs uppercase tracking-widest text-slate-400">Solde initial : {soldeInitial.toLocaleString('fr-FR')} FCFA</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="bg-slate-900/95 text-white text-xs uppercase tracking-widest">
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Libellé</th>
                <th className="px-4 py-3 text-right">Montant</th>
                <th className="px-4 py-3 text-right">Solde courant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {releveFiltre.map((ligne, index) => {
                const cumul =
                  soldeInitial +
                  releveFiltre.slice(0, index + 1).reduce((acc, r) => acc + r.montant, 0)

                return (
                  <tr key={`${ligne.date}-${ligne.libelle}`} className="bg-white/80 hover:bg-primary/5">
                    <td className="px-4 py-3 text-slate-600">{ligne.date}</td>
                    <td className="px-4 py-3 text-slate-600">{ligne.libelle}</td>
                    <td
                      className={`px-4 py-3 text-right text-sm font-semibold ${
                        ligne.montant >= 0 ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {ligne.montant >= 0 ? '+' : ''}
                      {ligne.montant.toLocaleString('fr-FR')} FCFA
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-primary/80">
                      {cumul.toLocaleString('fr-FR')} FCFA
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-white to-white px-6 py-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary/70">Solde final</p>
          <h3 className="text-2xl font-semibold text-primary">
            {soldeFinal.toLocaleString('fr-FR')} FCFA
          </h3>
          <p className="text-xs text-slate-500 mt-1">Somme de tous les dépôts et mouvements validés</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600">
            <ArrowUpRight size={14} /> Flux positifs
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-500">
            <ArrowDownRight size={14} /> Flux négatifs
          </span>
        </div>
      </div>
    </div>
  )
}

export default ReleveEspeces
