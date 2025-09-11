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
        form: <EventForm addEvent={addEvent} events={events}/>,
        list: <EventList eventList={events} />,
    };

    const addEvent = function(e) {
        e.startTime.setYear(apptDate.getFullYear());
        e.startTime.setMonth(apptDate.getMonth());
        e.startTime.setDate(apptDate.getDate());
        setEvents([...events, e]);
    };

    return (<>
        <h1>Bitumen</h1>
        <h2> Set up an appointment with Ben </h2>
        <main id="main-container">
            <div className={"main-widget"}> <Calendar onChange={setApptDate} value={apptDate} /> </div>
            <EventForm addEvent={addEvent} />
            <EventList eventList={events} apptDate={apptDate}/>
        </main>
    </>);
}


function getEventList() {
    return [
        {
            eventId: 1,
            startTime: new Date(),
            duration: 30,
            where: "Ben's garage",
            details: "Birthday party!",
        }
    ];
}
