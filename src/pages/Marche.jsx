import { useEffect, useMemo, useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import MarcheBanner from '../components/marche/MarcheBanner'
import CompteSelectionne from '../components/CompteSelectionne'
import DonneesMarcheToolbar from '../components/marche/DonneesMarcheToolbar'
import TickerWidget from '../components/marche/TickerWidget'
import { fetchMarketSnapshot, computeTopFromActions, mapIndices } from '../services/marketApi'

const DEFAULT_FOCUS_ACTIONS = [
  { name: 'BRVM Composite', cours: 245.67, change: 2.34 },
  { name: 'BRVM 30', cours: 198.45, change: -1.23 },
  { name: 'BRVM Prestige', cours: 312.89, change: 3.45 },
]

const DEFAULT_TOP_HAUSSE = [
  { ticker: 'SONATEL', cours: 12500, change: 2.5 },
  { ticker: 'SGB', cours: 3200, change: 3.2 },
  { ticker: 'ORANGE', cours: 8900, change: 1.8 },
  { ticker: 'BOA', cours: 4500, change: 1.2 },
  { ticker: 'CGF', cours: 2100, change: 0.8 },
]

const DEFAULT_TOP_BAISSE = [
  { ticker: 'CGF', cours: 2100, change: -1.2 },
  { ticker: 'BOA', cours: 4500, change: -0.5 },
  { ticker: 'ORANGE', cours: 8900, change: -0.3 },
  { ticker: 'SGB', cours: 3200, change: -0.2 },
  { ticker: 'SONATEL', cours: 12500, change: -0.1 },
]

const DEFAULT_MEILLEURS_VOLUMES = [
  { ticker: 'SONATEL', volume: 125000 },
  { ticker: 'ORANGE', volume: 98000 },
  { ticker: 'BOA', volume: 75000 },
  { ticker: 'SGB', volume: 65000 },
  { ticker: 'CGF', volume: 45000 },
]

const KNOWN_OBLIGATION_KEYS = [
  'obligations',
  'Obligations',
  'obligationsCotees',
  'ObligationsCotees',
  'obligationsListees',
  'ObligationsListees',
  'obligationsMarche',
  'ObligationsMarche',
  'emissionsObligataires',
  'EmissionsObligataires',
]

const pickObligations = (payload) => {
  if (!payload || typeof payload !== 'object') return []
  for (const key of KNOWN_OBLIGATION_KEYS) {
    const value = payload[key]
    if (Array.isArray(value) && value.length) {
      return value
    }
  }
  return (
    Object.values(payload).find(
      (value) =>
        Array.isArray(value) &&
        value.some(
          (item) =>
            item &&
            typeof item === 'object' &&
            ('tauxFacial' in item ||
              'dateEmission' in item ||
              'dateEcheance' in item ||
              'dateEcheanece' in item ||
              'valeurDernierCoupon' in item ||
              'coursJour' in item),
        ),
    ) || []
  )
}

const formatDateString = (value) => {
  if (!value || typeof value !== 'string') return '—'
  const [datePart] = value.split(' ')
  return datePart || value
}

const Marche = () => {
  const [selectedAction, setSelectedAction] = useState(DEFAULT_FOCUS_ACTIONS[0].name)
  const [activeTab, setActiveTab] = useState('selection')
  const [continuRows, setContinuRows] = useState([])
  const [obligationsRows, setObligationsRows] = useState([])
  const [indicesRows, setIndicesRows] = useState([])
  const [fcpRows, setFcpRows] = useState([])
  const [continuLoading, setContinuLoading] = useState(false)
  const [continuError, setContinuError] = useState('')

  useEffect(() => {
    let mounted = true
    setContinuLoading(true)
    ;(async () => {
      try {
        const data = await fetchMarketSnapshot()
        if (!mounted) return
        const rows = Array.isArray(data?.actionsCotees) ? data.actionsCotees : []
        setContinuRows(rows)
        const obligations = pickObligations(data)
        setObligationsRows(Array.isArray(obligations) ? obligations : [])
        const mappedIndices = mapIndices(Array.isArray(data?.Indices) ? data.Indices : [])
        setIndicesRows(mappedIndices.length ? mappedIndices : [])
        const fcps = Array.isArray(data?.FCPCGF) ? data.FCPCGF : []
        setFcpRows(fcps.length ? fcps : [])
        setContinuError('')
      } catch (e) {
        if (mounted) {
          setContinuError('Impossible de récupérer les actions (Continu).')
        }
      } finally {
        if (mounted) {
          setContinuLoading(false)
        }
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const dynamicFocusActions = useMemo(() => {
    if (!continuRows.length) return []
    return continuRows.slice(0, 3).map((row) => ({
      name: row.Nom || row.Symbol || row.titre || 'N/A',
      cours: Number(row.coursVeille ?? row.coursCloture ?? 0) || 0,
      change: Number(row.variationP ?? 0) || 0,
    }))
  }, [continuRows])

  const focusActions = dynamicFocusActions.length ? dynamicFocusActions : DEFAULT_FOCUS_ACTIONS

  useEffect(() => {
    if (!focusActions.length) return
    const exists = focusActions.some((action) => action.name === selectedAction)
    if (!exists) {
      setSelectedAction(focusActions[0].name)
    }
  }, [focusActions, selectedAction])

  const selectedActionData =
    focusActions.find((a) => a.name === selectedAction) ?? focusActions[0] ?? { cours: 0, change: 0 }

  const historiqueData = [
    { date: '01/01', valeur: 240 },
    { date: '02/01', valeur: 242 },
    { date: '03/01', valeur: 238 },
    { date: '04/01', valeur: 245 },
    { date: '05/01', valeur: 243 },
    { date: '06/01', valeur: 246 },
  ]

  const tops = useMemo(() => {
    if (!continuRows.length) {
      return {
        topHausse: DEFAULT_TOP_HAUSSE,
        topBaisse: DEFAULT_TOP_BAISSE,
        meilleursVolumes: DEFAULT_MEILLEURS_VOLUMES,
      }
    }
    return computeTopFromActions(continuRows)
  }, [continuRows])

  const hasIndices = indicesRows.length > 0
  const hasFcps = fcpRows.length > 0

  const tabs = [
    { id: 'continu', label: 'Continu', count: continuRows.length || null },
    { id: 'obligations', label: 'Obligations', count: obligationsRows.length || null },
    { id: 'indices', label: 'Indices', count: indicesRows.length || null },
    { id: 'fcp', label: 'FCP', count: fcpRows.length || null },
  ]

  const focusMetrics = [
    {
      label: 'Variation',
      value: `${selectedActionData?.change >= 0 ? '+' : ''}${selectedActionData?.change ?? 0}%`,
      note: 'Performance journalière',
      positive: (selectedActionData?.change ?? 0) >= 0,
    },
    {
      label: 'PTO (Prix moyen pondéré)',
      value: '12 450 FCFA',
      note: 'Prix moyen de transaction de la séance',
    },
    {
      label: 'QTO (Quantité optimale)',
      value: '8 500 titres',
      note: 'Volume optimal calculé pour limiter l’impact marché',
    },
    {
      label: 'Volatilité séance',
      value: '1.8%',
      note: 'Écart entre le plus haut et le plus bas du jour',
    },
  ]

  const glossaire = [
    {
      terme: 'PTO',
      definition: 'Prix de Transaction Optimal',
      explication:
        'Représente le prix moyen pondéré des échanges réalisés sur une valeur durant la séance.',
    },
    {
      terme: 'QTO',
      definition: 'Quantité de Transaction Optimale',
      explication:
        'Volume théorique maximisant l’efficacité d’un ordre en limitant l’impact sur le marché.',
    },
  ]

  const notifications = [
    { titre: 'Hausse notable SONATEL', detail: '+2.5% · Volume 125 000', heure: 'Il y a 5 min' },
    { titre: 'Indice BRVM Prestige', detail: 'Var. +0.76% · Leader du jour', heure: 'Il y a 18 min' },
    { titre: 'Nouvelle alerte définie', detail: 'BRVM Composite > 250 pts', heure: 'Il y a 1 h' },
  ]

  return (
    <div className="space-y-8">
      <MarcheBanner />

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <CompteSelectionne />
          <DonneesMarcheToolbar />

          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-slate-900/95 px-4 py-3 text-white">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeTab === tab.id ? 'bg-white text-slate-900' : 'hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                  {tab.count !== null && <span className="ml-2 text-xs opacity-80">({tab.count})</span>}
                </button>
              ))}
            </div>
            <div className="overflow-x-auto">
              {activeTab === 'continu' ? (
                <table className="w-full min-w-[900px] text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <th className="px-4 py-3">Nom</th>
                      <th className="px-4 py-3">Symbole</th>
                      <th className="px-4 py-3 text-right">Cours veille</th>
                      <th className="px-4 py-3 text-right">Variation %</th>
                      <th className="px-4 py-3 text-right">Volume</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {continuLoading ? (
                      <tr>
                        <td colSpan="5" className="px-4 py-10 text-center text-slate-400">
                          Chargement…
                        </td>
                      </tr>
                    ) : continuError ? (
                      <tr>
                        <td colSpan="5" className="px-4 py-10 text-center text-rose-500">
                          {continuError}
                        </td>
                      </tr>
                    ) : continuRows.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-4 py-10 text-center text-slate-400">
                          Pas de lignes à afficher.
                        </td>
                      </tr>
                    ) : (
                      continuRows.map((row) => {
                        const variation = Number(row.variationP ?? row.varPercent ?? 0)
                        const coursVeille = Number(row.coursVeille ?? row.coursCloture ?? 0)
                        const volume = Number(row.volume ?? 0)
                        return (
                          <tr key={`${row.Symbol || row.Nom}`} className="bg-white/80 hover:bg-primary/5 transition">
                            <td className="px-4 py-3 text-primary font-semibold">{row.Nom || row.Symbol}</td>
                            <td className="px-4 py-3">{row.Symbol || '—'}</td>
                            <td className="px-4 py-3 text-right">{coursVeille.toLocaleString('fr-FR')}</td>
                            <td
                              className={`px-4 py-3 text-right ${variation >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}
                            >
                              {variation >= 0 ? '+' : ''}
                              {variation.toLocaleString('fr-FR')}%
                            </td>
                            <td className="px-4 py-3 text-right">{volume.toLocaleString('fr-FR')}</td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              ) : activeTab === 'obligations' ? (
                <table className="w-full min-w-[960px] text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <th className="px-4 py-3">Nom</th>
                      <th className="px-4 py-3">Symbole</th>
                      <th className="px-4 py-3 text-right">Cours jour</th>
                      <th className="px-4 py-3 text-right">Taux facial</th>
                      <th className="px-4 py-3 text-right">Dernier coupon</th>
                      <th className="px-4 py-3 text-right">Émission</th>
                      <th className="px-4 py-3 text-right">Dernier paiement</th>
                      <th className="px-4 py-3 text-right">Échéance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {continuLoading ? (
                      <tr>
                        <td colSpan="8" className="px-4 py-10 text-center text-slate-400">
                          Chargement…
                        </td>
                      </tr>
                    ) : continuError ? (
                      <tr>
                        <td colSpan="8" className="px-4 py-10 text-center text-rose-500">
                          {continuError}
                        </td>
                      </tr>
                    ) : obligationsRows.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="px-4 py-10 text-center text-slate-400">
                          Pas de lignes à afficher.
                        </td>
                      </tr>
                    ) : (
                      obligationsRows.map((row) => {
                        const coursJour = Number(row.coursJour ?? row.coursVeille ?? 0)
                        const tauxFacial = Number(row.tauxFacial ?? 0)
                        const dernierCoupon = Number(row.valeurDernierCoupon ?? 0)
                        return (
                          <tr key={`${row.Symbol || row.Nom}`} className="bg-white/80 hover:bg-primary/5 transition">
                            <td className="px-4 py-3 text-primary font-semibold">{row.Nom || row.Symbol}</td>
                            <td className="px-4 py-3">{row.Symbol || '—'}</td>
                            <td className="px-4 py-3 text-right">{coursJour.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}</td>
                            <td className="px-4 py-3 text-right">{tauxFacial.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}%</td>
                            <td className="px-4 py-3 text-right">{dernierCoupon.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}</td>
                            <td className="px-4 py-3 text-right">{formatDateString(row.dateEmission)}</td>
                            <td className="px-4 py-3 text-right">{formatDateString(row.dateDernierPaiement)}</td>
                            <td className="px-4 py-3 text-right">
                              {formatDateString(row.dateEcheance || row.dateEcheanece)}
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              ) : activeTab === 'indices' ? (
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <th className="px-4 py-3">Nom</th>
                      <th className="px-4 py-3">Symbole</th>
                      <th className="px-4 py-3 text-right">Cours</th>
                      <th className="px-4 py-3 text-right">Variation %</th>
                      <th className="px-4 py-3 text-right">Dernière valeur connue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {continuLoading ? (
                      <tr>
                        <td colSpan="5" className="px-4 py-10 text-center text-slate-400">
                          Chargement…
                        </td>
                      </tr>
                    ) : continuError ? (
                      <tr>
                        <td colSpan="5" className="px-4 py-10 text-center text-rose-500">
                          {continuError}
                        </td>
                      </tr>
                    ) : !hasIndices ? (
                      <tr>
                        <td colSpan="5" className="px-4 py-10 text-center text-slate-400">
                          Pas de lignes à afficher.
                        </td>
                      </tr>
                    ) : (
                      indicesRows.map((indice) => {
                        const variation = Number(indice.change ?? indice.variation ?? indice.var ?? 0)
                        const prix = Number(indice.value ?? indice.prix ?? 0)
                        return (
                          <tr key={indice.code || indice.titre || indice.nom} className="bg-white/70 transition hover:bg-primary/5">
                            <td className="px-4 py-3 font-semibold text-primary">{indice.name || indice.nom || indice.Nom}</td>
                            <td className="px-4 py-3 text-slate-600">{indice.code || indice.titre || indice.Titre || '—'}</td>
                            <td className="px-4 py-3 text-right text-slate-700">{prix.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}</td>
                            <td className={`px-4 py-3 text-right ${variation >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                              {variation >= 0 ? '+' : ''}
                              {variation.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}%
                            </td>
                            <td className="px-4 py-3 text-right text-slate-500">
                              {prix.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              ) : activeTab === 'fcp' ? (
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <th className="px-4 py-3">Nom</th>
                      <th className="px-4 py-3">Symbole</th>
                      <th className="px-4 py-3 text-right">Valeur liquidative</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {continuLoading ? (
                      <tr>
                        <td colSpan="3" className="px-4 py-10 text-center text-slate-400">
                          Chargement…
                        </td>
                      </tr>
                    ) : continuError ? (
                      <tr>
                        <td colSpan="3" className="px-4 py-10 text-center text-rose-500">
                          {continuError}
                        </td>
                      </tr>
                    ) : !hasFcps ? (
                      <tr>
                        <td colSpan="3" className="px-4 py-10 text-center text-slate-400">
                          Pas de lignes à afficher.
                        </td>
                      </tr>
                    ) : (
                      fcpRows.map((fcp) => (
                        <tr key={fcp.Titre || fcp.titre || fcp.nom} className="bg-white/70 transition hover:bg-primary/5">
                          <td className="px-4 py-3 font-semibold text-primary">{fcp.Nom || fcp.nom}</td>
                          <td className="px-4 py-3 text-slate-600">{(fcp.Titre || fcp.titre || '').trim() || '—'}</td>
                          <td className="px-4 py-3 text-right text-slate-700">
                            {Number(fcp.prix ?? fcp.Valeur ?? fcp.valeur ?? 0).toLocaleString('fr-FR', { minimumFractionDigits: 4 })}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              ) : null}
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-primary">Focus valeur</h3>
                <p className="text-sm text-slate-500">
                  Analyse intraday et historique de vos indices favoris
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {focusActions.map((action) => (
                  <button
                    key={action.name}
                    onClick={() => setSelectedAction(action.name)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      selectedAction === action.name
                        ? 'bg-primary text-white shadow'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {action.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-slate-400">Cours actuel</p>
                    <p className="text-3xl font-semibold text-primary">
                      {selectedActionData.cours.toLocaleString('fr-FR')} FCFA
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                      selectedActionData.change >= 0
                        ? 'bg-emerald-100 text-emerald-600'
                        : 'bg-rose-100 text-rose-600'
                    }`}
                  >
                    {selectedActionData.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    {selectedActionData.change >= 0 ? '+' : ''}
                    {selectedActionData.change}%
                  </span>
                </div>
                <div className="mt-4 h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historiqueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#dfe7ff" />
                      <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <Tooltip />
                      <Line type="monotone" dataKey="valeur" stroke="#112B60" strokeWidth={3} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-4">
                {focusMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <p className="text-xs uppercase tracking-widest text-slate-400">{metric.label}</p>
                    <p
                      className={`mt-2 text-lg font-semibold ${
                        metric.positive === undefined
                          ? 'text-primary'
                          : metric.positive
                          ? 'text-emerald-600'
                          : 'text-rose-600'
                      }`}
                    >
                      {metric.value}
                    </p>
                    {metric.note && <p className="text-xs text-slate-500 mt-1">{metric.note}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-emerald-700 mb-4">Top 5 en Hausse</h3>
              <div className="space-y-3">
                  {tops.topHausse.map((action) => (
                  <div
                    key={action.ticker}
                    className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3 border border-emerald-100"
                  >
                    <div>
                      <p className="font-semibold text-primary">{action.ticker}</p>
                      <p className="text-xs text-slate-500">{action.cours.toLocaleString('fr-FR')} FCFA</p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-600">
                      <TrendingUp size={16} />+{action.change}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-rose-100 bg-gradient-to-br from-rose-50 via-white to-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-rose-700 mb-4">Top 5 en Baisse</h3>
              <div className="space-y-3">
                  {tops.topBaisse.map((action) => (
                  <div
                    key={action.ticker}
                    className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3 border border-rose-100"
                  >
                    <div>
                      <p className="font-semibold text-primary">{action.ticker}</p>
                      <p className="text-xs text-slate-500">{action.cours.toLocaleString('fr-FR')} FCFA</p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-3 py-1 text-sm font-semibold text-rose-600">
                      <TrendingDown size={16} />{action.change}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-primary mb-4">Meilleurs Volumes</h3>
              <div className="space-y-3">
                  {tops.meilleursVolumes.map((action) => (
                  <div
                    key={action.ticker}
                    className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3 border border-blue-100"
                  >
                    <p className="font-semibold text-primary">{action.ticker}</p>
                    <span className="text-sm font-semibold text-primary/80">
                      {action.volume.toLocaleString('fr-FR')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-primary">
                Échanges exceptionnels · Dernière séance clôturée
              </h3>
              <span className="rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary uppercase tracking-widest">
                Analyse automatique
              </span>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[520px] text-sm">
                <thead>
                  <tr className="text-left text-xs font-semibold uppercase tracking-widest text-slate-400">
                    <th className="px-4 py-3">Ticker</th>
                    <th className="px-4 py-3">Volume</th>
                    <th className="px-4 py-3">Montant</th>
                    <th className="px-4 py-3">Variation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tops.meilleursVolumes.map((action) => (
                    <tr key={action.ticker} className="hover:bg-primary/5">
                      <td className="px-4 py-3 font-semibold text-primary">{action.ticker}</td>
                      <td className="px-4 py-3">{action.volume.toLocaleString('fr-FR')}</td>
                      <td className="px-4 py-3">{(action.volume * 1000).toLocaleString('fr-FR')} FCFA</td>
                      <td className="px-4 py-3 text-emerald-600 font-semibold">
                        +{(Math.random() * 5 + 1).toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <TickerWidget />

          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-primary">Notifications & Insights</h3>
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div
                  key={notif.titre}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <p className="text-sm font-semibold text-primary">{notif.titre}</p>
                  <p className="text-xs text-slate-500">{notif.detail}</p>
                  <p className="text-[11px] uppercase tracking-widest text-slate-400 mt-1">{notif.heure}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-primary">Glossaire du marché</h3>
            <p className="text-sm text-slate-500">
              Bien comprendre les indicateurs clés pour interpréter les mouvements de marché.
            </p>
            <div className="space-y-4">
              {glossaire.map((item) => (
                <div key={item.terme} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <p className="text-sm font-semibold text-primary">{item.terme} · {item.definition}</p>
                  <p className="text-xs text-slate-500 mt-1">{item.explication}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Marche
