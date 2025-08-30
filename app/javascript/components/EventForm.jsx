import { useState } from "react";
import leftPad from "left-pad";
import moment from "moment-timezone";
import 'react-calendar/dist/Calendar.css';

export default function EventForm({addEvent, events, apptDate}) {

    let [startTime, setStartTime] = useState();

    const startTimes = timeRange(apptDate, '08:00', '19:30', [30, 'm']) // TODO: filter unavailable times
    const endTimes = timeRange(apptDate, '08:30', '20:00', [30, 'm'])

    let options = startTimes.map((t) => {
        let hhmm = t.format('hh:mm A z');
        let HHmm = t.format('HH:mm');
        return <option value={HHmm}> {hhmm} </option>
    })
    options.unshift(<option value=""> {"Select a Time"} </option>);

    return (<>
        <label> Start Time: </label> 
        <select onChange={(e) => {setStartTime(newTime(apptDate, e.target.value))}}>
            {options}
        </select>
        <div> {apptDate.toDateString()} </div>
        <div> {startTime ? startTime.format('YYYY MM dd hh:mm A z') : "select a time"} </div>
        <input type="time" step="30" min="08:00" max="20:00"/>
    </>)
}

function newTime(date, HHmm) {
    if (!HHmm) {
        return undefined;
    }
    const [hour, min] = HHmm.split(':');
    const modate = moment.tz(date, 'America/Chicago') // HARD CODED THE MIDWEST WUUUUUH?
    modate.hour(hour);
    modate.minute(min);
    return modate;
}

function timeRange(date, start, stop, step) {
    const startTime = newTime(date, start);
    const stopTime = newTime(date, stop);

    let times = [];
    let time = startTime.clone();
    do {
        times.push(time.clone());
        time.add(...step);
    } while (time.isSameOrBefore(stopTime))
    return times;
}
