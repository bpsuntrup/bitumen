import { useState } from "react";
import EventForm from "./EventForm";
import EventList from "./EventList";
export default function App() {
    let eventList = getEventList();
    let [shown, setShown] = useState("form");
    const views = {
        form: <EventForm />,
        list: <EventList eventList={eventList} />,
    };

    return (<>
        <h1>Bitumen</h1>
        <nav>
            <ul>
                <li onClick={() => {setShown("form")}}> Make an Appointment </li>
                <li onClick={() => {setShown("list")}}> See Ben's Schedule </li>
            </ul>
        </nav>
        { views[shown] }
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
