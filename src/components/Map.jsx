import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, Polyline, DistanceMatrixService } from '@react-google-maps/api';
import axios from 'axios';

const Map = (props) => {

    const { isLoaded } = props;

    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);

    const nyabugogo = { lat: -1.939826787816454, lng: 30.0445426438232 };
    const kimironko = { lat: -1.9365670876910166, lng: 30.13020167024439 };
    const stopA = { lat: -1.9355377074007851, lng: 30.060163829002217 };

    const [currentStopIndex, setCurrentStopIndex] = useState(0);



    // Container style
    const containerStyle = {
        width: "100%",
        height: "90vh"
    }


    const markers = [
        {
            name: "Nyabugogo",
            location: {
                lat: -1.939826787816454,
                lng: 30.0445426438232


            }
        },
        {
            name: "StopA",
            location: {
                lat: -1.9355377074007851,
                lng: 30.060163829002217


            }
        },
        {
            name: "StopB",
            location: {
                lat: -1.9358808342336546,
                lng: 30.08024820994666


            }
        },
        {
            name: "Stopc",
            location: {
                lat: -1.9489196023037583,
                lng: 30.092607828989397


            }
        },
        {
            name: "StopD",
            location: {
                lat: -1.9592132952818164,
                lng: 30.106684061788073


            }
        },
        {
            name: "StopE",
            location: {
                lat: -1.9487480402200394,
                lng: 30.126596781356923


            }
        },
        {
            name: "Kimironko",
            location: {
                lat: -1.9365670876910166,
                lng: 30.13020167024439
            }
        },
    ]


    const onLoad = map => {
        (async function () {
            console.log(map)
            const { spherical } = await google.maps.importLibrary("geometry")

            const distance = spherical.computeDistanceBetween(
                new window.google.maps.LatLng(nyabugogo),
                new window.google.maps.LatLng({
                    lat: -1.9365670876910166,
                    lng: 30.13020167024439
                })
            )

            const parsedDistance = Number(distance > 1000 ? distance * 0.001 : distance).toFixed(2)

            setDistance(parsedDistance)
        })()
    }

    const onUnmount = map => {
        console.log('map unloaded:', map)
    }

    return (
        isLoaded && (
            <>
                <div className=" flex items-center justify-center">
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={markers[0].location}

                        zoom={10}
                        options={{
                            fullscreenControl: false,
                            mapTypeControl: false,
                            streetViewControl: false,
                            zoomControl: false,
                        }}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                    >

                        {markers.map((marker) => {
                            return (

                                <div key={marker.name}>

                                    <Marker position={marker.location} />

                                </div>

                            );
                        })}

                        <Polyline
                            path={markers.map(marker => marker.location)}
                            options={{
                                strokeColor: '#0000FF',
                                strokeOpacity: 1.0,
                                strokeWeight: 4,
                            }}
                        />


                    </GoogleMap>


                </div>
                <div className="absolute w-1/4 pt-1 mt-4 text-center top-20 left-2 bg-white p-2 shadow-md md:w-1/4">
                    <div className="pt-5">
                        <h4 className=' text-xl font-semibold'>Nyabugogo- Kimironko</h4>
                        {currentStopIndex < markers.length - 1 ? (
                            <>
                                <p>Next Stop: {markers[currentStopIndex + 1].name}</p>

                            </>
                        ) : (
                            <p>End of the route</p>
                        )}



                        <p>Distance: {distance} Km</p>
                        <p>Duration: {duration} Min</p>

                    </div>
                </div>
            </>



        )
    )
}

export default Map;




