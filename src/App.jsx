import React, { useState } from 'react'
import './index.css'

function App() {
  const [files, setFiles] = useState([])
  const [excelUrl, setExcelUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files))
  }

  const handleUpload = async () => {
    if (!files.length) return
    setLoading(true)
    const formData = new FormData()
    files.forEach((file) => {
      formData.append('files', file)
    })
    const res = await fetch('http://localhost:8000/upload/', {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    const excelFile = data.excel_file.split('\\').pop()
    setExcelUrl(`http://localhost:8000/download/${excelFile}`)
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
