import { useState } from 'react'
import axios from 'axios'

export default function SearchPhotos() {
  const [photos, setPhoto] = useState('')
  const [clientId, setClientId] = useState('')
  const [results, setResults] = useState([])

  function token() {
    setClientId('WgxXiRcaR2Uj6rxlWx_evMRQX2_2R6IM0Z6H9BuAwvw')
  }
  function handleChange(event) {
    setPhoto(event.target.value)
    token()
  }

  function handleSubmit(event) {
    event.preventDefault()
    const url = `https://api.unsplash.com/search/photos?per_page=30&query=${photos}&client_id=${clientId}`

    axios.get(url).then((res) => {
      setResults(res.data.results)
    })
  }

  return (
    <>
      <form className='form'>
        <label className='label' htmlFor='query' />
        <input
          type='text'
          name='query'
          className='input'
          placeholder={`Ex: Casa`}
          onChange={handleChange}
        />
        <button onClick={handleSubmit} type='submit' className='button'>
          Pesquisar
        </button>
      </form>
      <div className='card-list'>
        {results.map((pic) => (
          <div className='card' key={pic.id}>
            <img
              onClick={() => {
                window.open(pic.links.download + '&force=true')
              }}
              className='card--image'
              alt={pic.alt_description}
              src={pic.urls.full}
              width='50%'
              height='50%'
            />
          </div>
        ))}
      </div>
    </>
  )
}
