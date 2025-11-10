const ManuelUtilisation = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-primary mb-6">Manuel d'Utilisation</h2>
        <div className="prose max-w-none">
          <h3 className="text-xl font-semibold text-primary mb-4">Bienvenue sur CGF Access</h3>
          <p className="text-gray-700 mb-4">
            Ce manuel vous guidera dans l'utilisation de la plateforme CGF Access.
          </p>
          
          <h4 className="text-lg font-semibold text-primary mt-6 mb-3">Navigation</h4>
          <p className="text-gray-700 mb-4">
            Utilisez le menu latéral pour accéder aux différentes sections de l'application.
          </p>

          <h4 className="text-lg font-semibold text-primary mt-6 mb-3">Marché</h4>
          <p className="text-gray-700 mb-4">
            Consultez les cours des actions, les indices BRVM, et les palmarès.
          </p>

          <h4 className="text-lg font-semibold text-primary mt-6 mb-3">Portefeuille</h4>
          <p className="text-gray-700 mb-4">
            Gérez votre portefeuille et consultez vos positions.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ManuelUtilisation
