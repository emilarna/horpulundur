// Dummy booking data
const bookings = [
    { id: 1, checkinDate: '2024-09-01', checkoutDate: '2024-09-05', customerName: 'Emil Árnason' },
    { id: 2, checkinDate: '2024-09-07', checkoutDate: '2024-09-10', customerName: 'Gústaf Jónsson' },
    { id: 3, checkinDate: '2024-09-12', checkoutDate: '2024-09-15', customerName: 'Árni Gústafsson' },
    { id: 4, checkinDate: '2024-10-12', checkoutDate: '2024-10-15', customerName: 'Rosalie Guay' },
    { id: 5, checkinDate: '2024-10-29', checkoutDate: '2024-11-03', customerName: 'Hulda Gústafsdóttir' },
    { id: 6, checkinDate: '2024-11-12', checkoutDate: '2024-11-15', customerName: 'Unknown Guest' },

];

// Function to get all bookings
function getAllBookings() {
    return bookings;
}

function displayBookings() {
    const bookingsTableBody = document.querySelector('#bookingsTable tbody');

  
    const allBookings = getAllBookings();

    allBookings.forEach(booking => {


        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = booking.id;
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = booking.customerName;
        row.appendChild(nameCell);

        const checkinCell = document.createElement('td');
        checkinCell.textContent = booking.checkinDate;
        row.appendChild(checkinCell);

        const checkoutCell = document.createElement('td');
        checkoutCell.textContent = booking.checkoutDate;
        row.appendChild(checkoutCell);

        bookingsTableBody.appendChild(row);




    });

}

displayBookings();