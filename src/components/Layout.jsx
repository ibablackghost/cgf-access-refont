import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import {
  TrendingUp,
  Wallet,
  FileText,
  DollarSign,
  User,
  Settings,
  Bell,
  HelpCircle,
  Book,
  Menu,
  X,
  LogOut,
  Lock,
  Coins,
  RefreshCw,
  Search,
  MessageSquare,
  Newspaper,
  BarChart3,
  ShoppingCart,
  Save,
  ChevronDown,
} from 'lucide-react'

const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()

  const menuItems = [
    { path: '/', icon: TrendingUp, label: 'Résumé Marché' },
    { path: '/marche', icon: BarChart3, label: 'Marché' },
    { path: '/res-marche', icon: TrendingUp, label: 'Résumé Marché' },
    { path: '/portefeuille', icon: Wallet, label: 'Portefeuille' },
    { path: '/ordres', icon: ShoppingCart, label: 'Ordres' },
  ]

  const menuItemsSecondary = [
    { path: '/releve-titres', icon: FileText, label: 'Relevé Titres' },
    { path: '/releve-especes', icon: DollarSign, label: 'Relevé Espèces' },
    { path: '/alertes', icon: Bell, label: 'Alertes' },
    { path: '/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/news', icon: Newspaper, label: 'Actualités' },
  ]

  const menuItemsAdvanced = [
    { path: '/analyse-technique', icon: BarChart3, label: 'Analyse Technique' },
    { path: '/sous-rach', icon: ShoppingCart, label: 'Souscriptions/Rachats' },
    { path: '/configuration', icon: Save, label: 'Configuration' },
  ]

  const menuItemsSettings = [
    { path: '/parametres', icon: Settings, label: 'Paramètres' },
    { path: '/compte', icon: User, label: 'Compte' },
    { path: '/faq', icon: HelpCircle, label: 'FAQ' },
    { path: '/manuel', icon: Book, label: 'Manuel' },
  ]

  const allMenuItems = [...menuItems, ...menuItemsSecondary, ...menuItemsAdvanced, ...menuItemsSettings]

  const indices = [
    { name: 'BRVM C', value: 336.8, change: 0.09 },
    { name: 'BRVM 30', value: 164.24, change: 0.1 },
    { name: 'BRVM PRESTIGE', value: 141.27, change: 0.76 },
  ]

  const currentLabel = allMenuItems.find((item) => item.path === location.pathname)?.label || 'CGF Access'

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        {/* Main Navigation */}
        <div className="px-4 md:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo and Brand */}
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-white text-lg font-semibold flex items-center justify-center shadow-lg">
                  CGF
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Plateforme</p>
                  <p className="text-lg font-semibold text-primary">CGF Access</p>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-1 ml-8">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.path
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
                        isActive
                          ? 'bg-primary text-white shadow'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-primary'
                      }`}
                    >
                      <Icon size={18} />
                      {item.label}
                    </Link>
                  )
                })}

                {/* More Menu Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-primary transition"
                  >
                    Plus
                    <ChevronDown size={16} className={dropdownOpen ? 'rotate-180' : ''} />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50">
                      <div className="space-y-1">
                        <p className="px-3 py-2 text-xs uppercase tracking-widest text-slate-400">Opérations</p>
                        {menuItemsSecondary.map((item) => {
                          const Icon = item.icon
                          const isActive = location.pathname === item.path
                          return (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={() => setDropdownOpen(false)}
                              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition ${
                                isActive
                                  ? 'bg-primary text-white'
                                  : 'text-slate-600 hover:bg-slate-100'
                              }`}
                            >
                              <Icon size={18} />
                              {item.label}
                            </Link>
                          )
                        })}
                        <div className="border-t border-slate-200 my-2"></div>
                        <p className="px-3 py-2 text-xs uppercase tracking-widest text-slate-400">Avancé</p>
                        {menuItemsAdvanced.map((item) => {
                          const Icon = item.icon
                          const isActive = location.pathname === item.path
                          return (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={() => setDropdownOpen(false)}
                              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition ${
                                isActive
                                  ? 'bg-primary text-white'
                                  : 'text-slate-600 hover:bg-slate-100'
                              }`}
                            >
                              <Icon size={18} />
                              {item.label}
                            </Link>
                          )
                        })}
                        <div className="border-t border-slate-200 my-2"></div>
                        <p className="px-3 py-2 text-xs uppercase tracking-widest text-slate-400">Paramètres</p>
                        {menuItemsSettings.map((item) => {
                          const Icon = item.icon
                          const isActive = location.pathname === item.path
                          return (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={() => setDropdownOpen(false)}
                              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition ${
                                isActive
                                  ? 'bg-primary text-white'
                                  : 'text-slate-600 hover:bg-slate-100'
                              }`}
                            >
                              <Icon size={18} />
                              {item.label}
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </nav>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2">
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="w-64 rounded-full bg-slate-100 border border-transparent focus:border-primary focus:bg-white py-2 pl-10 pr-4 text-sm text-slate-700 outline-none transition"
                  />
                </div>
                <button className="hidden xl:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary/20 text-primary font-medium hover:bg-primary hover:text-white transition">
                  <Coins size={16} />
                  Tarifications
                </button>
                <button className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white font-medium hover:bg-primary-light transition">
                  <Lock size={16} />
                  Mot de passe
                </button>
              </div>
              <button className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 text-slate-500 hover:text-primary hover:border-primary transition">
                <RefreshCw size={18} />
              </button>
              <button className="relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 text-slate-500 hover:text-primary hover:border-primary transition">
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              </button>
              <div className="hidden md:flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary text-white font-semibold flex items-center justify-center">
                  U
                </div>
                <div className="text-xs text-slate-500 leading-tight">
                  <p className="font-semibold text-slate-700">Utilisateur</p>
                  <p>Compte CGF</p>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 text-slate-500 hover:text-primary hover:border-primary transition"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white p-4 space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
            {allMenuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon size={20} />
                  {item.label}
                </Link>
              )
            })}
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 w-full">
              <LogOut size={20} />
              Se déconnecter
            </button>
          </div>
        )}

        {/* Indices BRVM Bar */}
        <div className="border-t border-slate-200 bg-slate-50 px-4 md:px-6 py-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-sm font-semibold text-slate-700">Marché ouvert</span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              {indices.map((indice) => (
                <div
                  key={indice.name}
                  className="flex items-center gap-3 px-3 py-1 rounded-full bg-white border border-slate-200"
                >
                  <span className="text-xs uppercase tracking-widest text-slate-400">{indice.name}</span>
                  <span className="text-sm font-semibold text-primary">{indice.value.toFixed(2)}</span>
                  <span
                    className={`text-xs font-semibold ${
                      indice.change >= 0 ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {indice.change >= 0 ? '+' : ''}
                    {indice.change.toFixed(2)}%
                  </span>
                </div>
              ))}
              <div className="text-xs text-slate-500">
                Valeur totale : <strong className="text-primary">1 112 901 547 FCFA</strong>
              </div>
              <div className="text-xs text-slate-400">
                MAJ : {new Date().toLocaleString('fr-FR', { timeZone: 'GMT' })} GMT
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 overflow-y-auto px-4 md:px-6 py-8 bg-gradient-to-br from-slate-50 via-white to-slate-200">
        <div className="mx-auto max-w-[1440px]">
          <Outlet />
        </div>
      </main>

      {/* Click outside to close dropdown */}
      {dropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setDropdownOpen(false)}
        ></div>
      )}
    </div>
  )
}

export default Layout
