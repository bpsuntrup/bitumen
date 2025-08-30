import { useState } from "react";
import Calendar from "react-calendar";
import EventForm from "./EventForm";
import EventList from "./EventList";
export default function App() {
    let [events, setEvents] = useState(getEventList());
    let [shown, setShown] = useState("form");
    let [apptDate, setApptDate] = useState(new Date());

    const views = {
        form: <EventForm addEvent={(e) => {addEvent(events, setEvents, e)}} events={events}/>,
        list: <EventList eventList={events} />,
    };

    return (<>
        <h1>Bitumen</h1>
        <nav>
            <ul>
                <li onClick={() => {setShown("form")}}> Make an Appointment </li>
                <li onClick={() => {setShown("list")}}> See Ben's Schedule </li>
            </ul>
        </nav>
        <h2> Set up an appointment with Ben </h2>
        <Calendar onChange={setApptDate} value={apptDate} />
        <EventForm addEvent={(e) => {addEvent(events, setEvents, e)}} events={events} apptDate={apptDate}/>,
        <EventList eventList={events} apptDate={apptDate}/>,
    </>);
}

function addEvent(events, setEvents, e) {
    events.push(e);
    setEvents(events);
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
