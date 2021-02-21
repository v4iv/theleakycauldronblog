---
templateKey: article-page
title: Fit Bounds of a Polyline and Marker with react-google-maps
slug: fit-bounds-of-a-polyline-and-marker-with-react-google-maps
author: Vaibhav Sharma
authorLink: https://twitter.com/vaibhaved
date: 2019-07-06T14:46:59.611Z
cover: /img/react-google-maps.jpg
metaTitle: Fit Bounds of a Polyline and Marker with React Google Maps
metaDescription: >-
  Use React Google Maps and fit bounds & zoom of a Polyline and Marker together
  for a better UI experience.
tags:
  - react js
  - maps
  - javascript
---
When we started working on a Live Flight Tracker for my company, we chose to use [react-google-maps](https://github.com/tomchentw/react-google-maps) as our library. Since it's the most popular one, with over 4K stars on Github. I did have some experience with it but that was nowhere enough for the problem I was about to face. Especially, with very inadequate documentation and not enough examples showing the usage of the library.

What we were trying to accomplish was to trace the flight path, and show the current position of the said flight. In theory, the first part was simple enough to do with a simple `Polyline`, so was the second part with a simple `Marker`. But there was a third part to it — to display both, the Polyline & the Marker in the same bounding box of the visible map with an appropriate amount of zoom. This should have been easy as well given that we knew that there's a helper function provided by Google Maps that helps us calculate bounding box. But implementing it in the context of `react-google-maps` wasn't as simple due to lack of examples online. So, after I was done, I decided to save "noobs" like me from the trouble I faced.

## Writing the Map Component

First, we begin by making the Map Component that will display our Polyline & Marker, which is simple enough, but let me show anyways so that we are on the same page.

We begin by initializing our Google Maps in our Component which is wrapped in `withScriptjs` & `withGoogleMap` HOCs.

```typescript
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

Then we add Polyline that will trace the flight path. We pass an array of `lat` & `lng` to the path prop.

```typescript
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

Next, we add Marker to show the current position of our aircraft. We pass the current position object made up of `lat` & `lng` to it, which in our case is just the last position in our path array.

```typescript
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

Using it is simple enough just import the above component, pass it the required props one of them being your Google Maps API key URL.

```typescript
class FlightPathTracker Component<any, any> {
  componentDidMount(): void {
    ...
  }

  render() {
    const {path, defaultCenter, currentPosition} = this.props
    return(
          <CustomMapComponent
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

Now comes the tricky part, to set bounds we first let the map we created above mount, then we get a `ref` from our map component, we pass it to a mounted map handler method, where we set the bounds. We begin by adding the handler function as a prop to the `ref` of our map component.

```typescript
...

  <GoogleMap
    defaultCenter={props.defaultCenter}
    defaultZoom={3}
    options={{
      streetViewControl: false,
      mapTypeId: 'satellite',
    }}
    ref={props.onMapMounted}
  >
```

Next, we write the `handleMapMounted` method, where we first initialize Google's `LatLngBounds()` object. Then we for each position in the path array we extend that object. And, finally, we pass that object to our map.

```typescript
...

class FlightPathTracker Component<any, any> {
  ...

  handleMapMounted = (map) => {
    const { path } = this.props
    
    this._map = map
    if (map) {
      const bounds = new google.maps.LatLngBounds()

      path.map(position => {
        bounds.extend(position)
      })
      
      this._map.fitBounds(bounds)
   
    }
  }

...
```

Finally, we pass this method to the `CustomMapComponent` as a prop and voila.

```typescript
...

          <CustomMapComponent
            {/* add all the other required props */}
            ...
            {/* add all the other required props */}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_API_KEY}`}
            defaultCenter={defaultCenter}
            path={path}
            currentPosition={currentPosition}
            onMapMounted={this.handleMapMounted}
          />

...
```

Now run your app to see if everything is working and we are done.
