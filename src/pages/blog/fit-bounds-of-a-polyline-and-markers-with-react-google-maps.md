---
templateKey: article-page
title: Fit Bounds of a Polyline and Markers with React Google Maps
date: 2019-07-06T14:46:59.611Z
cover: /img/react-google-maps.jpg
meta_title: Fit Bounds of a Polyline and Markers with React Google Maps
meta_description: >-
  Use React Google Maps and fit bounds & zoom of a Polyline and Markers together
  for a better UI experience.
tags:
  - ReactJS
  - Google Maps
---
When we started working on a Live Flight Tracker for my company, we chose [React Google Maps](https://github.com/tomchentw/react-google-maps) as our library. It being the most popular one, with over 4K stars on github. I did have some experience with it but that was nowhere enough for the problem i was about to face. Especially, with a very inadequate documentation and not enough examples showing the usage of the library.

What we were trying to acomplish was to trace the flight path, and show the current position of the said flight. In theory, first part was simple enough to do with a simple `Polyline`, so was the second part with a simple `Marker`. But there was a third part to it — to display both, the Polyline & the Marker in the same bounding box of the visible map with appropriate amount of zoom. This should have been easy as well given that we knew that there's a helper function provided by Google Maps that helps us calculate bounding box. But implementing it in the context of React Google Maps wasn't as simple due to lack of examples online. So, after I was done, I decided to save noobs like me from the trouble I faced.

## Writing the Map Component

First we begin by making the Map Component that will display our Polyline & Marker, which is simple enough, but let me show anyways so that we are on the same page.

We begin by initializing our Google Map in our Component which is wrapped in withScriptjs & withGoogleMap HOCs.

```javascript
import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Polyline, Marker } from 'react-google-maps'

export const CustomMapComponent: React.ComponentClass<any> = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultCenter={props.defaultCenter}
    defaultZoom={3}
    options={{
      streetViewControl: false,
      mapTypeId: 'satellite',
    }}
  >

  </GoogleMap>
))
```

Then we add Polyline that will trace the flight path. We pass an array of `Lat` & `Lon` to the path prop.

```javascript
...

  <GoogleMap
    defaultCenter={props.defaultCenter}
    defaultZoom={3}
    options={{
      streetViewControl: false,
      mapTypeId: 'satellite',
    }}
  >
    <Polyline
      path={props.path}
      options={{
        geodesic: true,
        strokeColor: '#669DF6',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      }}
    />
  </GoogleMap>

...
```

Next we add Marker to show the current position of our aircraft. We pass the current position object made up of `lat` & `lon` to it.

```javascript
...

  <GoogleMap
    defaultCenter={props.defaultCenter}
    defaultZoom={3}
    options={{
      streetViewControl: false,
      mapTypeId: 'satellite',
    }}
  >
    <Polyline
      path={props.path}
      options={{
        geodesic: true,
        strokeColor: '#669DF6',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      }}
    />
    <Marker
      position={props.currentPosition}
      defaultIcon={
        { url: '/static/images/flight-marker.png', scaledSize: { height: 16, width: 16 }, anchor: new google.maps.Point(8, 8) }}
    />
  </GoogleMap>

...
```


## Using the Map Component

Using it is simple enough just import the above component, pass it the required props one of them being your google map api key url.

```javascript
class FlightPathTracker Component<any, any> {
  componentDidMount(): void {
    ...
  }

  render() {
    const {path, defaultCenter, currentPosition} = this.props
    return(
    <MyMapComponent
            {/* add all the other required props */}
            ...
            {/* add all the other required props */}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_API_KEY}`}
            defaultCenter={defaultCenter}
            path={path}
            currentPosition={currentPosition}
          />
    )
  }
}
```
Just go ahead and run it and check to see if everything is working. You'll see that when the map mounts the viewport zooms and fits the Marker as the default. But our objective is to fit the Marker as well as the Polyline.

## Setting the Bounding Box for both Polyline & Marker

aflda
