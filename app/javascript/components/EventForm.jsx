import { useState } from "react";
import leftPad from "left-pad";
import moment from "moment-timezone";
import 'react-calendar/dist/Calendar.css';

export default function EventForm({addEvent, events, apptDate}) {

    let [startTime, setStartTime] = useState();
    let [endTime, setEndTime] = useState();

    const startTimes = timeRange(apptDate, '08:00', '19:30', [30, 'm']) // TODO: filter unavailable times
    const endTimes = timeRange(apptDate, '08:30', '20:00', [30, 'm'])

    let startOptions = startTimes.map((t) => {
        let hhmm = t.format('hh:mm A z');
        let HHmm = t.format('HH:mm');
        return <option value={HHmm}> {hhmm} </option>
    })
    startOptions.unshift(<option value=""> {"Select a Time"} </option>);

    let endOptions = endTimes.map((t) => {
        let hhmm = t.format('hh:mm A z');
        let HHmm = t.format('HH:mm');
        let duration = showDiff(startTime, t);
        if (duration > 0) {
            return <option value={HHmm}> {`${hhmm} (+${duration} hrs)` } </option>
        }
    }).filter(x => x);

    endOptions.unshift(<option value=""> {"Select a Time"} </option>);

    return (<>
        <label> Start Time: </label> 
        <select onChange={(e) => {setStartTime(newTime(apptDate, e.target.value))}}>
            {startOptions}
        </select>
        { startTime ? 
            <>
        <label> End Time: </label>
        <select onChange={(e) => {setEndTime(newTime(apptDate, e.target.value))}}>
            {endOptions}
        </select></>
        :  ""}
        <div> {apptDate.toDateString()} </div>
        <div> {startTime ? startTime.format('YYYY MM dd hh:mm A z') : "select a time"} </div>
    </>)
}

function showDiff(startdate, enddate) {
    if (!startdate || !enddate) {
        return undefined;
    }
    const diff =  moment.duration(enddate.diff(startdate))
    console.log(diff)
    return diff.asHours()
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
