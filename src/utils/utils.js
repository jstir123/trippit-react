export const getTripName = (trip) => {
  let tripName = ''
  if (trip.city) {
    tripName += (trip.city + ', ')
  }
  if (trip.state && trip.country === 'United States of America') {
    tripName += trip.state
  }
  if (!trip.city && trip.state && trip.country !== 'United States of America') {
    tripName += trip.state + ', '
  }
  if (trip.country && trip.country !== 'United States of America') {
    tripName += trip.country
  }
  if (!trip.city && !trip.state && trip.country === 'United States of America') {
    tripName += trip.country
  }
  return tripName
}

export const isUnitedStates = (country) => {
  if (country.toLowerCase() === 'united states of america' ||
      country.toLowerCase() === 'united states' ||
      country.toLowerCase() === 'america' ||
      country.toLowerCase() === 'usa' ||
      country.toLowerCase() === 'us') {
    return 'United States of America'
  } else {
    return country
  }
}

export const titleCase = (str) => {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
}
