import { useState } from 'react'
import './App.css'

function App() {
  const [material, setMaterial] = useState('Plastic')
  const [weight, setWeight] = useState(1)
  const [scrapItems, setScrapItems] = useState([
  { id: 1, material: 'Plastic', weight: 1 },
])
  const [pickupMessage, setPickupMessage] = useState('')
  const [pickupDetails, setPickupDetails] = useState(null)
  const [pickupRequests, setPickupRequests] = useState([])
  const [statusFilter, setStatusFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const rates = {
    Plastic: 15,
    Paper: 12,
    Metal: 35,
    'E-waste': 80,
  }
  const totalValue = scrapItems.reduce((total, item) => {
  return total + rates[item.material] * Number(item.weight)
}, 0)


const filteredRequests = pickupRequests.filter((request) => {
  const matchesStatus =
    statusFilter === 'All' || request.status === statusFilter

  const matchesSearch =
    request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(request.id).includes(searchTerm)

  return matchesStatus && matchesSearch
})




const addScrapItem = () => {
  setScrapItems((items) => [
    ...items,
    {
      id: Date.now(),
      material: 'Plastic',
      weight: 1,
    },
  ])
}


const updateScrapItem = (id, field, value) => {
  setScrapItems((items) =>
    items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    )
  )
}

const removeScrapItem = (id) => {
  setScrapItems((items) => items.filter((item) => item.id !== id))
}

  const estimate = rates[material] * Number(weight)
  const [photo, setPhoto] = useState(null)
  const [identifiedMaterial, setIdentifiedMaterial] = useState('')

  const handlePhotoChange = (event) => {
  const selectedFile = event.target.files[0]

  if (selectedFile) {
    setPhoto(URL.createObjectURL(selectedFile))
  }
}

  return (
    <div className="app">
      
<header className="navbar">
  <a href="#home" className="nav-logo">
    ♻️ Kabadiwala Connect
  </a>

  <div className="nav-links">
    <a href="#home">Home</a>
    <a href="#estimator">Scrap Estimator</a>
    <a href="#photo-upload">Photo Upload</a>
    <a href="#pickup">Request Pickup</a>
  </div>
</header>


      <main className="container">
        <section className="hero" id="home">
          <p className="tagline">A cleaner tomorrow starts today</p>
          <h1>Turn Your Waste Into Worth.</h1>
          <p>
            Connect with verified recyclers and give recyclable
            materials a new life.
          </p>
          <a href="#estimator" className="button">
            Calculate My Scrap Value
          </a>
        </section>

        <section className="features">
          <article className="card">
            <div className="emoji">📸</div>
            <h3>Identify Your Waste</h3>
            <p>Choose a material and explore recycling options.</p>
          </article>

          <article className="card">
            <div className="emoji">💰</div>
            <h3>Estimate Earnings</h3>
            <p>Get an approximate value for your recyclable items.</p>
          </article>

          <article className="card">
            <div className="emoji">🚚</div>
            <h3>Find a Recycler</h3>
            <p>Prepare your scrap for a convenient pickup.</p>
          </article>
        </section>

        <section className="photo-upload" id="photo-upload">
  <h2>📸 Upload Your Waste Photo</h2>
  <p>Select a photo of the scrap you want to recycle.</p>

  <input
    type="file"
    accept="image/*"
    onChange={handlePhotoChange}
  />

  
{photo && (
  <div className="photo-preview">
    <img src={photo} alt="Selected waste" />

    <label htmlFor="identifiedMaterial">
      Select Identified Material
    </label>

    <select
      id="identifiedMaterial"
      value={identifiedMaterial}
      onChange={(event) => setIdentifiedMaterial(event.target.value)}
    >
      <option value="">Choose material</option>
      <option value="Plastic">Plastic</option>
      <option value="Paper">Paper</option>
      <option value="Metal">Metal</option>
      <option value="E-waste">E-waste</option>
    </select>

    <button
      type="button"
      disabled={!identifiedMaterial}
      onClick={() => {
        addScrapItem()
        setScrapItems((items) => {
          const updatedItems = [...items]
          const newItem = updatedItems[updatedItems.length - 1]
          return updatedItems.map((item) =>
            item.id === newItem.id
              ? { ...item, material: identifiedMaterial }
              : item
          )
        })
        document.getElementById('estimator')?.scrollIntoView({
          behavior: 'smooth',
        })
      }}
    >
      Add Identified Material to Estimator
    </button>
  </div>
)}

</section>
        
<section className="estimator" id="estimator">
  <h2>Advanced Scrap Value Estimator</h2>
  <p>Add different scrap materials to calculate your total earnings.</p>

  {scrapItems.map((item) => (
    <div className="scrap-item" key={item.id}>
      <label>Material type</label>
      <select
        value={item.material}
        onChange={(event) =>
          updateScrapItem(item.id, 'material', event.target.value)
        }
      >
        <option value="Plastic">Plastic — ₹15/kg</option>
        <option value="Paper">Paper — ₹12/kg</option>
        <option value="Metal">Metal — ₹35/kg</option>
        <option value="E-waste">E-waste — ₹80/kg</option>
      </select>

      <label>Weight (kg)</label>
      <input
        type="number"
        min="0.1"
        step="0.1"
        value={item.weight}
        onChange={(event) =>
          updateScrapItem(item.id, 'weight', event.target.value)
        }
      />

      <p>
        Item value: ₹
        {(rates[item.material] * Math.max(0, Number(item.weight) || 0)).toFixed(2)}
      </p>

      <button type="button" onClick={() => removeScrapItem(item.id)}>
        Remove item
      </button>
    </div>
  ))}

  <button type="button" onClick={addScrapItem}>
    + Add Another Material
  </button>

  <div className="result">
    <p>Total Estimated Value</p>
    <h3>₹{totalValue.toFixed(2)}</h3>
    <small>Demo rates only. Actual prices may vary.</small>
  </div>
</section>


<section className="pickup-form" id="pickup">
  <h2>🚚 Request Scrap Pickup</h2>
  <p>Schedule a convenient pickup for your recyclable waste.</p>

  <form
    
onSubmit={(event) => {
  event.preventDefault()

  const newRequest = {
  id: Date.now(),
  name: event.target.customerName.value,
  phone: event.target.customerPhone.value,
  address: event.target.customerAddress.value,
  date: event.target.pickupDate.value,
  status: 'Pending',
}

setPickupRequests((requests) => [...requests, newRequest])
setPickupDetails(newRequest)

  setPickupMessage('✅ Your pickup request has been submitted successfully!')
  event.target.reset()
}}

  >
    <label htmlFor="customerName">Your Name</label>
    <input
      id="customerName"
      type="text"
      placeholder="Enter your full name"
      required
    />

    <label htmlFor="customerPhone">Phone Number</label>
    <input
      id="customerPhone"
      type="tel"
      placeholder="Enter your phone number"
      pattern="[0-9]{10}"
      title="Please enter a 10-digit phone number"
      required
    />

    <label htmlFor="customerAddress">Pickup Address</label>
    <textarea
      id="customerAddress"
      placeholder="Enter your full pickup address"
      rows="3"
      required
    />

    <label htmlFor="pickupDate">Preferred Pickup Date</label>
    <input
      id="pickupDate"
      type="date"
      min={new Date().toLocaleDateString('en-CA')}
      required
    />

    
    <button type="submit">Submit Pickup Request</button>
  </form>

  {pickupMessage && (
    <p className="pickup-success">
      {pickupMessage}
    </p>
  )}
</section>

{pickupDetails && (
  <section className="pickup-confirmation">
    <h2>🎉 Pickup Request Confirmation</h2>
    <p>{pickupMessage}</p>

    <div className="confirmation-details">
      <p><strong>Name:</strong> {pickupDetails.name}</p>
      <p><strong>Phone:</strong> {pickupDetails.phone}</p>
      <p><strong>Address:</strong> {pickupDetails.address}</p>
      <p><strong>Pickup Date:</strong> {pickupDetails.date}</p>
    </div>
  </section>
)}



<section className="request-dashboard">
  <h2>📊 Pickup Request Dashboard</h2>
  <p>Track all your scrap pickup requests at a glance.</p>

  <div className="dashboard-cards">
    <div className="dashboard-card total-card">
      <span>Total Requests</span>
      <h3>{pickupRequests.length}</h3>
    </div>

    <div className="dashboard-card pending-card">
      <span>Pending Requests</span>
      <h3>
        {pickupRequests.filter(
          (request) => request.status === 'Pending'
        ).length}
      </h3>
    </div>

    
<div className="dashboard-card cancelled-card">
  <span>Cancelled Requests</span>
  <h3>
    {pickupRequests.filter(
      (request) => request.status === 'Cancelled'
    ).length}
  </h3>
</div>

<div className="dashboard-card completed-card">
  <span>Completed Requests</span>
  <h3>
    {pickupRequests.filter(
      (request) => request.status === 'Completed'
    ).length}
  </h3>
</div>

  </div>
</section>


        <section className="my-requests">
          <h2>📋 My Pickup Requests</h2>
          <p>Track the status of your submitted pickup requests.</p>
      
<div className="request-search">
  <label htmlFor="requestSearch">Search Requests:</label>
  <input
    id="requestSearch"
    type="text"
    placeholder="Search by name or request ID..."
    value={searchTerm}
    onChange={(event) => setSearchTerm(event.target.value)}
  />
</div>
    
<div className="request-filters">
  <label htmlFor="statusFilter">Filter by Status:</label>
  <select
    id="statusFilter"
    value={statusFilter}
    onChange={(event) => setStatusFilter(event.target.value)}
  >
    <option value="All">All Requests</option>
    <option value="Pending">Pending</option>
    <option value="Cancelled">Cancelled</option>
    <option value="Completed">Completed</option>
  </select>
</div>


          {filteredRequests.length === 0 ? (
            <p>You have not submitted any pickup requests yet.</p>
          ) : (
            filteredRequests.map((request) => (
              <div className="request-card" key={request.id}>
                <h3>Pickup Request #{request.id}</h3>
                <p><strong>Name:</strong> {request.name}</p>
                <p><strong>Pickup Date:</strong> {request.date}</p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span className="pending-status">{request.status}</span>
                </p>
                {request.status === 'Pending' && (
  <button
    type="button"
    className="cancel-request"
    onClick={() => {
      setPickupRequests((requests) =>
        requests.map((item) =>
          item.id === request.id
            ? { ...item, status: 'Cancelled' }
            : item
        )
      )
    }}
  >
    Cancel Request
  </button>
)}

{request.status === 'Pending' && (
  <button
    type="button"
    className="complete-request"
    onClick={() => {
      setPickupRequests((requests) =>
        requests.map((item) =>
          item.id === request.id
            ? { ...item, status: 'Completed' }
            : item
        )
      )
    }}
  >
    ✓ Mark as Completed
  </button>
)}

              </div>
            ))
          )}
        </section>


<section className="recyclers-section" id="recyclers">
  <h2>♻️ Find Nearby Recyclers</h2>
  <p>Explore recycling partners who accept different types of scrap.</p>

  <div className="recycler-grid">
    <div className="recycler-card">
      <h3>Green Earth Recycling</h3>
      <p><strong>Materials:</strong> Plastic, Paper, Metal</p>
      <p><strong>Location:</strong> Sample Location 1</p>
      <p><strong>Contact:</strong> 00000 00001</p>
      <span className="recycler-note">Demo listing</span>
    </div>

    <div className="recycler-card">
      <h3>Eco Scrap Centre</h3>
      <p><strong>Materials:</strong> Metal, E-waste</p>
      <p><strong>Location:</strong> Sample Location 2</p>
      <p><strong>Contact:</strong> 00000 00002</p>
      <span className="recycler-note">Demo listing</span>
    </div>

    <div className="recycler-card">
      <h3>Clean City Recyclers</h3>
      <p><strong>Materials:</strong> Paper, Plastic, E-waste</p>
      <p><strong>Location:</strong> Sample Location 3</p>
      <p><strong>Contact:</strong> 00000 00003</p>
      <span className="recycler-note">Demo listing</span>
    </div>
  </div>
</section>

        <footer>
          <p>♻️ Kabadiwala Connect — Waste less, recycle more.</p>
        </footer>
      </main>
    </div>
  )
}

export default App