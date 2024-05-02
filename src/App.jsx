import { useState } from 'react'
import { useJsApiLoader } from "@react-google-maps/api"
import { mapOptions } from './components/MapConfiguration'
import Header from './components/Header'
import Map from './components/Map'

// import './App.css'

function App() {

  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: mapOptions.googleMapApiKey,

    

    
  })

  
 

  return (
    <>
      <Header />
      <Map isLoaded={isLoaded} />
    </>
  )
}

export default App
