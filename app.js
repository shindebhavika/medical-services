
document.addEventListener('DOMContentLoaded', function() {
  // Load user data from local storage
  var user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    alert('No user data found. Please log in.');
    window.location.href = './login.html';
  } else {
    document.getElementById('username').textContent = user.username;
    document.getElementById('userPhoto').src = user.photo;
  }
});

function logout() {

  window.location.href = './login.html';
}

function openModal(service) {
  document.getElementById('service').value = service;
  document.getElementById('appointmentModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('appointmentModal').style.display = 'none';
}

function bookAppointment() {
  var fullName = document.getElementById('fullName').value;
  var appointmentDate = document.getElementById('appointmentDate').value;
  var appointmentMode = document.getElementById('appointmentMode').value;
  var appointmentTime = document.getElementById('appointmentTime').value;
  var service = document.getElementById('service').value;

  // Get existing appointments from localStorage or initialize an empty array
  var appointments = JSON.parse(localStorage.getItem('appointments')) || [];

  // New appointment object
  var newAppointment = {
    fullName: fullName,
    appointmentDate: appointmentDate,
    appointmentMode: appointmentMode,
    appointmentTime: appointmentTime,
    service: service
  };

  // Add the new appointment to the array
  appointments.push(newAppointment);

  // Store the updated array back into localStorage
  localStorage.setItem('appointments', JSON.stringify(appointments));

  // Optionally, you can clear the form fields or close the booking modal here
  document.getElementById('appointmentForm').reset();
  closeModal();

  return false; // Prevent form submission
}

function displayAppointmentDetails(appointment) {
  var appointmentDetails = `
    <h2>Appointment Details</h2>
    <p><strong>Service:</strong> ${appointment.service}</p>
    <p><strong>Full Name:</strong> ${appointment.fullName}</p>
    <p><strong>Date:</strong> ${appointment.appointmentDate}</p>
    <p><strong>Time:</strong> ${appointment.appointmentTime}</p>
    <p><strong>Mode:</strong> ${appointment.appointmentMode}</p>
  `;

  var appointmentDetailsContainer = document.getElementById('appointmentDetails');
  appointmentDetailsContainer.innerHTML = appointmentDetails;

  document.getElementById('appointmentDetailsModal').style.display = 'block';
}

function closeAppointmentDetails() {
  document.getElementById('appointmentDetailsModal').style.display = 'none';
}

function viewAppointments() {
  var appointments = JSON.parse(localStorage.getItem('appointments'));

  if (appointments && appointments.length > 0) {
    // For simplicity, only displaying the first appointment in this example
    displayAppointmentDetails(appointments[0]);
  } else {
    alert('No appointments found.');
  }
}
