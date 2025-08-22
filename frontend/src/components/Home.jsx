import { useState, useEffect } from 'react'
import apiClient from '../api/client'

const Home = function() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await apiClient.get('/home')
        setData(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    checkBackend()
  }, [])

  if (loading) return <div>Loading backend connection...</div>
  if (error) return <div>Error connecting to backend: {error}</div>

  return (
    <div style={{ padding: '20px', background: '#f0f0f0', borderRadius: '8px' }}>
      <h3>✅ Backend Connection Successful</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default Home