export async function fetchMarketSnapshot({ signal } = {}) {
  const controller = signal ? null : new AbortController()
  const fetchSignal = signal || controller.signal
  const timeoutId = controller ? setTimeout(() => controller.abort(), 15000) : null

  try {
    const res = await fetch('http://192.168.100.2/cgftradeserver/Service.svc/GetMarketSnapshot', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal: fetchSignal,
    })

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`)
    }

    return await res.json()
  } finally {
    if (timeoutId) clearTimeout(timeoutId)
  }
}

export function mapIndices(indices = []) {
  return indices.map((i) => ({
    name: i.Nom,
    code: (i.Titre || '').toUpperCase(),
    value: Number(i.prix) || 0,
    change: Number(i.var) || 0,
  }))
}

export function buildChartFromGraph(graphArray = []) {
  if (!Array.isArray(graphArray)) return []
  return graphArray.map((pt) => ({
    date: pt.datej,
    valeur: Number(pt.prix) || 0,
  }))
}

export function computeTopFromActions(actions = []) {
  const mapped = actions.map((a) => ({
    ticker: (a.Symbol || a.Nom || '').trim(),
    nom: a.Nom,
    coursCloture: Number(a.coursCloture ?? a.coursJour ?? a.coursVeille) || 0,
    variationP: Number(a.variationP) || 0,
    volume: Number(a.volume) || 0,
  }))

  const hausse = [...mapped].sort((a, b) => b.variationP - a.variationP).slice(0, 5)
  const baisse = [...mapped].sort((a, b) => a.variationP - b.variationP).slice(0, 5)
  const volumes = [...mapped].sort((a, b) => b.volume - a.volume).slice(0, 5)

  return {
    topHausse: hausse.map((x) => ({ ticker: x.ticker, cours: x.coursCloture, change: x.variationP })),
    topBaisse: baisse.map((x) => ({ ticker: x.ticker, cours: x.coursCloture, change: x.variationP })),
    meilleursVolumes: volumes.map((x) => ({ ticker: x.ticker, volume: x.volume })),
  }
}

