import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Calendar as BigCalendarPerPayment, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { CalendarTotalPaymentEvent } from './CalendarTotalPaymentEvent';
import { eventStartLoadingTotalPerPayment } from '../../actions/events';

moment.locale('es');

const localizer = momentLocalizer(moment);

export const CalendarTotalPayment = () => {

    const dispatch = useDispatch();
    const {eventsPerPayment} = useSelector( state => state.eventPerPayment);

    const [lastView, setlastView] = useState(localStorage.getItem('lastView2') || 'month');

    useEffect(() => {
        dispatch(eventStartLoadingTotalPerPayment());
    }, [dispatch]);

    const onViewChange = (e) => {
        setlastView(e);
        localStorage.setItem('lastView2', e);
    }

    return (
        <div className="calendar-screen">
            <Navbar />

            <BigCalendarPerPayment 
                localizer={ localizer }
                events={ eventsPerPayment }
                startAccessor="end"
                endAccesor="end"
                messages={ messages }
                onView={ onViewChange }
                view={ lastView }
                views={['month']}
                components={{
                    event: CalendarTotalPaymentEvent
                }}
            />
        </div>
    )
}
