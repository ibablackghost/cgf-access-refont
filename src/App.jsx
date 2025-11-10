import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Main from './pages/Main'
import Marche from './pages/Marche'
import ResMarche from './pages/ResMarche'
import Portefeuille from './pages/Portefeuille'
import Ordres from './pages/Ordres'
import ReleveTitres from './pages/ReleveTitres'
import ReleveEspeces from './pages/ReleveEspeces'
import Alertes from './pages/Alertes'
import Messages from './pages/Messages'
import News from './pages/News'
import AnalyseTechnique from './pages/AnalyseTechnique'
import SousRach from './pages/SousRach'
import Configuration from './pages/Configuration'
import Parametres from './pages/Parametres'
import Compte from './pages/Compte'
import FAQ from './pages/FAQ'
import ManuelUtilisation from './pages/ManuelUtilisation'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="marche" element={<Marche />} />
          <Route path="res-marche" element={<ResMarche />} />
          <Route path="portefeuille" element={<Portefeuille />} />
          <Route path="ordres" element={<Ordres />} />
          <Route path="releve-titres" element={<ReleveTitres />} />
          <Route path="releve-especes" element={<ReleveEspeces />} />
          <Route path="alertes" element={<Alertes />} />
          <Route path="messages" element={<Messages />} />
          <Route path="news" element={<News />} />
          <Route path="analyse-technique" element={<AnalyseTechnique />} />
          <Route path="sous-rach" element={<SousRach />} />
          <Route path="configuration" element={<Configuration />} />
          <Route path="parametres" element={<Parametres />} />
          <Route path="compte" element={<Compte />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="manuel" element={<ManuelUtilisation />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
