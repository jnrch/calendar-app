import React from 'react'

export const CalendarEvent = ({ event }) => {

    const { title, user } = event;
    console.log(event);
    return (
        <div>
            <strong>{ title }</strong>
            <span>{ user.name }</span>
        </div>
    )
}
