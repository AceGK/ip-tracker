import { useEffect, useState } from "react"
import Image from 'next/image'


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
      })
  }, [])

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

  const MapEffect = ({ useMap }) => {
    const map = useMap();

    useEffect(() => {
      map.setView(marker);
    }, [map])

    return null;
  }

  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <h1>IP Address Tracker</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="search-text"
            value={input}
            placeholder="Search any IP address or domain"
            onChange={(e) => setInput(e.target.value)}
            required
          />
          <button type="submit" className="submitBtn" >
            <Image src="/icon-arrow.svg" height={25} width={25} />
          </button>
        </form> 
      </section>
    
      <section className={styles.info}>
          <div>
            <p>ip address</p>
            <p>{info.ip}</p>
          </div>
          <div>
            <p>location</p>
            <p>{info.location?.city}, {info.location?.region} {info.location?.postalCode}</p>
          </div>
          <div>
            <p>timezone</p>
            <p>UTC {info.location?.timezone}</p>
          </div>
          <div>
            <p>isp</p>
            <p>{info.isp}</p>
          </div>
        </section>

      <Map className={styles.homeMap} center={marker} zoom={12}>
        {({ TileLayer, Marker, useMap, Popup }) => (
          <>
            <MapEffect useMap={useMap} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <Marker position={marker}>
              <Popup>
              <p>lat: {info.location?.lat}</p>
              <p>lng: {info.location?.lng}</p>
              </Popup>
            </Marker>
          </>
        )}
      </Map>

    </div>
  );
}

export default Home;