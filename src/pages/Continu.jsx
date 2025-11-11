import { useEffect, useState } from 'react'
import { fetchMarketSnapshot } from '../services/marketApi'

const Continu = () => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    setLoading(true)
    ;(async () => {
      try {
        const data = await fetchMarketSnapshot()
        if (!mounted) return
        setRows(Array.isArray(data?.actionsCotees) ? data.actionsCotees : [])
      } catch (e) {
        setError('Impossible de récupérer les actions (Continu).')
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-primary mb-2">Continu</h2>
        <p className="text-sm text-slate-500">Liste des actions cotées (flux temps réel).</p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
          {loading ? (
            <span className="text-sm text-slate-500">Chargement…</span>
          ) : error ? (
            <span className="text-sm text-rose-600">{error}</span>
          ) : (
            <span className="text-sm text-slate-500">{rows.length} actions</span>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="bg-slate-900/95 text-white text-xs uppercase tracking-widest">
                <th className="px-4 py-3 text-left">Nom</th>
                <th className="px-4 py-3 text-left">Symbole</th>
                <th className="px-4 py-3 text-right">Cours clôture</th>
                <th className="px-4 py-3 text-right">Variation %</th>
                <th className="px-4 py-3 text-right">Volume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row) => (
                <tr key={row.Symbol} className="bg-white/80 hover:bg-primary/5">
                  <td className="px-4 py-3 text-primary font-semibold">{row.Nom}</td>
                  <td className="px-4 py-3">{row.Symbol}</td>
                  <td className="px-4 py-3 text-right">{Number(row.coursCloture ?? row.coursJour ?? row.coursVeille ?? 0).toLocaleString('fr-FR')}</td>
                  <td className={`px-4 py-3 text-right ${Number(row.variationP ?? 0) >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {Number(row.variationP ?? 0).toLocaleString('fr-FR')}%
                  </td>
                  <td className="px-4 py-3 text-right">{Number(row.volume || 0).toLocaleString('fr-FR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Continu

