import { useState } from 'react'
import { Settings, Lock, History, DollarSign, Save, Shield, KeyRound, AlarmCheck } from 'lucide-react'

const Parametres = () => {
  const [ancienMotDePasse, setAncienMotDePasse] = useState('')
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState('')
  const [confirmerMotDePasse, setConfirmerMotDePasse] = useState('')
  const [securite, setSecurite] = useState({ doubleAuth: true, alerteConnexion: true })

  const connexions = [
    { date: '15/01/2024 · 14:30', ip: '192.168.1.1', appareil: 'Chrome · Dakar', statut: 'Succès' },
    { date: '14/01/2024 · 10:15', ip: '192.168.1.1', appareil: 'Chrome · Dakar', statut: 'Succès' },
    { date: '13/01/2024 · 21:10', ip: '213.45.16.32', appareil: 'Safari · Abidjan', statut: 'Vérification 2FA' },
  ]

  const tarifications = [
    { titre: 'Frais de transaction', detail: '0,50% du montant exécuté', note: 'Minimum 5 000 FCFA par ordre' },
    { titre: 'Frais de garde', detail: 'Offerts pour les comptes actifs', note: 'Applicable si aucune opération 6 mois' },
    { titre: 'Règlement / livraison', detail: 'J+3 BRVM', note: 'Possibilité de règlement anticipé' },
  ]

  const passwordsMatch = nouveauMotDePasse && confirmerMotDePasse && nouveauMotDePasse === confirmerMotDePasse
  const strength = nouveauMotDePasse.length >= 10 ? 'Fort' : nouveauMotDePasse.length >= 6 ? 'Moyen' : 'Faible'

  const toggleSecurity = (field) => {
    setSecurite((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 space-y-5">
          <div className="flex items-center gap-3">
            <Lock className="text-primary" size={24} />
            <div>
              <h3 className="text-xl font-semibold text-primary">Changer de mot de passe</h3>
              <p className="text-sm text-slate-500">Renforcez votre sécurité en mettant à jour vos identifiants.</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-slate-400">Ancien mot de passe</label>
              <input
                type="password"
                value={ancienMotDePasse}
                onChange={(e) => setAncienMotDePasse(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-primary focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-slate-400">Nouveau mot de passe</label>
              <input
                type="password"
                value={nouveauMotDePasse}
                onChange={(e) => setNouveauMotDePasse(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-primary focus:bg-white focus:outline-none"
              />
              {nouveauMotDePasse && (
                <p className="mt-2 text-xs text-slate-500">
                  Force du mot de passe : <strong>{strength}</strong>
                </p>
              )}
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-slate-400">Confirmer le mot de passe</label>
              <input
                type="password"
                value={confirmerMotDePasse}
                onChange={(e) => setConfirmerMotDePasse(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-primary focus:bg-white focus:outline-none"
              />
              {confirmerMotDePasse && !passwordsMatch && (
                <p className="mt-2 text-xs text-rose-500">Les mots de passe ne correspondent pas.</p>
              )}
            </div>
            <button className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-primary-light transition">
              <Save size={18} />
              Enregistrer
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 space-y-5">
          <div className="flex items-center gap-3">
            <Shield className="text-primary" size={24} />
            <div>
              <h3 className="text-xl font-semibold text-primary">Sécurité renforcée</h3>
              <p className="text-sm text-slate-500">Activez les options avancées pour protéger votre compte.</p>
            </div>
          </div>
          <div className="space-y-3">
            {[{ field: 'doubleAuth', label: 'Authentification à deux facteurs (recommandé)' }, { field: 'alerteConnexion', label: 'Recevoir une alerte à chaque nouvelle connexion' }].map((option) => (
              <button
                key={option.field}
                onClick={() => toggleSecurity(option.field)}
                className={`flex items-center justify-between w-full rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                  securite[option.field]
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{option.label}</span>
                <span
                  className={`inline-flex h-6 w-12 items-center rounded-full border ${
                    securite[option.field]
                      ? 'border-primary bg-primary'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  <span
                    className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      securite[option.field] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  ></span>
                </span>
              </button>
            ))}
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 flex items-center gap-3">
            <KeyRound size={18} className="text-primary" />
            Dernière modification du mot de passe : <strong>Il y a 72 jours</strong>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 space-y-5">
        <div className="flex items-center gap-3">
          <History className="text-primary" size={24} />
          <div>
            <h3 className="text-xl font-semibold text-primary">Historique de connexion</h3>
            <p className="text-sm text-slate-500">Dernières connexions détectées sur vos sessions CGF Access.</p>
          </div>
        </div>
        <div className="space-y-3">
          {connexions.map((connexion) => (
            <div
              key={`${connexion.date}-${connexion.ip}`}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
            >
              <div>
                <p className="font-semibold text-primary">{connexion.date}</p>
                <p className="text-slate-500">{connexion.appareil}</p>
              </div>
              <div className="text-right text-xs uppercase tracking-widest text-slate-400">
                IP {connexion.ip}
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600">
                {connexion.statut}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-3">
            <DollarSign className="text-primary" size={24} />
            <h3 className="text-xl font-semibold text-primary">Tarifications & règlements</h3>
          </div>
          <div className="grid gap-3">
            {tarifications.map((tarif) => (
              <div key={tarif.titre} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-sm font-semibold text-primary">{tarif.titre}</p>
                <p className="text-xs text-slate-500">{tarif.detail}</p>
                <p className="text-xs text-slate-400 mt-1">{tarif.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Settings className="text-primary" size={24} />
            <h3 className="text-xl font-semibold text-primary">Configuration rapide</h3>
          </div>
          <p className="text-sm text-slate-500">
            Sauvegardez vos mises en page, vos sélections d&apos;indices et vos alertes pour y accéder instantanément.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <button className="rounded-2xl border border-primary px-4 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition">
              Enregistrer une configuration
            </button>
            <button className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition">
              Configurer une sélection
            </button>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <AlarmCheck size={16} className="text-primary" />
            Dernière sauvegarde automatique : 15/01/2024 · 08:45
          </div>
        </div>
      </div>
    </div>
  )
}

export default Parametres
