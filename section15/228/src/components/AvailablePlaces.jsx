import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [availabePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    (async () => {
      setIsFetching(true);

      try {
        const places = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition(position => {
          setAvailablePlaces(sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          ));
          setIsFetching(false);
        }
        );
      } catch (e) {
        setError({ message: e.message || 'Could not fetch places, please try again later.' });
        setIsFetching(false);
      }
    })();
  },
    []
  );

  if (error) {
    return <Error title="An Error occurred!" message={error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={availabePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
