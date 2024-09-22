import React, { useState, useEffect } from 'react';
import { fetchMembers } from '../api';
import './EventsStyle.css';

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMembers = async () => {
      try {
        const data = await fetchMembers();
        setMembers(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch members. Please try again later.');
        setLoading(false);
      }
    };

    getMembers();
  }, []);

  if (loading) return <div className="member-list">Loading members...</div>;
  if (error) return <div className="member-list">{error}</div>;

  return (
    <div className="member-list">
      <h2>Our Members</h2>
      {members.length === 0 ? (
        <p>No members registered yet.</p>
      ) : (
        members.map((member) => (
          <div key={member.id} className="member-item">
            <h3>{member.firstName} {member.lastName}</h3>
            <p>Email: {member.email}</p>
            <p>Phone: {member.phone}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MemberList;