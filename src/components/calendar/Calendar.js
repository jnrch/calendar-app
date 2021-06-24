import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewfab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment);

export const Calendar = () => {

    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector( state => state.calendar);
    const {roles} = useSelector(state => state.auth);

    const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'month' || 'week');

    useEffect(() => {
        dispatch(eventStartLoading());
    }, [dispatch]);

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal());
    }

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e));
    }

    const onViewChange = (e) => {
        setlastView(e);
        localStorage.setItem('lastView', e);
    }

    const eventStyleGetter = ( event ) => {

        const style = {
            backgroundColor: (event.status === 'PAID') ? '#00FF00' : (event.status === 'TOPAY') ? '#5E69F9' : '#FEA348',//( uid === event.user.id ) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: '2',
            display: 'block',
            textDecoration: (event.status === 'ANNULLED') ? 'line-through' : '',
            color: '#000000'//( 'ANNULLED' === event.status ) ? 'orange' : ( 'TOPAY' === event.status ) ? 'red' : ( 'PAID' === event.status ) ? 'green' : 'white',//'white'
        }

        return {
            style
        }
    }
    return (
        <div className="calendar-screen">
            <Navbar />

            <BigCalendar 
                localizer={ localizer }
                events={ events }
                startAccessor="end"
                endAccesor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                view={ lastView }
                views={['month']}
                components={{
                    event: CalendarEvent,
                    
                }}
                popup
                showMultiDayTimes
            />
            {!roles.includes('ROLE_USER') &&
                <AddNewfab/>
            }
            {
                (activeEvent) && <DeleteEventFab />
            }
            <CalendarModal />
        </div>
    )
}
