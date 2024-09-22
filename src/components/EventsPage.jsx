// EventsPage.jsx
import React from "react";
import "./EventsStyle.css";
import EventList from "./EventList"; // Adjust the path if necessary

function EventsPage() {
  return (
    <div className="events-container">
      <h1>Events Page</h1>
      <div className="Events-controls">
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#createEventsModal"
        >
          Create
        </button>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#editEventsModal"
        >
          Edit
        </button>
      </div>
      <div className="container">
        <ul>
          {EventList.map((event) => (
            <li key={event.id}>
              <div>
                <div
                  className="panel1 panel-default"
                  role="button"
                  tabIndex={0}
                  onClick={() => (window.location.href = event.link)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") window.location.href = event.link;
                  }}
                >
                  <div className="panel-heading">
                    <h3 className="panel-title">{event.title}</h3>
                  </div>
                  <div className="panel-body">
                    <p>{event.description}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      
    </div>
  );
}

export default EventsPage;
