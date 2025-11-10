import { TrendingUp, TrendingDown } from 'lucide-react'

const IndicesWidget = () => {
  const indices = [
    { name: 'BRVM Composite', value: 245.67, change: 2.34, changePercent: 0.96 },
    { name: 'BRVM 10', value: 198.45, change: -1.23, changePercent: -0.62 },
    { name: 'BRVM Prestige', value: 312.89, change: 3.45, changePercent: 1.12 },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-primary mb-4">Indices BRVM</h3>
      <div className="space-y-4">
        {indices.map((indice, index) => (
          <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-gray-700">{indice.name}</span>
              <span className={`flex items-center gap-1 ${
                indice.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {indice.change >= 0 ? (
                  <TrendingUp size={16} />
                ) : (
                  <TrendingDown size={16} />
                )}
                {indice.changePercent > 0 ? '+' : ''}{indice.changePercent}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary">{indice.value}</span>
              <span className={`text-sm ${indice.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {indice.change >= 0 ? '+' : ''}{indice.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default IndicesWidget
