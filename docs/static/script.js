




// Function to check if a date is booked
function isDateBooked(date) {
    return bookedDates.includes(date.toISOString().split('T')[0]);
}

// Dummy booking data
const bookings = [
    { id: 1, checkinDate: '2024-09-01', checkoutDate: '2024-09-05', customerName: 'Emil Árnason' },
    { id: 2, checkinDate: '2024-09-07', checkoutDate: '2024-09-10', customerName: 'Gústaf Jónsson' },
    { id: 3, checkinDate: '2024-09-12', checkoutDate: '2024-09-15', customerName: 'Árni Gústafsson' }
];

// Function to check if a date is booked
function isDateBooked(date) {
    return bookings.some(booking => {
        const bookedCheckin = new Date(booking.checkinDate);
        const bookedCheckout = new Date(booking.checkoutDate);
        return date >= bookedCheckin && date < bookedCheckout; // Compare date ranges
    });
}

// Initialize Flatpickr for check-in and check-out fields
flatpickr("#checkin", {
    enableTime: false,
    dateFormat: "Y-m-d",
    onDayCreate: function (dObj, dStr, fp, dayElem) {
        const date = dayElem.dateObj;
        if (isDateBooked(date)) {
            dayElem.classList.add("booked-date"); // Add class to booked dates
        }
    }
});

flatpickr("#checkout", {
    enableTime: false,
    dateFormat: "Y-m-d",
    disable: [
        {
            from: "2024-09-01",
            to: "2024-09-04"
        },
        {
            from: "2025-09-01",
            to: "2025-12-01"
        }
    ],
    onDayCreate: function (dObj, dStr, fp, dayElem) {
        const date = dayElem.dateObj;
        if (isDateBooked(date)) {
            dayElem.classList.add("booked-date"); // Add class to booked dates
        }
    }
});



// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    // Get the values of check-in and check-out
    const checkinValue = new Date(document.getElementById('checkin').value);
    const checkoutValue = new Date(document.getElementById('checkout').value);

    // Validate input
    if (!checkinValue || !checkoutValue || checkinValue >= checkoutValue) {
        document.getElementById('availability-message').textContent = 'Please enter valid check-in and check-out dates.';
        document.getElementById('availability-message').style.color = 'gold';

        return;
    }

    // Check availability
    const isAvailable = !bookings.some(booking => {
        const bookedCheckin = new Date(booking.checkinDate);
        const bookedCheckout = new Date(booking.checkoutDate);
        return (checkinValue < bookedCheckout && checkoutValue > bookedCheckin);
    });

    // Update the availability message
    const messageElement = document.getElementById('availability-message');
    if (isAvailable) {
        messageElement.textContent = 'The selected dates are available!';
        messageElement.style.color = 'green';
    } else {
        messageElement.textContent = 'The selected dates are not available.';
        messageElement.style.color = 'red';
    }
}

// Attach the event listener to the form
document.getElementById('booking-form').addEventListener('submit', handleFormSubmit);