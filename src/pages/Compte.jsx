import { useState } from 'react'
import { User, Save, Mail, Phone, Globe, ShieldCheck, Bell, Sun } from 'lucide-react'

const Compte = () => {
  const [profile, setProfile] = useState({
    type: 'particulier',
    numero: '123456789',
    nom: 'Jean',
    prenom: 'Dupont',
    email: 'jean.dupont@cgfaccess.com',
    phone: '+221 77 000 00 00',
    pays: 'Sénégal',
    devise: 'FCFA',
  })

  const [preferences, setPreferences] = useState({
    alertesEmail: true,
    alertesSms: false,
    newsletter: true,
    themeClair: false,
  })

  const typesCompte = [
    { value: 'particulier', label: 'Particulier' },
    { value: 'professionnel', label: 'Professionnel' },
    { value: 'institutionnel', label: 'Institutionnel' },
  ]

  const updateProfile = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const togglePreference = (field) => {
    setPreferences((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 flex flex-col items-center text-center gap-4">
          <div className="h-24 w-24 rounded-full bg-primary text-white text-3xl font-semibold flex items-center justify-center shadow-lg">
            {profile.nom[0]}
            {profile.prenom[0]}
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400">Client CGF Access</p>
            <h2 className="mt-1 text-xl font-semibold text-primary">
              {profile.nom} {profile.prenom}
            </h2>
            <p className="text-sm text-slate-500">Compte N° {profile.numero}</p>
          </div>
          <div className="w-full rounded-2xl border border-primary/20 bg-primary/10 p-4 text-left">
            <p className="text-xs uppercase tracking-widest text-primary/70">Statut</p>
            <p className="mt-1 text-sm font-semibold text-primary">Accès Premium · Suivi personnalisé</p>
            <p className="text-xs text-primary/70 mt-1">
              Conseiller dédié · Priorité sur les ordres · Alertes avancées
            </p>
          </div>
          <div className="w-full space-y-3 text-left">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Mail size={16} className="text-primary" />
              {profile.email}
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Phone size={16} className="text-primary" />
              {profile.phone}
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Globe size={16} className="text-primary" />
              {profile.pays} · Devise de référence {profile.devise}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 space-y-6">
          <div className="flex items-center gap-3">
            <User className="text-primary" size={24} />
            <div>
              <h2 className="text-2xl font-semibold text-primary">Informations du compte</h2>
              <p className="text-sm text-slate-500">Mettez à jour vos informations personnelles et bancaires.</p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="text-xs uppercase tracking-widest text-slate-400">Type de compte</label>
              <select
                value={profile.type}
                onChange={(e) => updateProfile('type', e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 focus:border-primary focus:bg-white focus:outline-none"
              >
                {typesCompte.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-slate-400">Numéro de compte</label>
              <input
                type="text"
                value={profile.numero}
                onChange={(e) => updateProfile('numero', e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 focus:border-primary focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-slate-400">Nom</label>
              <input
                type="text"
                value={profile.nom}
                onChange={(e) => updateProfile('nom', e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 focus:border-primary focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-slate-400">Prénom</label>
              <input
                type="text"
                value={profile.prenom}
                onChange={(e) => updateProfile('prenom', e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 focus:border-primary focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-slate-400">Adresse e-mail</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => updateProfile('email', e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 focus:border-primary focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-slate-400">Numéro de téléphone</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => updateProfile('phone', e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 focus:border-primary focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-slate-400">Pays de résidence</label>
              <input
                type="text"
                value={profile.pays}
                onChange={(e) => updateProfile('pays', e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 focus:border-primary focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-slate-400">Devise principale</label>
              <input
                type="text"
                value={profile.devise}
                onChange={(e) => updateProfile('devise', e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 focus:border-primary focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-primary-light transition">
              <Save size={18} />
              Enregistrer les modifications
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Bell className="text-primary" size={20} />
            <h3 className="text-lg font-semibold text-primary">Préférences de notification</h3>
          </div>
          <p className="text-sm text-slate-500">
            Choisissez comment vous souhaitez être informé des mouvements de marché et opérations sur votre compte.
          </p>
          <div className="space-y-3">
            {[
              { field: 'alertesEmail', label: 'Recevoir les alertes par e-mail' },
              { field: 'alertesSms', label: 'Recevoir les alertes par SMS' },
              { field: 'newsletter', label: 'Recevoir la newsletter marchés' },
              { field: 'themeClair', label: 'Préférer le thème clair' },
            ].map((pref) => (
              <button
                key={pref.field}
                onClick={() => togglePreference(pref.field)}
                role="switch"
                aria-checked={preferences[pref.field]}
                className={`flex items-center justify-between w-full rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                  preferences[pref.field]
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                <span>{pref.label}</span>
                <span
                  className={`inline-flex h-6 w-12 items-center rounded-full border ${
                    preferences[pref.field]
                      ? 'border-primary bg-primary'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  <span
                    className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      preferences[pref.field] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  ></span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-primary" size={20} />
            <h3 className="text-lg font-semibold text-primary">Sécurité et confidentialité</h3>
          </div>
          <p className="text-sm text-slate-500">
            Consultez l&apos;historique de vos connexions et renforcez la sécurité de votre espace client.
          </p>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              Dernière connexion : <strong>15/01/2024 · 14:30 (IP 192.168.60.219)</strong>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              Authentification renforcée : <strong>Active (SMS)</strong>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              Historique : 8 connexions réussies cette semaine
            </div>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition">
            <Sun size={16} />
            Gérer la sécurité avancée
          </button>
        </div>
      </div>
    </div>
  )
}

export default Compte
