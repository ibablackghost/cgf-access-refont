import { TrendingUp, Activity, BarChart3 } from 'lucide-react'
import { Link } from 'react-router-dom'

const Main = () => {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-8">
        <h1 className="text-3xl font-semibold text-primary mb-4">Bienvenue sur CGF Access</h1>
        <p className="text-slate-600">
          Accédez à toutes les fonctionnalités de la plateforme depuis cette page d&apos;accueil.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Link
          to="/marche"
          className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 hover:shadow-lg transition group"
        >
          <BarChart3 className="text-primary mb-4" size={32} />
          <h3 className="text-lg font-semibold text-primary mb-2">Marché</h3>
          <p className="text-sm text-slate-500">
            Consultez les cours, indices BRVM et données du marché en temps réel
          </p>
        </Link>

        <Link
          to="/portefeuille"
          className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 hover:shadow-lg transition group"
        >
          <Activity className="text-primary mb-4" size={32} />
          <h3 className="text-lg font-semibold text-primary mb-2">Portefeuille</h3>
          <p className="text-sm text-slate-500">
            Gérez vos positions et suivez la valorisation de vos investissements
          </p>
        </Link>

        <Link
          to="/ordres"
          className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 hover:shadow-lg transition group"
        >
          <TrendingUp className="text-primary mb-4" size={32} />
          <h3 className="text-lg font-semibold text-primary mb-2">Ordres</h3>
          <p className="text-sm text-slate-500">
            Passez vos ordres de bourse et suivez leurs exécutions
          </p>
        </Link>
      </div>
    </div>
  )
}

export default Main

