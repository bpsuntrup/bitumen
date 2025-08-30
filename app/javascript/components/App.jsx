import EventForm from "./EventForm";
import EventList from "./EventList";
export default function App() {
    let eventList = getEventList();
    return (<>
        <h1>Bitumen</h1>
        <nav>
            <ul>
                <li onClick={renderMakeAppointment}> Make an Appointment </li>
                <li onClick={renderMySchedule}> See Ben's Schedule </li>
            </ul>
        </nav>
        <EventForm />
        <EventList eventList={eventList} />
    </>);
}

function renderMakeAppointment() {
    console.log("make appt");
}
function renderMySchedule() {
    console.log('render sched');
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
