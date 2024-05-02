import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';

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
        height: "75vh"
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
   

    useEffect(() => {
        const calculateDistance = async () => {
            const service = new window.google.maps.DistanceMatrixService();
            service.getDistanceMatrix(
                {
                    origins: [nyabugogo],
                    destinations: [stopA],
                    travelMode: 'DRIVING',
                },
                (response, status) => {
                    if (status === 'OK') {
                        setDistance(response.rows[0].elements[0].distance.text);
                        setDuration(response.rows[0].elements[0].duration.text);
                    } else {
                        console.error('Error calculating distance:', status);
                    }
                }
            );
        };
        calculateDistance();
    }, []);
    
    
    

    


    const onLoad = map => {
        console.log('map loaded:', map)
    }

    const onUnmount = map => {
        console.log('map unloaded:', map)
    }

    return (
        isLoaded && (
            <>
                <div className="mt-4 flex items-center justify-center">
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        // center={center}
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
                <div className="absolute w-1/4 text-center top-2 left-2 bg-white p-2 shadow-md">
                    <div className="mt-4 pt-10">
                        <h4 className=' text-xl font-semibold'>Nyabugogo- Kimironko</h4>
                        {currentStopIndex < markers.length - 1 ? (
                        <>
                            <p>Next Stop: {markers[currentStopIndex + 1].name}</p>
                            
                        </>
                    ) : (
                        <p>End of the route</p>
                    )}
                        
                        
                        {/* <p>Distance: {distance}  Duration: {duration}</p> */}
                        {/* <p>Duration: {duration}</p> */}
                        <p>Distance: {distance}</p>
                        <p>Duration: {duration}</p>
                       
                    </div>
                </div>
            </>



        )
    )
}

export default Map;




