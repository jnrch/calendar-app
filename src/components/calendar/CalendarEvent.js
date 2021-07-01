import React from 'react'

export const CalendarEvent = ({ event }) => {

    const { amount, provider } = event;
    return (
        <div>
            <strong>${ amount } - </strong>
            <span>{ provider.name }</span>
        </div>
    )
}
