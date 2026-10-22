
import { useMemo, useState } from 'react'
import './RecyclerComparison.css'

// Temporary sample data.
// Backend API ready hone par ise real data se replace karna hai.
const recyclers = [
  {
    id: 1,
    name: 'Green Earth Recycling',
    rates: { Plastic: 18, Paper: 13, Metal: 40, 'E-waste': 90 },
    distanceKm: 1.8,
    pickupMinutes: 20,
    available: true,
    rating: 4.6,
  },
  {
    id: 2,
    name: 'Eco Scrap Centre',
    rates: { Plastic: 20, Paper: 12, Metal: 38, 'E-waste': 100 },
    distanceKm: 3.2,
    pickupMinutes: 35,
    available: true,
    rating: 4.4,
  },
  {
    id: 3,
    name: 'Clean City Recyclers',
    rates: { Plastic: 16, Paper: 15, Metal: 42, 'E-waste': 85 },
    distanceKm: 1.2,
    pickupMinutes: 15,
    available: false,
    rating: 4.3,
  },
]

const materials = ['Plastic', 'Paper', 'Metal', 'E-waste']
const comparisonTranslations = {
  en: {
    kicker: 'SMART RECYCLING',
    title: 'Compare Nearby Recyclers',
    description: 'Compare estimated payment, distance and pickup time before choosing your recycler.',
    material: 'Scrap material',
    weight: 'Weight (kg)',
    sortBy: 'Sort results by',
    highestEarnings: 'Highest earnings',
    nearestFirst: 'Nearest first',
    fastestPickup: 'Fastest pickup',
    demoNote: 'Demo rates and locations only. Actual offers may differ.',
    rating: 'rating (demo)',
    available: 'Available (demo)',
    unavailable: 'Unavailable (demo)',
    ratePerKg: 'Rate per kg',
    estimatedPayment: 'Estimated payment',
    distance: 'Distance',
    pickupEstimate: 'Pickup estimate',
    bestOffer: 'Highest estimated payment',
    chooseRecycler: 'Choose This Recycler',
    recyclerSelected: 'Recycler Selected ✓',
    selectedTitle: 'Recycler selected!',
    selectedFor: 'is selected for your',
    nextStep: 'Next: connect this selection to your pickup booking form.',
  },

  hi: {
    kicker: 'स्मार्ट रीसाइक्लिंग',
    title: 'अपने नज़दीकी रिसाइक्लर की तुलना करें',
    description: 'रिसाइक्लर चुनने से पहले अनुमानित भुगतान, दूरी और पिकअप समय की तुलना करें।',
    material: 'स्क्रैप सामग्री',
    weight: 'वज़न (किलो)',
    sortBy: 'परिणाम क्रमबद्ध करें',
    highestEarnings: 'सबसे ज़्यादा कमाई',
    nearestFirst: 'सबसे नज़दीक पहले',
    fastestPickup: 'सबसे तेज़ पिकअप',
    demoNote: 'ये केवल डेमो दरें और स्थान हैं। वास्तविक ऑफ़र अलग हो सकते हैं।',
    rating: 'रेटिंग (डेमो)',
    available: 'उपलब्ध (डेमो)',
    unavailable: 'अनुपलब्ध (डेमो)',
    ratePerKg: 'प्रति किलो दर',
    estimatedPayment: 'अनुमानित भुगतान',
    distance: 'दूरी',
    pickupEstimate: 'अनुमानित पिकअप समय',
    bestOffer: 'सबसे ज़्यादा अनुमानित भुगतान',
    chooseRecycler: 'यह रिसाइक्लर चुनें',
    recyclerSelected: 'रिसाइक्लर चुना गया ✓',
    selectedTitle: 'रिसाइक्लर चुन लिया गया!',
    selectedFor: 'आपके',
    nextStep: 'अगला चरण: इस चयन को पिकअप बुकिंग फ़ॉर्म से जोड़ें।',
  },

  kn: {
    kicker: 'ಸ್ಮಾರ್ಟ್ ಮರುಬಳಕೆ',
    title: 'ಹತ್ತಿರದ ಮರುಬಳಕೆದಾರರನ್ನು ಹೋಲಿಸಿ',
    description: 'ಮರುಬಳಕೆದಾರರನ್ನು ಆಯ್ಕೆ ಮಾಡುವ ಮೊದಲು ಅಂದಾಜು ಪಾವತಿ, ದೂರ ಮತ್ತು ಪಿಕಪ್ ಸಮಯವನ್ನು ಹೋಲಿಸಿ.',
    material: 'ಸ್ಕ್ರ್ಯಾಪ್ ವಸ್ತು',
    weight: 'ತೂಕ (ಕೆಜಿ)',
    sortBy: 'ಫಲಿತಾಂಶಗಳನ್ನು ವಿಂಗಡಿಸಿ',
    highestEarnings: 'ಅತಿ ಹೆಚ್ಚು ಗಳಿಕೆ',
    nearestFirst: 'ಹತ್ತಿರದವರು ಮೊದಲು',
    fastestPickup: 'ವೇಗವಾದ ಪಿಕಪ್',
    demoNote: 'ಇವು ಡೆಮೊ ದರಗಳು ಮತ್ತು ಸ್ಥಳಗಳು ಮಾತ್ರ. ನೈಜ ಕೊಡುಗೆಗಳು ಬದಲಾಗಬಹುದು.',
    rating: 'ರೇಟಿಂಗ್ (ಡೆಮೊ)',
    available: 'ಲಭ್ಯವಿದೆ (ಡೆಮೊ)',
    unavailable: 'ಲಭ್ಯವಿಲ್ಲ (ಡೆಮೊ)',
    ratePerKg: 'ಪ್ರತಿ ಕೆಜಿಗೆ ದರ',
    estimatedPayment: 'ಅಂದಾಜು ಪಾವತಿ',
    distance: 'ದೂರ',
    pickupEstimate: 'ಅಂದಾಜು ಪಿಕಪ್ ಸಮಯ',
    bestOffer: 'ಅತಿ ಹೆಚ್ಚು ಅಂದಾಜು ಪಾವತಿ',
    chooseRecycler: 'ಈ ಮರುಬಳಕೆದಾರರನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    recyclerSelected: 'ಮರುಬಳಕೆದಾರರನ್ನು ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ ✓',
    selectedTitle: 'ಮರುಬಳಕೆದಾರರನ್ನು ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ!',
    selectedFor: 'ನಿಮ್ಮ',
    nextStep: 'ಮುಂದಿನ ಹಂತ: ಈ ಆಯ್ಕೆಯನ್ನು ಪಿಕಪ್ ಬುಕಿಂಗ್ ಫಾರ್ಮ್‌ಗೆ ಸಂಪರ್ಕಿಸಿ.',
  },
}

function RecyclerComparison({ onSelectRecycler, language = 'en' }) {
  const t = comparisonTranslations[language] || comparisonTranslations.en
  const [material, setMaterial] = useState('Plastic')
  const [weight, setWeight] = useState('5')
  const [selectedRecycler, setSelectedRecycler] = useState(null)
  const [sortBy, setSortBy] = useState('earnings')

  const results = useMemo(() => {
    return recyclers
      .map((recycler) => ({
        ...recycler,
        rate: recycler.rates[material],
        earnings: recycler.rates[material] * Number(weight || 0),
      }))
      .sort((a, b) => {
        if (sortBy === 'distance') {
          return a.distanceKm - b.distanceKm
        }
        if (sortBy === 'time') {
          return a.pickupMinutes - b.pickupMinutes
        }
        return b.earnings - a.earnings
      })
  }, [material, weight, sortBy])

  const availableResults = results.filter((item) => item.available)
  const bestEarnings = availableResults.reduce(
    (best, item) => Math.max(best, item.earnings),
    0
  )

  return (
    <section className="recycler-comparison" id="compare-recyclers">
      <div className="comparison-heading">
  <span className="comparison-kicker">{t.kicker}</span>
  <h2>{t.title}</h2>
  <p>{t.description}</p>
</div>

<div className="comparison-controls">
  <div className="comparison-field">
    <label htmlFor="compareMaterial">{t.material}</label>
    <select
      id="compareMaterial"
      value={material}
      onChange={(event) => setMaterial(event.target.value)}
    >
      {materials.map((item) => (
        <option key={item} value={item}>{item}</option>
      ))}
    </select>
  </div>

  <div className="comparison-field">
    <label htmlFor="compareWeight">{t.weight}</label>
    <input
      id="compareWeight"
      type="number"
      min="0.1"
      step="0.1"
      value={weight}
      onChange={(event) => {
        setWeight(event.target.value)
        setSelectedRecycler(null)
      }}
    />
  </div>

  <div className="comparison-field">
    <label htmlFor="compareSort">{t.sortBy}</label>
    <select
      id="compareSort"
      value={sortBy}
      onChange={(event) => setSortBy(event.target.value)}
    >
      <option value="earnings">{t.highestEarnings}</option>
      <option value="distance">{t.nearestFirst}</option>
      <option value="time">{t.fastestPickup}</option>
    </select>
  </div>
</div>

<p className="comparison-demo-note">{t.demoNote}</p>

      <div className="comparison-list">
        {results.map((recycler) => (
          <article
            className={`comparison-card ${
              selectedRecycler === recycler.id ? 'is-selected' : ''
            }`}
            key={recycler.id}
          >
            <div className="comparison-card-top">
              <div>
                <h3>{recycler.name}</h3>
                <p className="comparison-rating">
                 ★ {recycler.rating} {t.rating}
                </p>
              </div>
              {recycler.available ? (
                <span className="availability available">
                 {t.available}
                </span>
              ) : (
                <span className="availability unavailable">
                 {t.unavailable}
                </span>
              )}
            </div>

            <div className="comparison-stats">
              <div>
                <span>{t.ratePerKg}</span>
                <strong>₹{recycler.rate}</strong>
              </div>

             <div>
                <span>{t.estimatedPayment}</span>
                <strong>₹{recycler.earnings.toFixed(2)}</strong>
              </div>

             <div>
                <span>{t.distance}</span>
                <strong>{recycler.distanceKm} km</strong>
             </div>

             <div>
               <span>{t.pickupEstimate}</span>
               <strong>{recycler.pickupMinutes} min</strong>
              </div>
           </div>

            {recycler.available && recycler.earnings === bestEarnings && (
              <p className="best-offer">{t.bestOffer}</p>
            )}

            <button
              type="button"
              className="choose-recycler-button"
              disabled={!recycler.available || Number(weight) <= 0}
              onClick={() => {
  setSelectedRecycler(recycler.id)

  onSelectRecycler?.({
    id: recycler.id,
    name: recycler.name,
    material,
    weight: Number(weight),
    rate: recycler.rate,
    estimatedPayment: recycler.earnings,
    distanceKm: recycler.distanceKm,
    pickupMinutes: recycler.pickupMinutes,
  })
}}
            >
              {selectedRecycler === recycler.id
                ? t.recyclerSelected
                : t.chooseRecycler}
            </button>
          </article>
        ))}
      </div>

      {selectedRecycler && (
  <div className="recycler-selection-message" role="status">
    <strong>{t.selectedTitle}</strong>

    <p>
      {recyclers.find((item) => item.id === selectedRecycler)?.name}
      {' '}{t.selectedFor} {weight} kg {material}.
    </p>

    <p>
      {t.estimatedPayment}: ₹
      {(
        recyclers.find((item) => item.id === selectedRecycler)
          .rates[material] * Number(weight)
      ).toFixed(2)}
    </p>

    <p>{t.nextStep}</p>
  </div>
)}
    </section>
  )
}

export default RecyclerComparison
