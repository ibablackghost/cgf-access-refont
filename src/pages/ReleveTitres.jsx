import { useState } from 'react'
import { Calendar, Edit, Check, Download, Filter } from 'lucide-react'

const ReleveTitres = () => {
  const [dateSelectionnee, setDateSelectionnee] = useState('')
  const [editing, setEditing] = useState(false)

  const releve = [
    {
      typeTitre: 'Action',
      titre: 'SONATEL',
      date: '15/01/2024',
      libelle: 'Achat',
      valeurUnitaire: 12000,
      debit: 0,
      credit: 100,
      solde: 100,
    },
    {
      typeTitre: 'Action',
      titre: 'ORANGE',
      date: '10/01/2024',
      libelle: 'Achat',
      valeurUnitaire: 8500,
      debit: 0,
      credit: 50,
      solde: 50,
    },
    {
      typeTitre: 'Obligation',
      titre: 'BOA',
      date: '05/01/2024',
      libelle: 'Achat',
      valeurUnitaire: 4400,
      debit: 0,
      credit: 200,
      solde: 200,
    },
  ]

  const stats = [
    { label: 'Mouvements entrants', value: '350 titres', variation: '+35% vs mois préc.', positive: true },
    { label: 'Mouvements sortants', value: '120 titres', variation: '-12% vs mois préc.', positive: false },
    { label: 'Solde titres', value: '1 230 titres', variation: 'Portefeuille actuel', positive: true },
  ]

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400">Historique des mouvements titres</p>
            <h2 className="mt-1 text-2xl font-semibold text-primary">Relevé du compte titres</h2>
            <p className="text-sm text-slate-500">
              Suivi détaillé des entrées et sorties de titres, filtrable par période et type d&apos;opération.
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
              <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-light transition">
                <Check size={16} />
                Valider
              </button>
            </div>
            <button
              onClick={() => setEditing((prev) => !prev)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                editing ? 'bg-rose-500 text-white hover:bg-rose-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Edit size={16} />
              {editing ? 'Quitter l&apos;édition' : 'Mode édition'}
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-primary hover:text-primary transition">
              <Download size={16} />
              Export PDF
            </button>
          </div>
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
                  {stat.variation}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-6 py-4">
          <div>
            <h3 className="text-lg font-semibold text-primary">Mouvements titres</h3>
            <p className="text-xs uppercase tracking-widest text-slate-400">Tous comptes · période sélectionnée</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:border-primary hover:text-primary transition">
            <Filter size={16} />
            Filtres avancés
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-sm">
            <thead>
              <tr className="bg-slate-900/95 text-white text-xs uppercase tracking-widest">
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Titre</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Libellé</th>
                <th className="px-4 py-3 text-right">Valeur unitaire</th>
                <th className="px-4 py-3 text-right">Débit</th>
                <th className="px-4 py-3 text-right">Crédit</th>
                <th className="px-4 py-3 text-right">Solde</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {releve.map((ligne) => (
                <tr key={`${ligne.titre}-${ligne.date}`} className="bg-white/80 hover:bg-primary/5">
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {ligne.typeTitre}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-primary">{ligne.titre}</td>
                  <td className="px-4 py-3 text-slate-600">{ligne.date}</td>
                  <td className="px-4 py-3 text-slate-600">{ligne.libelle}</td>
                  <td className="px-4 py-3 text-right text-slate-600">
                    {ligne.valeurUnitaire.toLocaleString('fr-FR')} FCFA
                  </td>
                  <td className="px-4 py-3 text-right text-rose-600 font-semibold">{ligne.debit || '-'}</td>
                  <td className="px-4 py-3 text-right text-emerald-600 font-semibold">{ligne.credit}</td>
                  <td className="px-4 py-3 text-right font-semibold text-primary/80">{ligne.solde}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {editing && (
          <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 text-xs uppercase tracking-widest text-slate-400">
            Mode édition : sélectionnez une ligne pour corriger ou ajouter un commentaire interne.
          </div>
        )}
      </div>
    </div>
  )
}

export default ReleveTitres
