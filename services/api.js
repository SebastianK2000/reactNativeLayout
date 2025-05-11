const BASE_URL = 'https://localhost:7161/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Wystąpił błąd');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

// ---------- ACCOMMODATION ----------
export const getAccommodations = async () => {
  try {
    const response = await fetch(`${BASE_URL}/Accommodation`);
    const data = await handleResponse(response);
    console.log('Odpowiedź z API:', data);

    return data.map((item) => ({
      ...item,
      id: item.iDaccommodation,
    }));
  } catch (error) {
    console.error('Błąd pobierania noclegów:', error);
    throw error;
  }
};

export const getAccommodationById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/Accommodation/${id}`);
    return await handleResponse(response);
  } catch (error) {
    console.error(`Błąd pobierania noclegu o ID ${id}:`, error);
    throw error;
  }
};

export const createAccommodation = async (newItem) => {
  try {
    const response = await fetch(`${BASE_URL}/Accommodation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Błąd tworzenia noclegu:', error);
    throw error;
  }
};

export const updateAccommodation = async (id, updatedItem) => {
  try {
    const response = await fetch(`${BASE_URL}/Accommodation/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Błąd aktualizacji noclegu:', error);
    throw error;
  }
};

export const deleteAccommodation = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/Accommodation/${id}`, {
      method: 'DELETE',
    });
    await handleResponse(response);
    return true;
  } catch (error) {
    console.error('Błąd usuwania noclegu:', error);
    throw error;
  }
};

// ---------- USER ----------
export const getUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/User`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Błąd pobierania użytkowników:', error);
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    const response = await fetch(`${BASE_URL}/User`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Błąd tworzenia użytkownika:', error);
    throw error;
  }
};

export const updateUser = async (id, updatedUser) => {
  try {
    const response = await fetch(`${BASE_URL}/User/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Błąd aktualizacji użytkownika:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/User/${id}`, { method: 'DELETE' });
    await handleResponse(response);
    return true;
  } catch (error) {
    console.error('Błąd usuwania użytkownika:', error);
    throw error;
  }
};

// ---------- BOOKING ----------
export const getBookings = async () => {
  try {
    const response = await fetch(`${BASE_URL}/Booking`);
    const data = await handleResponse(response);

    return data.map(item => ({
      ...item,
      id: item.iDbooking,
    }));
  } catch (error) {
    console.error('Błąd pobierania rezerwacji:', error);
    throw error;
  }
};

export const createBooking = async (booking) => {
  try {
    const response = await fetch(`${BASE_URL}/Booking`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Błąd tworzenia rezerwacji:', error);
    throw error;
  }
};

export const updateBooking = async (id, updatedBooking) => {
  try {
    const response = await fetch(`${BASE_URL}/Booking/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedBooking),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Błąd aktualizacji rezerwacji:', error);
    throw error;
  }
};

export const deleteBooking = async (id) => {
  const response = await fetch(`${BASE_URL}/Booking/${id}`, {
    method: 'DELETE',
  });
  return await handleResponse(response);
};


// ---------- PAYMENT ----------
export const getPayments = async () => {
  try {
    const response = await fetch(`${BASE_URL}/Payment`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Błąd pobierania płatności:', error);
    throw error;
  }
};

export const createPayment = async (payment) => {
  try {
    if (payment.paymentDate) {
      const date = new Date(payment.paymentDate);
      payment.paymentDate = date.toISOString();
    }

    const paymentData = {
      amount: payment.amount,
      paymentMethod: payment.PaymentMethod,
      status: payment.Status,
      paymentDate: payment.paymentDate,
    };

    const response = await fetch(`${BASE_URL}/Payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('Błąd tworzenia płatności:', error);
    throw error;
  }
};



export const updatePayment = async (id, updatedPayment) => {
  try {
    const response = await fetch(`${BASE_URL}/Payment/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPayment),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Błąd aktualizacji płatności:', error);
    throw error;
  }
};

export const deletePayment = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/Payment/${id}`, { method: 'DELETE' });
    await handleResponse(response);
    return true;
  } catch (error) {
    console.error('Błąd usuwania płatności:', error);
    throw error;
  }
};

// ---------- TEAM ----------
export const getTeams = async () => {
  try {
    const response = await fetch(`${BASE_URL}/Team`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Błąd pobierania zespołów:', error);
    throw error;
  }
};

export const createTeam = async (team) => {
  try {
    const response = await fetch(`${BASE_URL}/Team`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(team),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Błąd tworzenia zespołu:', error);
    throw error;
  }
};

export const updateTeam = async (id, updatedTeam) => {
  try {
    const response = await fetch(`${BASE_URL}/Team/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTeam),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Błąd aktualizacji zespołu:', error);
    throw error;
  }
};

export const deleteTeam = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/Team/${id}`, { method: 'DELETE' });
    await handleResponse(response);
    return true;
  } catch (error) {
    console.error('Błąd usuwania zespołu:', error);
    throw error;
  }
};

// ---------- TEAM MEMBER ----------
export const getTeamMembers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/TeamMember`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Błąd pobierania członków zespołu:', error);
    throw error;
  }
};

export const createTeamMember = async (teamMember) => {
  try {
    const response = await fetch(`${BASE_URL}/TeamMember`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teamMember),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Błąd dodawania członka zespołu:', error);
    throw error;
  }
};

export const updateTeamMember = async (id, updatedTeamMember) => {
  try {
    const response = await fetch(`${BASE_URL}/TeamMember/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTeamMember),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Błąd aktualizacji członka zespołu:', error);
    throw error;
  }
};

export const deleteTeamMember = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/TeamMember/${id}`, { method: 'DELETE' });
    await handleResponse(response);
    return true;
  } catch (error) {
    console.error('Błąd usuwania członka zespołu:', error);
    throw error;
  }
};

// ---------- TRIP ----------
export const getTrips = async () => {
  try {
    const response = await fetch(`${BASE_URL}/Trip`);
    const data = await handleResponse(response);
    return data.map(item => ({
      ...item,
      id: item.iDtrip, // 👈 ZGODNIE z nazwą z backendu
    }));
  } catch (error) {
    console.error('Błąd pobierania wyjazdów:', error);
    throw error;
  }
};
export const createTrip = async (trip) => {
  try {
    const response = await fetch(`${BASE_URL}/Trip`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trip),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Błąd tworzenia wyjazdu:', error);
    throw error;
  }
};

export const updateTrip = async (id, updatedTrip) => {
  try {
    const response = await fetch(`${BASE_URL}/Trip/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTrip),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Błąd aktualizacji wyjazdu:', error);
    throw error;
  }
};

export const deleteTrip = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/Trip/${id}`, { method: 'DELETE' });
    await handleResponse(response);
    return true;
  } catch (error) {
    console.error('Błąd usuwania wyjazdu:', error);
    throw error;
  }
};

// ---------- TRIP USER ----------
export const getTripUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/TripUser`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Błąd pobierania uczestników wyjazdów:', error);
    throw error;
  }
};

export const createTripUser = async (tripUser) => {
  try {
    const response = await fetch(`${BASE_URL}/TripUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tripUser),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Błąd tworzenia uczestnika wyjazdu:', error);
    throw error;
  }
};

export const updateTripUser = async (id, updatedTripUser) => {
  try {
    const response = await fetch(`${BASE_URL}/TripUser/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTripUser),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Błąd aktualizacji uczestnika wyjazdu:', error);
    throw error;
  }
};

export const deleteTripUser = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/TripUser/${id}`, { method: 'DELETE' });
    await handleResponse(response);
    return true;
  } catch (error) {
    console.error('Błąd usuwania uczestnika wyjazdu:', error);
    throw error;
  }
};
