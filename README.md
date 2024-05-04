# Real-time Ride-Share Tracking Map

## Overview

This project implements a real-time ride-share tracking map using React.js and the Google Maps API. The map displays a route from Nyabugogo to Kimironko with several intermediate stops, allowing users to track the driver's current location and estimated time of arrival (ETA) at each stop.


## Features

Interactive map displaying the entire route with marked stops.
Real-time tracking of the driver's current location.
Calculation and display of the ETA for the next stop, assuming a constant average speed.


## GOOGLE_MAP_API_KEY Process
1. craete ana account on Google Cloud Pratform
2. Login
3. Create Project
4. Navigate APIS and Services
5. navigate libraries
6. Enable the folowing APISservices:  DirectionApi, PlacesAPI, DistanceMatrixApi, JSmapAPI, routeAPI
7. after that you can set restriction or you ret it un restricted.
8. Generate API_KEY

## Reactjs Vite, TailwindCss

1. create a directory
2. Navigate that directory with bash or cmd
3. create Reactj project by writing this command:     ``npm create vite@latest``
4. select Reactjs, JavaScript
5. navigate you progect    ``cd projectName``
6. install nessecery dependancies `` npm install``
7. install TailwindCss `` npm install -D tailwindcss postcss autoprefixer``, ``npx tailwindcss init -p``
      
## Libraries used

```
npm install @react-google-maps/api
```

### Map

The Map component is the main component responsible for rendering the Google Map, markers, and polyline.
It uses hooks such as useState and useEffect to manage the state and perform calculations.

### Marker
The Marker component represents a stop along the route. It contains information about the stop's name and location.

### Polyline

The Polyline component draws a line connecting the markers to visualize the route.

### Implementation Details

The map is initialized with the starting point at Nyabugogo and the ending point at Kimironko.
Markers are placed at each stop along the route, including Stop A, Stop B, Stop C, Stop D, and Stop E.

### Feature

Implement live location tracking using a real-time database.
Add support for multiple drivers and routes.
Enhance the user interface with additional features such as route customization and traffic information.
The useEffect hook is used to calculate the estimated time to reach each stop based on the distance and average speed.
The driver's current location is updated every 5 seconds to simulate movement along the route.
The ETA for the next stop is displayed on the map.
The real-time ride-share tracking map provides a simple yet effective solution for tracking the driver's location and EAt.
By leveraging the Google Maps API and React.js, the application delivers a seamless user experience for both drivers and passengers.