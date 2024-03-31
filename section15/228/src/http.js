import { SERVER_URL } from './common/constants.js';

export async function fetchAvailablePlaces() {
    const response = await fetch(`${SERVER_URL}/places`);
    if (!response.ok) {
        throw new Error('Failed to fetch places.');
    }
    const data = await response.json();
    return data.places;
}

export async function fetchUserPlaces() {
    const response = await fetch(`${SERVER_URL}/user-places`);
    if (!response.ok) {
        throw new Error('Failed to fetch user places.');
    }
    const data = await response.json();
    return data.places;
}

export async function updateUserPlaces(places) {
    const request = JSON.stringify({ places });
    const response = await fetch(`${SERVER_URL}/user-places`, {
        method: 'PUT',
        body: request,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to update user places.');
    }

    const data = await response.json();
    return data.message;
}