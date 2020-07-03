export const addTrip = (trip) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const state = getState();
    console.log(trip);
    
    firestore.collection('trips').add({
      location: trip.location,
      city: trip.city,
      state: trip.state,
      country: trip.country,
      startDate: new Date(trip.startDate) || null,
      endDate: new Date(trip.endDate) || null,
      description: trip.description,
      coords: trip.coords ? new firestore.GeoPoint(trip.coords.lat, trip.coords.lng) : false,
      uid: state.firebase.auth.uid,
      firstName: state.firebase.profile.firstName,
      lastName: state.firebase.profile.lastName,
      loggedAt: new Date(),
      pictures: []
    }).then(() => {
      dispatch({
        type: 'ADD_TRIP',
        trip: trip
      })
    }).catch((error) => {
      dispatch({
        type: 'ADD_TRIP_ERROR',
        error: error
      })
    })
  }
};

export const deleteTrip = (tripId) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection('trips').doc(tripId).delete()
      .then(() => {
        dispatch({
          type: 'DELETE_TRIP'
        })
      }).catch((error) => {
        dispatch({
          type: 'DELETE_TRIP_ERROR',
          error: error
        })
      })
  }
};

export const updateTrip = (tripId, updatedFields) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore()

    firestore.collection('trips').doc(tripId).update({
      ...updatedFields,
    }).then(() => {
      dispatch({
        type: 'UPDATE_TRIP',
        fields: updatedFields
      })
    }).catch((error) => {
      dispatch({
        type: 'UPDATE_TRIP_ERROR',
        error: error
      })
    })
  }
};

export const addItineraryItem = (item) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore()

    firestore.collection('itinerary').add({
      ...item
    }).then(() => {
      dispatch({
        type: 'ADD_ITINERARY_ITEM',
        item: item
      })
    }).catch((error) => {
      dispatch({
        type: 'ADD_ITINERARY_ITEM_ERROR',
        error: error
      })
    })
  }
};

export const deleteItineraryItem = (itemId) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore()

    firestore.collection('itinerary').doc(itemId).delete()
    .then(() => {
      dispatch({
        type: 'DELETE_ITINERARY_ITEM'
      })
    })
    .catch((error) => {
      dispatch({
        type: 'DELETE_ITINERARY_ITEM_ERROR',
        error: error
      })
    })
  }
};

export const addTripPics = (tripId, urls) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firestore.collection('trips').doc(tripId).update({
      pictures: firebase.firestore.FieldValue.arrayUnion(...urls)
    })
    .then(() => {
      dispatch({
        type: 'ADD_TRIP_PHOTOS'
      })
    })
    .catch((error) => {
      dispatch({
        type: 'ADD_TRIP_PHOTOS_ERROR',
        error: error
      })
    })
  }
};
