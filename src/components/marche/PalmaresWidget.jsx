import { useState } from 'react'
import { TrendingUp, TrendingDown, ArrowUpDown } from 'lucide-react'

const PalmaresWidget = () => {
  const [periode, setPeriode] = useState('jour')
  const [ordre, setOrdre] = useState('decroissant')

  const actions = [
    { ticker: 'SONATEL', cours: 12500, change: 2.5, volume: 125000 },
    { ticker: 'ORANGE', cours: 8900, change: 1.8, volume: 98000 },
    { ticker: 'BOA', cours: 4500, change: -0.5, volume: 75000 },
    { ticker: 'SGB', cours: 3200, change: 3.2, volume: 65000 },
    { ticker: 'CGF', cours: 2100, change: -1.2, volume: 45000 },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-primary">Palmarès</h3>
        <div className="flex gap-2">
          <select
            value={periode}
            onChange={(e) => setPeriode(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded text-sm"
          >
            <option value="jour">Jour</option>
            <option value="semaine">Semaine</option>
            <option value="mois">Mois</option>
          </select>
          <button
            onClick={() => setOrdre(ordre === 'decroissant' ? 'croissant' : 'decroissant')}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ArrowUpDown size={16} />
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        {actions.map((action, index) => (
          <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-primary w-20">{action.ticker}</span>
              <span className="text-gray-700">{action.cours.toLocaleString('fr-FR')} FCFA</span>
            </div>
            <div className="flex items-center gap-4">
              <span className={`flex items-center gap-1 ${
                action.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {action.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {action.change > 0 ? '+' : ''}{action.change}%
              </span>
              <span className="text-sm text-gray-500">Vol: {action.volume.toLocaleString('fr-FR')}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
        <p><strong>PTO</strong>: Prix de Transaction Optimal - Prix moyen pondéré des transactions</p>
        <p><strong>QTO</strong>: Quantité de Transaction Optimale - Volume optimal pour une transaction</p>
      </div>
    </div>
  )
}

export default PalmaresWidget
