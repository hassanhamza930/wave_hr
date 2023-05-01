import React from "react";
import {
  Calendar,
  momentLocalizer,
  Views,
  DateLocalizer,
} from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

interface Event {
  id: number;
  start: Date;
  end: Date;
  title: string;
  description?: string;
  color?: string;
}

interface MyCalendarProps {
  events: Event[];
  localizer: DateLocalizer;
}

const CalenderComponent: React.FC<MyCalendarProps> = ({
  events,
  localizer,
}) => {
  const eventStyleGetter = (event: Event) => {
    const backgroundColor = event.color ? event.color : "#3174ad";
    const borderRadius = "5px";
    const opacity = 1;
    const color = "#fff";
    const border = "1px solid #285e8e";
    const display = "block";
    const fontSize = "10px";
    const padding = "10px";
    const width = "auto";
    return {
      style: {
        backgroundColor,
        borderRadius,
        opacity,
        color,
        border,
        display,
        fontSize,
        padding,
        width,
      },
    };
  };

  return (
    <div className="p-5">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "82vh", width: "100%" }}
        className="bg-white shadow-sm p-4"
        views={[Views.MONTH, Views.DAY, Views.WEEK]}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default CalenderComponent;
