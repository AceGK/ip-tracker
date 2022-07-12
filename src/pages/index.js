import { useEffect, useState } from "react"

import Map from '../components/Map';
import styles from '../../styles/Home.module.scss';

const Home = () => {
  const [input, setInput] = useState('')
  const [info, setInfo] = useState([])
  const [marker, setMarker] = useState([1, 1])

  // fetch initial IP 
  useEffect(() => {
    fetch(`https://api.ipify.org?format=json`)
    .then((res) => res.json())
      .then((data) => {
        input = data.ip
        fetchIp()
        // setInput('')
      })
  }, [])

  // fetch initial IP 
  // useEffect(() => {
  //   input = "8.8.8.8"
  //   fetchIp(input)
  // }, [])

  const fetchIp = async () => {
    const response = await fetch(`/api/ip/${input}`)
    const data = await response.json()
    setInfo(data)
    setMarker([data.location.lat, data.location.lng])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchIp()
    setInput('')
  };

  // add map effect, setview to marker's location
  const MapEffect = ({ useMap }) => {
    const map = useMap();

    useEffect(() => {
      map.setView(marker);
    }, [map])

    return null;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search-text"
          value={input}
          placeholder="Search any IP address or domain"
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <button type="submit">
          Submit
        </button>
      </form>

      <p>{info.ip}</p>
      <p>{info.location?.city}</p>
      <p>{info.location?.region}</p>
      <p>{info.location?.country}</p>
      <p>{info.location?.timezone}</p>
      <p>{info.isp}</p>


      <Map className={styles.homeMap} center={marker} zoom={12}>
        {({ TileLayer, Marker, useMap }) => (
          <>
            <MapEffect useMap={useMap} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <Marker position={marker}>

            </Marker>
          </>
        )}
      </Map>

    </>
  );
}

export default Home;