import moment from "moment";

export default function EventList({eventList,}) {
    eventList = eventList.map(e => {
        const eventDate = <div className="list-event-date">{ e.startTime.toDateString() }</div>
        const endTime = moment(e.startTime).add(e.duration, 'm').toDate();
        const eventStartTime = <div className="list-event-start-time">{ "Starting: " + e.startTime.toLocaleTimeString() }</div>
        const eventEndTime = <div className="list-event-end-time">{ "Ending: " + endTime.toLocaleTimeString() }</div>
        const eventWhen = <> { eventDate } { eventStartTime } { eventEndTime } </>

        return (<li className="list-event-element" key={e.eventId}>
            <div className="list-event-when">{eventWhen}</div>
            <div className="list-event-where">{e.where}</div>
            <p className="list-event-details">{e.details}</p>
        </li>);
    });
    return (<>
        <h2> Ben's Current Schedule </h2>
        <ul className="event-list">{eventList}</ul>
    </>)
}

