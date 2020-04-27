import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';
import {getTripName} from '../../utils/utils';

class MapContainer extends Component {

  componentDidMount = () => {
    let {trips} = this.props;
    mapboxgl.accessToken = 'pk.eyJ1IjoianN0aXIxMjMiLCJhIjoiY2s2dTExb2loMDUyazNsbXRjeXo4a3dwdSJ9.1VDO7Ypw2AL_eqW41ueANA';

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [-98.5795, 39.8283], // [lng, lat]
      zoom: 0.75
    });

    this.currentMarkers = this.placeMarkers(trips);
  }

  componentDidUpdate = () => {
    let {trips} = this.props;

    if (this.currentMarkers.length > 0) {
      for (var i = this.currentMarkers.length - 1; i >= 0; i--) {
        this.currentMarkers[i].remove();
      }
    }

    this.currentMarkers = this.placeMarkers(trips);
  }

  placeMarkers = (trips) => {
    let markers = [];
    if (trips) {
      let coords = trips.map(trip => {
        if (trip.coords) {
          return {lat: trip.coords.latitude, lng: trip.coords.longitude, loc: getTripName(trip)}
        } else {
          return null
        }
      });

      coords.forEach(coord => {
        if (coord) {
          var popup = new mapboxgl.Popup({ offset: 25 }).setText(
            coord.loc
          );

          var marker = new mapboxgl.Marker()
            .setLngLat([coord.lng, coord.lat])
            .setPopup(popup)
            .addTo(this.map);

          markers.push(marker)
        }
      })
    }
    return markers
  }

  render = () => {
    return (
      <>
        <div id="map" ref={el => this.mapContainer = el} />
        <div className="map-shadow"></div>
      </>
    )
  }
}

export default MapContainer;
