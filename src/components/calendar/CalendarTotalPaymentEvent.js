import React from 'react';

export const CalendarTotalPaymentEvent = ({ event }) => {

    const { bigTotal, payments } = event;
    return (
        <div>
            {payments.map(elemento=>(
            <li key={elemento.name}>{ elemento.name }: ${ elemento.total }</li>
            ))}
            <strong>Total: ${ bigTotal }</strong>

        </div>
    )
}