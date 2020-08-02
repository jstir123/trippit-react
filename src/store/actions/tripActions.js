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
      startDate: trip.startDate === null ? null : new Date(trip.startDate),
      endDate: trip.endDate === null ? null : new Date(trip.endDate),
      description: trip.description,
      coords: trip.coords ? new firestore.GeoPoint(trip.coords.lat, trip.coords.lng) : false,
      uid: state.firebase.auth.uid,
      firstName: state.firebase.profile.firstName || null,
      lastName: state.firebase.profile.lastName || null,
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
  return (dispatch, getState, {getFirestore, getFirebase}) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const state = getState();
    let uid = state.firebase.auth.uid;

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

    firestore.collection('itinerary').where('tripId','==',tripId).get()
      .then((querySnapshot) => {
        const batch = firestore.batch();

        querySnapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });

        return batch.commit();
      }).then(() => {
        console.log('Itinerary items deleted')
    });

    firebase.storage().ref().child(`${uid}/trip-pictures/${tripId}`).listAll()
      .then((resp) => {
        resp.items.forEach((item) => {
          item.delete().then(() => {
            console.log(`${item.name} deleted`);
          }).catch((error) => {
            console.log(`${item.name} could not be deleted.`, error);
          })
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

export const deleteTripPic = (tripId, pic) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firestore.collection('trips').doc(tripId).update({
      pictures: firebase.firestore.FieldValue.arrayRemove(pic)
    })
    .then(() => {
      dispatch({
        type: 'REMOVE_TRIP_PHOTO'
      })
    })
    .catch((error) => {
      dispatch({
        type: 'REMOVE_TRIP_PHOTO_ERROR',
        error: error
      })
    })
  }
};
