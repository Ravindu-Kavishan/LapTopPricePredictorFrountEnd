import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    company: '',
    typename: '',
    cpu_brand: '',
    gpu_brand: '',
    inches: '',
    weight: '',
    touchscreen: false,
    ips: false,
    fullhd: false,
    os: '',
    ram: ''
  })

  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('https://laptoppricepredictorbackend-auafczcjf8ddbvck.centralindia-01.azurewebsites.net/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          inches: parseFloat(formData.inches),
          weight: parseFloat(formData.weight)
        })
      })
      const result = await response.json()
      if (result.prediction) {
        const priceInLKR = result.prediction * 355.49
        setPrediction(priceInLKR)
      }
    } catch (error) {
      console.error('Error:', error)
      setPrediction(null)
    }
    setLoading(false)
  }

  return (
    <div className="app">
      <h1>💻 Laptop Price Predictor</h1>
      <p className="subtitle">Enter your laptop specifications to get an estimated price in LKR</p>
      <form onSubmit={handleSubmit} className="laptop-form">
        <div className="form-group">
          <label>Company:</label>
          <select name="company" value={formData.company} onChange={handleChange} required>
            <option value="">Select Company</option>
            <option value="Dell">Dell</option>
            <option value="Lenovo">Lenovo</option>
            <option value="HP">HP</option>
            <option value="Asus">Asus</option>
            <option value="Acer">Acer</option>
            <option value="MSI">MSI</option>
            <option value="Toshiba">Toshiba</option>
            <option value="Apple">Apple</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Type Name:</label>
          <select name="typename" value={formData.typename} onChange={handleChange} required>
            <option value="">Select Type</option>
            <option value="Notebook">Notebook</option>
            <option value="Gaming">Gaming</option>
            <option value="Ultrabook">Ultrabook</option>
            <option value="2 in 1 Convertible">2 in 1 Convertible</option>
            <option value="Workstation">Workstation</option>
            <option value="Netbook">Netbook</option>
          </select>
        </div>

        <div className="form-group">
          <label>CPU Brand:</label>
          <select name="cpu_brand" value={formData.cpu_brand} onChange={handleChange} required>
            <option value="">Select CPU Brand</option>
            <option value="Intel i7">Intel i7</option>
            <option value="Intel i5">Intel i5</option>
            <option value="Low-end Intel">Low-end Intel</option>
            <option value="Intel i3">Intel i3</option>
            <option value="Other AMD">Other AMD</option>
            <option value="AMD Ryzen">AMD Ryzen</option>
          </select>
        </div>

        <div className="form-group">
          <label>GPU Brand:</label>
          <select name="gpu_brand" value={formData.gpu_brand} onChange={handleChange} required>
            <option value="">Select GPU Brand</option>
            <option value="Intel">Intel</option>
            <option value="Nvidia GeForce">Nvidia GeForce</option>
            <option value="AMD">AMD</option>
            <option value="Nvidia Quadro">Nvidia Quadro</option>
          </select>
        </div>

        <div className="form-group">
          <label>Inches:</label>
          <input
            type="number"
            name="inches"
            value={formData.inches}
            onChange={handleChange}
            step="0.1"
            min="10"
            max="20"
            required
          />
        </div>

        <div className="form-group">
          <label>Weight:</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            step="0.1"
            min="0.5"
            max="10"
            required
          />
        </div>

        <div className="checkbox-group">
          <div className="checkbox-item">
            <input
              type="checkbox"
              id="touchscreen"
              name="touchscreen"
              checked={formData.touchscreen}
              onChange={handleChange}
            />
            <label htmlFor="touchscreen">Touchscreen</label>
          </div>

          <div className="checkbox-item">
            <input
              type="checkbox"
              id="ips"
              name="ips"
              checked={formData.ips}
              onChange={handleChange}
            />
            <label htmlFor="ips">IPS</label>
          </div>

          <div className="checkbox-item">
            <input
              type="checkbox"
              id="fullhd"
              name="fullhd"
              checked={formData.fullhd}
              onChange={handleChange}
            />
            <label htmlFor="fullhd">Full HD</label>
          </div>
        </div>

        <div className="form-group">
          <label>Operating System:</label>
          <select name="os" value={formData.os} onChange={handleChange} required>
            <option value="">Select OS</option>
            <option value="Windows 10">Windows 10</option>
            <option value="No OS">No OS</option>
            <option value="Linux">Linux</option>
            <option value="Windows 7">Windows 7</option>
            <option value="Chrome OS">Chrome OS</option>
            <option value="macOS">macOS</option>
            <option value="Android">Android</option>
          </select>
        </div>

        <div className="form-group">
          <label>RAM (GB):</label>
          <select name="ram" value={formData.ram} onChange={handleChange} required>
            <option value="">Select RAM</option>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="32">32</option>
            <option value="64">64</option>
          </select>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict Price'}
        </button>
      </form>
      
      {prediction && (
        <div className="prediction-result">
          <h2>Predicted Price</h2>
          <p className="price">LKR {prediction.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
        </div>
      )}
    </div>
  )
}

export default App