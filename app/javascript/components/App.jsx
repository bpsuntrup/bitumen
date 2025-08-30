import EventForm from "./EventForm";
import EventList from "./EventList";
export default function App() {
    let eventList = getEventList();
    return (<>
        <h1>Bitumen</h1>
        <h5>Schedule an interview with Benjamin</h5>
        <EventForm />
        <EventList eventList={eventList} />
    </>);
}

function getEventList() {
    return [
        {
            eventId: 1,
            startTime: new Date("4 September 2025 2:00:00PM CDT"),
            duration: 30,
            where: "Ben's garage",
            details: "Birthday party!",
        }
    ];
}
