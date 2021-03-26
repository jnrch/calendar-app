import React, { useState } from 'react';
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
import { eventSetActive } from '../../actions/events';
import { AddNewfab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment);
const events = [{
    title: 'Boss birthday',
    start: moment().toDate(),
    end: moment().add( 2, 'hours').toDate(),
    bgcolor: '#fafafa',
    notes: 'Comprar el pastel',
    user: {
        _id: '1234',
        name: 'Jonathan'
    }
}]

export const Calendar = () => {

    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector( state => state.calendar);

    const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'month');

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

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        console.log(event, start, end, isSelected);
        const style = {
            backgroundcolor: '#367CF7',
            borderRadius: '0px',
            opacity: '0.8',
            display: 'block',
            color: 'white'
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
                startAccessor="start"
                endAccesor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                view={ lastView }
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewfab/>
            {
                (activeEvent) && <DeleteEventFab />
            }
            <CalendarModal />
        </div>
    )
}
