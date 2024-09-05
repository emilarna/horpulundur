// Dummy booking data
const bookings = [
    { id: 1, checkinDate: '2024-09-01', checkoutDate: '2024-09-05', customerName: 'Emil Árnason' },
    { id: 2, checkinDate: '2024-09-07', checkoutDate: '2024-09-10', customerName: 'Gústaf Jónsson' },
    { id: 3, checkinDate: '2024-09-12', checkoutDate: '2024-09-15', customerName: 'Árni Gústafsson' },
    { id: 4, checkinDate: '2024-10-12', checkoutDate: '2024-10-15', customerName: 'Rosalie Guay' },
    { id: 5, checkinDate: '2024-10-29', checkoutDate: '2024-11-03', customerName: 'Hulda Gústafsdóttir' },
    { id: 6, checkinDate: '2024-11-12', checkoutDate: '2024-11-15', customerName: 'Unknown Guest' },

];








// Function to check if a date is booked
function isDateBooked(date) {
    return bookedDates.includes(date.toISOString().split('T')[0]);
}









// Function to check if a date is booked
function isDateBooked(date) {
    return bookings.some(booking => {
        const bookedCheckin = new Date(booking.checkinDate);
        const bookedCheckout = new Date(booking.checkoutDate);
        // Check if the date is within the booking range
        return date >= bookedCheckin && date <= bookedCheckout;
    });
}




function getDisabledDates(bookings) {
    return bookings.map(booking => ({
        from: booking.checkinDate,
        to: booking.checkoutDate
    }));
}

const disable = []
const disabledDates = [...disable, ...getDisabledDates(bookings)];




// Initialize Flatpickr for check-in and check-out fields
flatpickr("#checkin", {
    enableTime: false,
    dateFormat: "Y-m-d",
    disable: disabledDates, // Disable dates based on disabledDates array
    onDayCreate: function (dObj, dStr, fp, dayElem) {
        const date = dayElem.dateObj;
        if (isDateBooked(date)) {
            dayElem.classList.add("booked-date"); // Add class to booked dates
            dayElem.style.backgroundColor = 'red'; // Optional: make it visually red
        }
    }
});

flatpickr("#checkout", {
    enableTime: false,
    dateFormat: "Y-m-d",
    disable: disabledDates,
    onDayCreate: function (dObj, dStr, fp, dayElem) {
        const date = dayElem.dateObj;
        if (isDateBooked(date)) {
            dayElem.classList.add("booked-date"); // Add class to booked dates
            dayElem.style.backgroundColor = 'red'; // Optional: make it visually red
        }
    }
});



// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    // Get the values of check-in and check-out
    const checkinValue = new Date(document.getElementById('checkin').value);
    const checkoutValue = new Date(document.getElementById('checkout').value);

    confirmButtonElement = document.getElementById('confirm-button');

    // Validate input
    if (!checkinValue || !checkoutValue || checkinValue >= checkoutValue) {
        document.getElementById('availability-message').textContent = 'Please enter valid check-in and check-out dates.';
        document.getElementById('availability-message').style.color = 'gold';
        confirmButtonElement.style.display = "none"

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

        confirmButtonElement.textContent = "Staðfesta bókun"
        confirmButtonElement.style.display = "block"
    } else {
        messageElement.textContent = 'The selected date range is not available.';
        messageElement.style.color = 'red';
        confirmButtonElement.style.display = "none"
    }
}

// Attach the event listener to the form
document.getElementById('booking-form').addEventListener('submit', handleFormSubmit);


document.getElementById('confirm-button').addEventListener('click', function() {
    // Get the check-in and check-out values
    let checkin = document.getElementById('checkin').value;
    let checkout = document.getElementById('checkout').value;

    // Validate that both fields are filled
    if (checkin && checkout) {
        // Create a booking object
        let booking = {
            id: 9,
            checkinDate: checkin,
            checkoutDate: checkout,
            customerName: "Guest"

        };

        // Push the new booking into the 'bookings' array
        bookings.push(booking);

        // Display a confirmation message
        document.getElementById('availability-message').innerText = "Booking Confirmed!";
        confirmButtonElement.style.display = "none"

        console.log("Current bookings:", bookings); // Log the current bookings for debugging

        // Optionally clear the form fields after booking is confirmed
        document.getElementById('checkin').value = '';
        document.getElementById('checkout').value = '';
    } else {
        document.getElementById('availability-message').innerText = "Please fill in both check-in and check-out dates.";
    }
});

console.log(bookings)