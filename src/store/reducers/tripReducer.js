const initState = {};

const tripReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_TRIP':
      console.log('Add trip', action.trip);
      return state;
    case 'ADD_TRIP_ERROR':
      console.log('Add trip error', action.error);
      return state;
    case 'DELETE_TRIP':
      console.log('Delete trip');
      return state;
    case 'DELETE_TRIP_ERROR':
      console.log('Delete trip error', action.error);
      return state;
    case 'UPDATE_TRIP':
      console.log('Update trip', action.fields);
      return state;
    case 'UPDATE_TRIP_ERROR':
      console.log('Update trip error', action.error);
      return state;
    case 'ADD_ITINERARY_ITEM':
      console.log('Add itinerary item');
      return state;
    case 'ADD_ITINERARY_ITEM_ERROR':
      console.log('Add itinerary item error', action.error);
      return state;
    case 'DELETE_ITINERARY_ITEM':
      console.log('Delete itinerary item');
      return state;
    case 'DELETE_ITINERARY_ITEM_ERROR':
      console.log('Delete itinerary item error', action.error);
      return state;
    case 'ADD_TRIP_PHOTOS':
      console.log('Add trip photos');
      return state;
    case 'ADD_TRIP_PHOTOS_ERROR':
      console.log('Add trip photos error', action.error);
      return state;
    case 'REMOVE_TRIP_PHOTO':
      console.log('Remove trip photo');
      return state;
    case 'REMOVE_TRIP_PHOTO_ERROR':
      console.log('Remove trip photo error', action.error);
      return state;
    default:
      return state;
  }
}

export default tripReducer;
