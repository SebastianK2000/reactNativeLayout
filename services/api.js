const BASE_URL = 'http://192.168.0.178:5128/api';

export const getAccommodations = async () => {
  try {
    const response = await fetch(`${BASE_URL}/Accommodation`);
    if (!response.ok) throw new Error('Błąd podczas pobierania danych');
    return await response.json();
  } catch (error) {
    console.error('Błąd:', error);
    throw error;
  }
};

export const getAccommodationById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Nie znaleziono elementu');
    return await response.json();
  } catch (error) {
    console.error('Błąd:', error);
    throw error;
  }
};

export const createAccommodation = async (newItem) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });
    if (!response.ok) throw new Error('Nie udało się dodać');
    return await response.json();
  } catch (error) {
    console.error('Błąd:', error);
    throw error;
  }
};

export const updateAccommodation = async (id, updatedItem) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    });
    if (!response.ok) throw new Error('Nie udało się zaktualizować');
    return await response.json();
  } catch (error) {
    console.error('Błąd:', error);
    throw error;
  }
};

export const deleteAccommodation = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Nie udało się usunąć');
    return true;
  } catch (error) {
    console.error('Błąd:', error);
    throw error;
  }
};


// ---------- USER ----------
export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/User`);
  return await response.json();
};

export const createUser = async (user) => {
  const response = await fetch(`${BASE_URL}/User`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return await response.json();
};

export const deleteUser = async (id) => {
  await fetch(`${BASE_URL}/User/${id}`, { method: 'DELETE' });
};

// ---------- BOOKING ----------
export const getBookings = async () => {
  const response = await fetch(`${BASE_URL}/Booking`);
  return await response.json();
};

export const createBooking = async (booking) => {
  const response = await fetch(`${BASE_URL}/Booking`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(booking),
  });
  return await response.json();
};

export const deleteBooking = async (id) => {
  await fetch(`${BASE_URL}/Booking/${id}`, { method: 'DELETE' });
};

// ---------- PAYMENT ----------
export const getPayments = async () => {
  const response = await fetch(`${BASE_URL}/Payment`);
  return await response.json();
};

export const createPayment = async (payment) => {
  const response = await fetch(`${BASE_URL}/Payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payment),
  });
  return await response.json();
};

export const deletePayment = async (id) => {
  await fetch(`${BASE_URL}/Payment/${id}`, { method: 'DELETE' });
};

// ---------- TEAM ----------
export const getTeams = async () => {
  const response = await fetch(`${BASE_URL}/Team`);
  return await response.json();
};

export const createTeam = async (team) => {
  const response = await fetch(`${BASE_URL}/Team`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(team),
  });
  return await response.json();
};

export const deleteTeam = async (id) => {
  await fetch(`${BASE_URL}/Team/${id}`, { method: 'DELETE' });
};

// ---------- TEAM MEMBER ----------
export const getTeamMembers = async () => {
  const response = await fetch(`${BASE_URL}/TeamMember`);
  return await response.json();
};

export const createTeamMember = async (teamMember) => {
  const response = await fetch(`${BASE_URL}/TeamMember`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(teamMember),
  });
  return await response.json();
};

export const deleteTeamMember = async (id) => {
  await fetch(`${BASE_URL}/TeamMember/${id}`, { method: 'DELETE' });
};

// ---------- TRIP ----------
export const getTrips = async () => {
  const response = await fetch(`${BASE_URL}/Trip`);
  return await response.json();
};

export const createTrip = async (trip) => {
  const response = await fetch(`${BASE_URL}/Trip`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(trip),
  });
  return await response.json();
};

export const deleteTrip = async (id) => {
  await fetch(`${BASE_URL}/Trip/${id}`, { method: 'DELETE' });
};

// ---------- TRIP USER ----------
export const getTripUsers = async () => {
  const response = await fetch(`${BASE_URL}/TripUser`);
  return await response.json();
};

export const createTripUser = async (tripUser) => {
  const response = await fetch(`${BASE_URL}/TripUser`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tripUser),
  });
  return await response.json();
};

export const deleteTripUser = async (id) => {
  await fetch(`${BASE_URL}/TripUser/${id}`, { method: 'DELETE' });
};