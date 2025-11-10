import { useState } from 'react'
import { Lock, User } from 'lucide-react'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-[#0d224b] to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8 space-y-6">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-primary text-white text-3xl font-semibold flex items-center justify-center">
            CGF
          </div>
          <h1 className="text-3xl font-semibold text-primary">CGF Access</h1>
          <p className="text-slate-500 mt-2">Connexion à votre espace client</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-slate-400 mb-2 block">
              Identifiant
            </label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 text-sm focus:border-primary focus:bg-white focus:outline-none"
                placeholder="Votre identifiant"
              />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-slate-400 mb-2 block">
              Mot de passe
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 py-3 text-sm focus:border-primary focus:bg-white focus:outline-none"
                placeholder="Votre mot de passe"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-primary-light transition"
          >
            Se connecter
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          <a href="#" className="text-primary hover:underline">
            Mot de passe oublié ?
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login

