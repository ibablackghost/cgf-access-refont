import { Wallet } from 'lucide-react'

const PortefeuilleResume = () => {
  const totalPortefeuille = 12500000
  const totalLiquide = 2500000

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-3 mb-4">
        <Wallet className="text-primary" size={24} />
        <h3 className="text-lg font-semibold text-primary">Portefeuille</h3>
      </div>
      <div className="space-y-3">
        <div>
          <div className="text-sm text-gray-600 mb-1">Total Portefeuille</div>
          <div className="text-2xl font-bold text-primary">
            {totalPortefeuille.toLocaleString('fr-FR')} FCFA
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-600 mb-1">Liquide Disponible</div>
          <div className="text-xl font-semibold text-green-600">
            {totalLiquide.toLocaleString('fr-FR')} FCFA
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortefeuilleResume
