import { Activity } from 'lucide-react'

const TransactionsWidget = () => {
  const totalTransactions = 1250000
  const nombreTransactions = 342

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-3 mb-4">
        <Activity className="text-primary" size={24} />
        <h3 className="text-lg font-semibold text-primary">Transactions du Jour</h3>
      </div>
      <div className="space-y-4">
        <div>
          <div className="text-sm text-gray-600 mb-1">Total des transactions</div>
          <div className="text-3xl font-bold text-primary">
            {totalTransactions.toLocaleString('fr-FR')} FCFA
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-600 mb-1">Nombre de transactions</div>
          <div className="text-2xl font-semibold text-gray-700">{nombreTransactions}</div>
        </div>
      </div>
    </div>
  )
}

export default TransactionsWidget
