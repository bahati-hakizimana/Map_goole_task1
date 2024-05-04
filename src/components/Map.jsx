
import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';

const Map = (props) => {

    const { isLoaded } = props;
    const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [estimatedTime, setEstimatedTime] = useState(null);
    const [averageSpeed] = useState(30); // 30 km/h

    const nyabugogo = { lat: -1.939826787816454, lng: 30.0445426438232 };
    const kimironko = { lat: -1.9365670876910166, lng: 30.13020167024439 };

    const markers = [
        { name: "Nyabugogo", location: nyabugogo },
        { name: "StopA", location: { lat: -1.9355377074007851, lng: 30.060163829002217 } },
        { name: "StopB", location: { lat: -1.9358808342336546, lng: 30.08024820994666 } },
        { name: "StopC", location: { lat: -1.9489196023037583, lng: 30.092607828989397 } },
        { name: "StopD", location: { lat: -1.9592132952818164, lng: 30.106684061788073 } },
        { name: "StopE", location: { lat: -1.9487480402200394, lng: 30.126596781356923 } },
        { name: "Kimironko", location: kimironko }
    ];

    useEffect(() => {
        const storedCurrentLocationIndex = localStorage.getItem('currentLocationIndex');
        if (storedCurrentLocationIndex) {
            setCurrentLocationIndex(parseInt(storedCurrentLocationIndex));
        }

        const storedEstimatedTime = localStorage.getItem('estimatedTime');
        if (storedEstimatedTime) {
            setEstimatedTime(JSON.parse(storedEstimatedTime));
        }

        (async function () {
            const { spherical } = await window.google.maps.importLibrary("geometry");

            const estimatedTimes = markers.map((marker, index) => {
                if (index === 0) {
                    return 0;
                }

                const distanceToStop = spherical.computeDistanceBetween(
                    new window.google.maps.LatLng(markers[index - 1].location),
                    new window.google.maps.LatLng(marker.location)
                );
                const estimatedTimeToStop = distanceToStop / (averageSpeed * 1000 / 3600);

                return Math.round(estimatedTimeToStop / 60);
            });

            setEstimatedTime(estimatedTimes);
            localStorage.setItem('estimatedTime', JSON.stringify(estimatedTimes));
        })()

    }, []);

    useEffect(() => {
        if (currentLocationIndex < markers.length) {
            setCurrentLocation(markers[currentLocationIndex].location);
            localStorage.setItem('currentLocationIndex', currentLocationIndex);
        } else {
            setCurrentLocation(markers[0].location);
            setCurrentLocationIndex(0);
        }
    }, [currentLocationIndex]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentLocationIndex < markers.length - 1) {
                setCurrentLocationIndex(currentLocationIndex + 1);
            } else {
                setCurrentLocation(markers[markers.length - 1].location);
                setCurrentLocationIndex(markers.length);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [currentLocationIndex]);

    const containerStyle = {
        width: "100%",
        height: "90vh"
    };

    return (
        isLoaded && (
            <div className="flex items-center justify-center">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={nyabugogo}

                    options={{
                        zoomControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false
                    }}
                    zoom={12}
                >
                    {currentLocation && <Marker position={currentLocation} />}

                    {markers.map((marker) => (
                        <Marker key={marker.name} position={marker.location} />
                    ))}

                    <Polyline
                        path={markers.map(marker => marker.location)}
                        options={{
                            strokeColor: '#0000FF',
                            strokeOpacity: 1.0,
                            strokeWeight: 4,
                        }}
                    />

                </GoogleMap>

                <div className="absolute w-1/4 pt-1 mt-4 text-center top-20 left-2 bg-white p-2 shadow-md md:w-1/4">
                    <div className="pt-5">
                        <h4 className='text-xl font-semibold'>Nyabugogo- Kimironko</h4>
                        {estimatedTime && (
                            <>
                                {currentLocationIndex < markers.length - 1 ? (
                                    <>
                                        <p>Next Stop: {markers[currentLocationIndex + 1]?.name}</p>
                                        <p>Distance: {estimatedTime[currentLocationIndex]} Km</p>
                                        <p>Duration: {estimatedTime[currentLocationIndex + 1]} Min</p>
                                    </>
                                ) : (
                                    <p>End of the route</p>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        )
    )
}

export default Map;

//End of Updated Logic