import { useState } from "react";
import Calendar from "react-calendar";
import EventForm from "./EventForm";
import EventList from "./EventList";
import 'react-calendar/dist/Calendar.css';
import './styles/App.css';

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
        <h2> Set up an appointment with Ben </h2>
        <main id="main-container">
            <div class="main-widget"> <Calendar onChange={setApptDate} value={apptDate} /> </div>
            <EventForm addEvent={(e) => {addEvent(events, setEvents, e)}} events={events} apptDate={apptDate}/>
            <EventList eventList={events} apptDate={apptDate}/>
        </main>
    </>);
}

function addEvent(events, setEvents, e) {
    setEvents([...events, e]);
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
