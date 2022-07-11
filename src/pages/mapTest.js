import { useState, useEffect } from "react";

import Map from '../components/Map';
import styles from '../../styles/Home.module.scss';


const DEFAULT_CENTER = [37.3387, -121.8853]
const apikey = process.env.IPIFY_API_KEY

const MapTest = () => {
  console.log(apikey)
  const [ip, SetIp] = useState('')
  const [ipData, setIpData] = useState([])
  const [marker, setMarker] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    fetchIpData()
  };

  const MapEffect = ({ useMap }) => {
    const map = useMap();

    useEffect(() => {
      map.flyTo(marker ? marker : DEFAULT_CENTER);
    }, [map])

    return null;
  }

  const fetchIpData = async () => {
    const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=...&ipAddress=${ip}`)
    const data = await res.json()
    setIpData(data)
    setMarker([data.location?.lat, data.location?.lng])
  };


  return (
    <>
      <div className={styles.container}>
        <section className={styles.header}>
          <h1>IP Address Tracker</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="IP"
              value={ip}
              onChange={(e) => SetIp(e.target.value)}
            />
            <button type="submit" onSubmit={handleSubmit}>
              &#8250;
            </button>
          </form>
        </section>

        <section className={styles.data}>
          <div>
            <p>ip address</p>
            <p>{ipData.ip}</p>
          </div>
          <div>
            <p>location</p>
            <p>{ipData.location?.city} {ipData.location?.region} {ipData.location?.country}</p>
          </div>
          <div>
            <p>timezone</p>
            <p>{ipData.location?.timezone}</p>
          </div>
          <div>
            <p>isp</p>
            <p>{ipData.isp}</p>
          </div>
        </section>


        <section>
          <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={12}>
            {({ TileLayer, Marker, useMap, Popup }) => (
              <>
                <MapEffect useMap={useMap} />
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <Marker position={marker ? marker : [0, 0]}>
                  <Popup>
                  <p>lat: {ipData.location?.lat}</p>
                  <p>lng: {ipData.location?.lng}</p>
                  </Popup>
                </Marker>
              </>
            )}
          </Map>
        </section>

      </div>
    </>
  );
};

export default MapTest;