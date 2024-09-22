import React, { useState } from "react";
import "./EventsStyle.css";
import EventList from "./EventList";

function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const openPopup = (event) => {
    setSelectedEvent(event);
  };

  const closePopup = () => {
    setSelectedEvent(null);
  };

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
          <div key={event.id} className="event-card" onClick={() => openPopup(event)} tabIndex={0}>
            <h3 className="event-title">{event.title}</h3>
            <p className="event-date">{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p className="event-description">{event.description}</p>
          </div>
        ))}
      </div>
      {selectedEvent && (
        <div className="event-popup-overlay" onClick={closePopup}>
          <div className="event-popup" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedEvent.title}</h2>
            <p><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p><strong>Location:</strong> {selectedEvent.location}</p>
            <p><strong>Fee:</strong> {selectedEvent.fee}</p>
            <p><strong>Description:</strong></p>
            <p>{selectedEvent.fullDescription}</p>
            <button className="close-popup" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventsPage;
