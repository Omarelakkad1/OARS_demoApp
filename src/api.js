import axios from 'axios';

const API_BASE_URL = 'http://localhost/MAIN%20REPO/OARS_demoApp/admin';

const handleApiResponse = (response) => {
  if (response.data && (response.data.status === 'success' || response.data.message)) {
    return response.data;
  } else {
    throw new Error(response.data.error || 'An error occurred');
  }
};

export const fetchEvents = async () => {
  try {
    console.log('Fetching events from:', `${API_BASE_URL}/api_events.php`);
    const response = await axios.get(`${API_BASE_URL}/api_events.php`);
    console.log('Fetch events response:', response.data);
    return handleApiResponse(response).data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api_events.php`, {
      action: 'create',
      ...eventData
    });
    return handleApiResponse(response);
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api_events.php`, {
      action: 'update',
      id: eventId,
      ...eventData
    });
    return handleApiResponse(response);
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api_events.php`, {
      action: 'delete',
      id: eventId
    });
    return handleApiResponse(response);
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

export const fetchMembers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api_members.php`);
    return handleApiResponse(response).data;
  } catch (error) {
    console.error('Error fetching members:', error);
    throw error;
  }
};

export const registerMember = async (memberData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api_members.php`, memberData);
    return handleApiResponse(response);
  } catch (error) {
    console.error('Error registering member:', error);
    throw error;
  }
};

export const checkMemberStatus = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api_members.php?action=check_status&email=${email}`);
    return handleApiResponse(response).isRegistered;
  } catch (error) {
    console.error('Error checking member status:', error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api_auth.php`, {
      action: 'login',
      email,
      password
    });
    return handleApiResponse(response);
  } catch (error) {
    console.error('Error logging in:', error);
    if (error.response && error.response.data) {
      if (error.response.data.error === 'Account not found') {
        throw new Error('This account does not exist. Please check your credentials or sign up.');
      } else if (error.response.data.error === 'Invalid credentials') {
        throw new Error('Invalid email or password. Please try again.');
      }
    }
    throw new Error('An error occurred during login. Please try again later.');
  }
};

export const signup = async (firstName, lastName, email, phone, password) => {
  try {
    console.log('Sending signup request:', { firstName, lastName, email, phone });
    const response = await axios.post(`${API_BASE_URL}/api_auth.php`, {
      action: 'signup',
      firstName,
      lastName,
      email,
      phone,
      password
    });
    console.log('Signup response:', response.data);
    return handleApiResponse(response);
  } catch (error) {
    console.error('Error signing up:', error);
    console.error('Error details:', error.response ? error.response.data : 'No response data');
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api_auth.php`, {
      action: 'logout'
    });
    return handleApiResponse(response);
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const submitFeedback = async (feedbackData) => {
  try {
    console.log('Submitting feedback:', feedbackData);
    const response = await axios.post(`${API_BASE_URL}/api_feedback.php`, feedbackData);
    console.log('Feedback submission response:', response.data);
    return handleApiResponse(response);
  } catch (error) {
    console.error('Error submitting feedback:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      console.error('Error request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};