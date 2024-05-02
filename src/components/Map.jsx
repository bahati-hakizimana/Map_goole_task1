import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const Map = (props) => {

    // const googleMapRef = useRef(null);

    const { isLoaded } = props;

    const [distances, setDistances] = useState([]);
    const [durations, setDurations] = useState([]);

    // Container style
    const containerStyle = {
        width: "90vw",
        height: "75vh"
    }

    // const center = {
    //     lat: -1.939826787816454,
    //     lng: 30.0445426438232

    // }

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
        const calculateDistances = async () => {
            const results = [];
            for (let i = 0; i < markers.length - 1; i++) {
                const origin = markers[i].location;
                const destination = markers[i + 1].location;
                const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&key=${process.env.REACT_APP_MAPS_API_KEY}`);
                const distance = response.data.rows[0].elements[0].distance.text;
                const duration = response.data.rows[0].elements[0].duration.text;
                results.push({ distance, duration });
            }
            setDistances(results.map(result => result.distance));
            setDurations(results.map(result => result.duration));
        };
        calculateDistances();
    }, []);;

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
                       



                    </GoogleMap>


                </div>
                <div className="absolute w-1/6 text-center top-2 left-2 bg-white p-2 shadow-md">
                    <div className="mt-4 pt-10">
                        <h3>Next Stop: </h3>
                        {distances.map((distance, index) => (
                            <div key={index}>
                                <p>Distance: {distance}</p>
                                <p>Duration: {durations[index]}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </>



        )
    )
}

export default Map;




