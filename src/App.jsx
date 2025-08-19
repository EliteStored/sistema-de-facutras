import React, { useState } from 'react'
import './App.css'

const BACKEND_URL = 'https://sistema-de-facturas-backend.onrender.com'

function App() {
  const [files, setFiles] = useState([])
  const [excelUrl, setExcelUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files))
    setError('')
    setExcelUrl('')
  }

  const handleUpload = async () => {
    if (!files.length) return
    setLoading(true)
    setError('')
    const formData = new FormData()
    files.forEach((file) => {
      formData.append('files', file)
    })
    try {
      const res = await fetch(`${BACKEND_URL}/upload/`, {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.detail || 'Error en el backend')
      }
      const data = await res.json()
      const excelFile = data.excel_file.split(/[\\/]/).pop()
      setExcelUrl(`${BACKEND_URL}/download/${excelFile}`)
    } catch (err) {
      setError(err.message || 'Error al procesar las facturas')
      setExcelUrl('')
    }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 32 }}>
      <h2>Sistema de Facturas OCR a Excel</h2>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        style={{ marginLeft: 8 }}
      >
        {loading ? 'Procesando...' : 'Subir y convertir'}
      </button>
      {error && (
        <div style={{ color: 'red', marginTop: 16 }}>
          {error}
        </div>
      )}
      {excelUrl && (
        <div style={{ marginTop: 24 }}>
          <a
            href={excelUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Descargar Excel generado
          </a>
        </div>
      )}
    </div>
  )
}

export default App
