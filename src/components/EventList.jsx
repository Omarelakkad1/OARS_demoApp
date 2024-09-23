import React, { useState, useEffect } from 'react';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../api';
import { useAuth } from '../AuthContext';
import './EventsStyle.css';

const EventList = () => {
  const { user } = useAuth();
  const isStaff = user && user.role === 'staff';

  console.log('Current user:', user); // Debug log
  console.log('Is staff:', isStaff); // Debug log

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    fee: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchEvents();
      setEvents(data);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(`Failed to fetch events. Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setIsEditing(true);
    setSelectedEvent(null);
    setFormData({
      title: '',
      location: '',
      date: '',
      fee: ''
    });
    setError(null);
    setSuccessMessage('');
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setIsEditing(true);
    setFormData({
      title: event.title,
      location: event.location,
      date: event.date,
      fee: event.fee
    });
    setError(null);
    setSuccessMessage('');
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        setError(null);
        await deleteEvent(eventId);
        setSuccessMessage('Event deleted successfully');
        setSelectedEvent(null);
        await fetchEventData();
      } catch (err) {
        setError(`Failed to delete event. Error: ${err.message}`);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      if (selectedEvent) {
        await updateEvent(selectedEvent.id, formData);
        setSuccessMessage('Event updated successfully');
      } else {
        await createEvent(formData);
        setSuccessMessage('Event created successfully');
      }
      setIsEditing(false);
      await fetchEventData();
    } catch (err) {
      setError(`Failed to save event. Error: ${err.message}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (loading) return <div className="event-list">Loading events...</div>;

  return (
    <div className="event-list">
      <h2>{isStaff ? 'Events Management' : 'Upcoming Events'}</h2>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      {isStaff && (
        <div className="event-actions">
          <button onClick={handleCreate} className="action-button create">Create New Event</button>
          <button onClick={() => handleEdit(selectedEvent)} className="action-button edit" disabled={!selectedEvent}>Edit Selected Event</button>
          <button onClick={() => handleDelete(selectedEvent?.id)} className="action-button delete" disabled={!selectedEvent}>Delete Selected Event</button>
        </div>
      )}
      {isStaff && isEditing ? (
        <form onSubmit={handleSubmit} className="event-form">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Event Title"
            required
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Location"
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="fee"
            value={formData.fee}
            onChange={handleInputChange}
            placeholder="Fee"
            required
          />
          <button type="submit" className="action-button create">
            {selectedEvent ? 'Update Event' : 'Create Event'}
          </button>
          <button type="button" onClick={() => setIsEditing(false)} className="action-button delete">
            Cancel
          </button>
        </form>
      ) : (
        <>
          {events.length === 0 ? (
            <p>No events available at the moment.</p>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className={`event-item ${selectedEvent?.id === event.id ? 'selected' : ''}`}
                onClick={isStaff ? () => setSelectedEvent(event) : undefined}
              >
                <h4>{event.title}</h4>
                <p>Location: {event.location}</p>
                <p>Date: {event.date}</p>
                <p>Fee: RM{event.fee}</p>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default EventList;