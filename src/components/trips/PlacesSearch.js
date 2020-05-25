import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import places from 'places.js';


const PlacesSearch = (props) => {
    const {type, setLocation, setCity, setState, setCountry, setCoords, error} = props;
    const [placesAutocomplete, setPlacesAutocomplete] = useState(null);

    useEffect(() => {
        if (placesAutocomplete === null) {
            setPlacesAutocomplete(
                places({
                    appId: 'pl002EF7Z82A',
                    apiKey: '6671243a892e4c02983983935c7eae17',
                    container: document.querySelector('#location')
                }).configure({
                    type: type,
                    language: 'en'
                })
            );
        }
    }, [placesAutocomplete, type]);

    useEffect(() => {
        if (placesAutocomplete !== null) {
            placesAutocomplete.configure({type});
        }
    });

    if (placesAutocomplete !== null) {
        placesAutocomplete.on('change', (e) => {
            setLocation(e.suggestion.value || '');
            setCity(e.suggestion.type === 'city'
                    ? e.suggestion.name || ''
                    : e.suggestion.city || ''
            );
            setState(e.suggestion.administrative || '');
            setCountry(e.suggestion.type === 'country'
                ? e.suggestion.name || ''
                : e.suggestion.country || '');
            setCoords(e.suggestion.latlng || '');
        })
    }

    if (placesAutocomplete !== null) {
        placesAutocomplete.on('clear', (e) => {
            document.querySelector('#location').value = '';
            setLocation('');
            setCity('');
            setState('');
            setCountry('');
            setCoords('');
        })
    }
    
    return (
        <TextField
            autoFocus
            variant='outlined'
            fullWidth
            id='location'
            label='Search Locations'
            name='location'
            onChange={(e) => setLocation(e.target.value)}
            required
            error={error}
            aria-describedby='fieldError'
        />
    )
}

export default PlacesSearch;