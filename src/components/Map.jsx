// import React, { useState, useEffect, useRef } from 'react';
// import { GoogleMap, Marker, Polyline, DistanceMatrixService } from '@react-google-maps/api';
// import axios from 'axios';

// const Map = (props) => {

//     const { isLoaded } = props;

//     // const [distance, setDistance] = useState(null);
//     // const [duration, setDuration] = useState(null);
//     const [currentLocation, setCurrentLocation] = useState(null);
//     const [estimatedTime, setEstimatedTime] = useState(null);
//     const [averageSpeed] = useState(30); // Assuming an average speed of 30 km/h



//     const nyabugogo = { lat: -1.939826787816454, lng: 30.0445426438232 };
//     const kimironko = { lat: -1.9365670876910166, lng: 30.13020167024439 };
//     const stopA = { lat: -1.9355377074007851, lng: 30.060163829002217 };

//     const [currentStopIndex, setCurrentStopIndex] = useState(0);



//     // Container style
//     const containerStyle = {
//         width: "100%",
//         height: "90vh"
//     }


//     const markers = [
//         {
//             name: "Nyabugogo",
//             location: {
//                 lat: -1.939826787816454,
//                 lng: 30.0445426438232


//             }
//         },
//         {
//             name: "StopA",
//             location: {
//                 lat: -1.9355377074007851,
//                 lng: 30.060163829002217


//             }
//         },
//         {
//             name: "StopB",
//             location: {
//                 lat: -1.9358808342336546,
//                 lng: 30.08024820994666


//             }
//         },
//         {
//             name: "Stopc",
//             location: {
//                 lat: -1.9489196023037583,
//                 lng: 30.092607828989397


//             }
//         },
//         {
//             name: "StopD",
//             location: {
//                 lat: -1.9592132952818164,
//                 lng: 30.106684061788073


//             }
//         },
//         {
//             name: "StopE",
//             location: {
//                 lat: -1.9487480402200394,
//                 lng: 30.126596781356923


//             }
//         },
//         {
//             name: "Kimironko",
//             location: {
//                 lat: -1.9365670876910166,
//                 lng: 30.13020167024439
//             }
//         },
//     ]


//     // const onLoad = map => {
//     //     (async function () {
//     //         console.log(map)
//     //         const { spherical } = await google.maps.importLibrary("geometry")

//     //         const distance = spherical.computeDistanceBetween(
//     //             new window.google.maps.LatLng(nyabugogo),
//     //             new window.google.maps.LatLng({
//     //                 lat: -1.9365670876910166,
//     //                 lng: 30.13020167024439
//     //             })
//     //         )

//     //         const parsedDistance = Number(distance > 1000 ? distance * 0.001 : distance).toFixed(2)

//     //         setDistance(parsedDistance)
//     //     })()
//     // }

//     //starting of onload Function

//     const onLoad = map => {
//         (async function () {
//             console.log(map)
//             const { spherical } = await google.maps.importLibrary("geometry")

//             let totalDistance = 0;

//             for (let i = 0; i < markers.length - 1; i++) {
//                 const distance = spherical.computeDistanceBetween(
//                     new window.google.maps.LatLng(markers[i].location),
//                     new window.google.maps.LatLng(markers[i + 1].location)
//                 );
//                 totalDistance += distance;
//             }

//             const parsedDistance = Number(totalDistance > 1000 ? totalDistance * 0.001 : totalDistance).toFixed(2)

//             const estimatedTimes = markers.map((marker, index) => {
//                 if (index === 0) {
//                     return 0; // No estimated time for the starting point
//                 }

//                 const distanceToStop = spherical.computeDistanceBetween(
//                     new window.google.maps.LatLng(markers[index - 1].location),
//                     new window.google.maps.LatLng(marker.location)
//                 );
//                 const estimatedTimeToStop = distanceToStop / (averageSpeed * 1000 / 3600); // Convert speed to m/s

//                 return Math.round(estimatedTimeToStop / 60); // Convert seconds to minutes
//             });

//             setEstimatedTime(estimatedTimes);
//         })()
//     }


//     //End of onload Function


//     //Starting useEffect Function

//     useEffect(() => {
//         const watchId = navigator.geolocation.watchPosition(
//             (position) => {
//                 setCurrentLocation({
//                     lat: position.coords.latitude,
//                     lng: position.coords.longitude,
//                 });

//                 const { spherical } = google.maps

//                 const estimatedTimes = markers.map((marker, index) => {
//                     if (index === 0) {
//                         return 0; // No estimated time for the starting point
//                     }

//                     const distanceToStop = spherical.computeDistanceBetween(
//                         new window.google.maps.LatLng(markers[index - 1].location),
//                         new window.google.maps.LatLng(marker.location)
//                     );
//                     const estimatedTimeToStop = distanceToStop / (averageSpeed * 1000 / 3600); // Convert speed to m/s

//                     return Math.round(estimatedTimeToStop / 60); // Convert seconds to minutes
//                 });

//                 setEstimatedTime(estimatedTimes);
//             },
//             (error) => {
//                 console.error(error);
//             }
//         );

//         return () => {
//             navigator.geolocation.clearWatch(watchId);
//         };
//     }, []);


//     //End of useEffect Function

//     const onUnmount = map => {
//         console.log('map unloaded:', map)
//     }

//     return (
//         isLoaded && (
//             <>
//                 <div className=" flex items-center justify-center">
//                     <GoogleMap
//                         mapContainerStyle={containerStyle}
//                         center={markers[0].location}

//                         zoom={10}
//                         options={{
//                             fullscreenControl: false,
//                             mapTypeControl: false,
//                             streetViewControl: false,
//                             zoomControl: false,
//                         }}
//                         onLoad={onLoad}
//                         onUnmount={onUnmount}
//                     >

//                         {markers.map((marker) => {
//                             return (

//                                 <div key={marker.name}>

//                                     <Marker position={marker.location} />

//                                 </div>

//                             );
//                         })}

//                         <Polyline
//                             path={markers.map(marker => marker.location)}
//                             options={{
//                                 strokeColor: '#0000FF',
//                                 strokeOpacity: 1.0,
//                                 strokeWeight: 4,
//                             }}
//                         />


//                     </GoogleMap>


//                 </div>
//                 <div className="absolute w-1/4 pt-1 mt-4 text-center top-20 left-2 bg-white p-2 shadow-md md:w-1/4">
//                     <div className="pt-5">
//                         <h4 className=' text-xl font-semibold'>Nyabugogo- Kimironko</h4>
//                         {currentStopIndex < markers.length - 1 ? (
//                             <>
//                                 <p>Next Stop: {markers[currentStopIndex + 1].name}</p>

//                             </>
//                         ) : (
//                             <p>End of the route</p>
//                         )}



//                         {/* <p>Distance: {distance} Km</p>
//                         <p>Duration: {duration} Min</p> */}

//                         <p>Next Stop: {markers[currentStopIndex + 1].name}</p>
//                         <p>Distance: {estimatedDistance} Km</p>
//                         <p>Duration: {estimatedTime[currentStopIndex + 1]} Min</p>

//                     </div>
//                 </div>
//             </>



//         )
//     )
// }

// export default Map;












// import React, { useState, useEffect } from 'react';
// import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';

// const Map = (props) => {

//     const { isLoaded } = props;
//     const [currentLocation, setCurrentLocation] = useState(null);
//     const [estimatedTime, setEstimatedTime] = useState(null);
//     const [averageSpeed] = useState(30); // Assuming an average speed of 30 km/h

//     const nyabugogo = { lat: -1.939826787816454, lng: 30.0445426438232 };
//     const kimironko = { lat: -1.9365670876910166, lng: 30.13020167024439 };

//     const markers = [
//         { name: "Nyabugogo", location: nyabugogo },
//         { name: "StopA", location: { lat: -1.9355377074007851, lng: 30.060163829002217 } },
//         { name: "StopB", location: { lat: -1.9358808342336546, lng: 30.08024820994666 } },
//         { name: "StopC", location: { lat: -1.9489196023037583, lng: 30.092607828989397 } },
//         { name: "StopD", location: { lat: -1.9592132952818164, lng: 30.106684061788073 } },
//         { name: "StopE", location: { lat: -1.9487480402200394, lng: 30.126596781356923 } },
//         { name: "Kimironko", location: kimironko }
//     ];

//     useEffect(() => {
//         const watchId = navigator.geolocation.watchPosition(
//             (position) => {
//                 setCurrentLocation({
//                     lat: position.coords.latitude,
//                     lng: position.coords.longitude,
//                 });
//             },
//             (error) => {
//                 console.error('Error getting location:', error);
//             }
//         );

//         return () => {
//             navigator.geolocation.clearWatch(watchId);
//         };
//     }, []);

//     useEffect(() => {
//         if (!currentLocation) return;
    
//         const { geometry } = window.google.maps;
//         const spherical = new geometry.spherical.Spherical()
    
//         const estimatedTimes = markers.map((marker, index) => {
//             if (index === 0) {
//                 return 0; // No estimated time for the starting point
//             }
    
//             const distanceToStop = spherical.computeDistanceBetween(
//                 new window.google.maps.LatLng(markers[index - 1].location),
//                 new window.google.maps.LatLng(marker.location)
//             );
//             const estimatedTimeToStop = distanceToStop / (averageSpeed * 1000 / 3600); // Convert speed to m/s
    
//             return Math.round(estimatedTimeToStop / 60); // Convert seconds to minutes
//         });
    
//         setEstimatedTime(estimatedTimes);
    
//     }, [currentLocation]);
    

//     const containerStyle = {
//         width: "100%",
//         height: "90vh"
//     };

//     return (
//         isLoaded && (
//             <div className="flex items-center justify-center">
//                 <GoogleMap
//                     mapContainerStyle={containerStyle}
//                     center={nyabugogo}
//                     zoom={12}
//                 >
//                     {currentLocation && <Marker position={currentLocation} />}

//                     {markers.map((marker) => (
//                         <Marker key={marker.name} position={marker.location} />
//                     ))}

//                     <Polyline
//                         path={markers.map(marker => marker.location)}
//                         options={{
//                             strokeColor: '#0000FF',
//                             strokeOpacity: 1.0,
//                             strokeWeight: 4,
//                         }}
//                     />

//                 </GoogleMap>

//                 <div className="absolute w-1/4 pt-1 mt-4 text-center top-20 left-2 bg-white p-2 shadow-md md:w-1/4">
//                     <div className="pt-5">
//                         <h4 className='text-xl font-semibold'>Nyabugogo- Kimironko</h4>
//                         {estimatedTime && (
//                             <>
//                                 <p>Next Stop: {markers[estimatedTime.findIndex(time => time > 0) + 1].name}</p>
//                                 <p>Distance: {estimatedTime[currentStopIndex + 1]} Km</p>
//                                 <p>Duration: {estimatedTime[currentStopIndex + 1]} Min</p>
//                             </>
//                         )}
//                     </div>
//                 </div>

//             </div>
//         )
//     )
// }

// export default Map;





// import React, { useState, useEffect } from 'react';
// import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';

// const Map = (props) => {

//     const { isLoaded } = props;
//     const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
//     const [currentLocation, setCurrentLocation] = useState(null);
//     const [estimatedTime, setEstimatedTime] = useState(null);
//     const [averageSpeed] = useState(30); // Assuming an average speed of 30 km/h

//     const nyabugogo = { lat: -1.939826787816454, lng: 30.0445426438232 };
//     const kimironko = { lat: -1.9365670876910166, lng: 30.13020167024439 };

//     const markers = [
//         { name: "Nyabugogo", location: nyabugogo },
//         { name: "StopA", location: { lat: -1.9355377074007851, lng: 30.060163829002217 } },
//         { name: "StopB", location: { lat: -1.9358808342336546, lng: 30.08024820994666 } },
//         { name: "StopC", location: { lat: -1.9489196023037583, lng: 30.092607828989397 } },
//         { name: "StopD", location: { lat: -1.9592132952818164, lng: 30.106684061788073 } },
//         { name: "StopE", location: { lat: -1.9487480402200394, lng: 30.126596781356923 } },
//         { name: "Kimironko", location: kimironko }
//     ];

//     useEffect(() => {
//         const interval = setInterval(() => {
//             if (currentLocationIndex < markers.length - 1) {
//                 setCurrentLocationIndex(currentLocationIndex + 1);
//             } else {
//                 clearInterval(interval); // Stop the interval when the last stop is reached
//             }
//         }, 5000); // Move to the next stop every 5 seconds

//         return () => clearInterval(interval); // Clean up the interval on component unmount
//     }, [currentLocationIndex]);

//     useEffect(() => {
//         const storedEstimatedTime = localStorage.getItem('estimatedTime');
//         if (storedEstimatedTime) {
//             setEstimatedTime(JSON.parse(storedEstimatedTime));
//         }

//         if (!window.google || !window.google.maps || !window.google.maps.geometry || !window.google.maps.geometry.spherical) return;

//         const { spherical } = window.google.maps.geometry;

//         if (!spherical) return;

//         const estimatedTimes = markers.map((marker, index) => {
//             if (index === 0) {
//                 return 0; // No estimated time for the starting point
//             }

//             const distanceToStop = spherical.computeDistanceBetween(
//                 new window.google.maps.LatLng(markers[index - 1].location),
//                 new window.google.maps.LatLng(marker.location)
//             );
//             const estimatedTimeToStop = distanceToStop / (averageSpeed * 1000 / 3600); // Convert speed to m/s

//             return Math.round(estimatedTimeToStop / 60); // Convert seconds to minutes
//         });

//         setEstimatedTime(estimatedTimes);
//         localStorage.setItem('estimatedTime', JSON.stringify(estimatedTimes));

//     }, [currentLocationIndex]);

//     useEffect(() => {
//         if (currentLocationIndex < markers.length) {
//             setCurrentLocation(markers[currentLocationIndex].location);
//         }
//     }, [currentLocationIndex]);

//     const containerStyle = {
//         width: "100%",
//         height: "90vh"
//     };

//     return (
//         isLoaded && (
//             <div className="flex items-center justify-center">
//                 <GoogleMap
//                     mapContainerStyle={containerStyle}
//                     center={nyabugogo}
//                     zoom={12}
//                 >
//                     {currentLocation && <Marker position={currentLocation} />}

//                     {markers.map((marker) => (
//                         <Marker key={marker.name} position={marker.location} />
//                     ))}

//                     <Polyline
//                         path={markers.map(marker => marker.location)}
//                         options={{
//                             strokeColor: '#0000FF',
//                             strokeOpacity: 1.0,
//                             strokeWeight: 4,
//                         }}
//                     />

//                 </GoogleMap>

//                 <div className="absolute w-1/4 pt-1 mt-4 text-center top-20 left-2 bg-white p-2 shadow-md md:w-1/4">
//                     <div className="pt-5">
//                         <h4 className='text-xl font-semibold'>Nyabugogo- Kimironko</h4>
//                         {estimatedTime && (
//                             <>
//                                 <p>Next Stop: {markers[currentLocationIndex + 1].name}</p>
//                                 <p>Distance: {estimatedTime[currentLocationIndex]} Km</p>
//                                 <p>Duration: {estimatedTime[currentLocationIndex]} Min</p>
//                             </>
//                         )}
//                     </div>
//                 </div>

//             </div>
//         )
//     )
// }

// export default Map;









import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';

const Map = (props) => {

    const { isLoaded } = props;
    const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [estimatedTime, setEstimatedTime] = useState(null);
    const [averageSpeed] = useState(30); // Assuming an average speed of 30 km/h

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

        if (!window.google || !window.google.maps || !window.google.maps.geometry || !window.google.maps.geometry.spherical) return;

        const { spherical } = window.google.maps.geometry;

        if (!spherical) return;

        const estimatedTimes = markers.map((marker, index) => {
            if (index === 0) {
                return 0; // No estimated time for the starting point
            }

            const distanceToStop = spherical.computeDistanceBetween(
                new window.google.maps.LatLng(markers[index - 1].location),
                new window.google.maps.LatLng(marker.location)
            );
            const estimatedTimeToStop = distanceToStop / (averageSpeed * 1000 / 3600); // Convert speed to m/s

            return Math.round(estimatedTimeToStop / 60); // Convert seconds to minutes
        });

        setEstimatedTime(estimatedTimes);
        localStorage.setItem('estimatedTime', JSON.stringify(estimatedTimes));

    }, []);

    useEffect(() => {
        if (currentLocationIndex < markers.length) {
            setCurrentLocation(markers[currentLocationIndex].location);
            localStorage.setItem('currentLocationIndex', currentLocationIndex);
        } else {
            setCurrentLocation(markers[0].location); // Reset to the first marker if currentLocationIndex exceeds the number of markers
            setCurrentLocationIndex(0); // Reset the currentLocationIndex
        }
    }, [currentLocationIndex]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentLocationIndex < markers.length - 1) {
                setCurrentLocationIndex(currentLocationIndex + 1);
            } else {
                setCurrentLocation(markers[markers.length - 1].location); // Set current location to the destination
                setCurrentLocationIndex(markers.length); // Set the currentLocationIndex to a value greater than the number of markers to stop the interval
            }
        }, 5000); // Move to the next stop every 5 seconds

        return () => clearInterval(interval); // Clean up the interval on component unmount
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
                                <p>Next Stop: {markers[currentLocationIndex + 1]?.name}</p>
                                <p>Distance: {estimatedTime[currentLocationIndex]} Km</p>
                                <p>Duration: {estimatedTime[currentLocationIndex + 1]} Min</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        )
    )
}

export default Map;









