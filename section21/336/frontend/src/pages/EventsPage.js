import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
    const { events } = useLoaderData();
    return <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
            {loadedEvents => <EventsList events={loadedEvents} />}
        </Await>
    </Suspense>
}

export default EventsPage;


async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        // throw new Response(
        //     JSON.stringify({ message: "Cound not fetch events." }),
        //     { status: 500, }
        // );
        return json(
            { message: "Cound not fetch events." },
            { status: 500, }
        );
    } else {
        const data = await response.json();
        return data.events;
    }
}

export function loader() {
    return defer({
        events: loadEvents()
    });
}