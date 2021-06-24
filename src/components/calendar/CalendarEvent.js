import React from 'react'

export const CalendarEvent = ({ event }) => {

    const { user, amount } = event;
    return (
        <div>
            <strong>${ amount } - </strong>
            <span>{ user.name }</span>
        </div>
    )
}
