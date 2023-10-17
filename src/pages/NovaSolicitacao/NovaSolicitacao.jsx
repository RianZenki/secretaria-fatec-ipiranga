import { useState, useEffect } from 'react'

import api from '../../services/api'

export const NovaSolicitacao = () => {

  const [files, setFiles] = useState({})


  const f = () => {
    const f = document.getElementById('file')
    if (f)
      setFiles(f.files.item(0))
  }

  const enviar = (e) => {
    e.preventDefault()
    console.log(files)
    api.post('/solicitacao/arquivo', files)
    .then(response => console.log(response))
  }

  useEffect(() => {
    console.log(files)
  }, [files])

  return (
    <div>
      <form enctype="multipart/form-data">
        <input type="file" id="file" name="file" onChange={f} multiple />
        <button type="button" onClick={enviar}>Enviar</button>
      </form>

      {/* {files.map(file => <p>{file.name}</p>)} */}
    </div>
  )
}