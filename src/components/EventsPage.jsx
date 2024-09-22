import React from "react";
import "./EventsStyle.css";
import EventList from "./EventList";

function EventsPage() {
  return (
    <div className="events-container">
      <h1>Upcoming Events</h1>
      <div className="events-controls">
        <button className="btn-create" data-toggle="modal" data-target="#createEventsModal">
          Create Event
        </button>
        <button className="btn-edit" data-toggle="modal" data-target="#editEventsModal">
          Edit Events
        </button>
      </div>
      <div className="events-list">
        {EventList.map((event) => (
          <div key={event.id} className="event-card" onClick={() => window.location.href = event.link} tabIndex={0}>
            <h3 className="event-title">{event.title}</h3>
            <p className="event-date">{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p className="event-description">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsPage;
