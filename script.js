// Initialize events
let events = {};
let editingEvent = null; // Track if we're editing an event

// Load events from storage
function loadEvents() {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
        events = JSON.parse(storedEvents);
    }
}

// Save events to localStorage
function saveEvents() {
    localStorage.setItem('events', JSON.stringify(events));
}

// Render events list
function renderEvents() {
    const eventsUl = document.getElementById('events');
    eventsUl.innerHTML = ''; // Clear existing events

    Object.keys(events).forEach((eventName, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${index + 1}. ${eventName} on ${events[eventName]}`;
        
        // Add view button
        const viewBtn = document.createElement('button');
        viewBtn.innerText = 'View';
        viewBtn.classList.add('action-btn');
        viewBtn.addEventListener('click', () => calculateDaysUntil(eventName));
        li.appendChild(viewBtn);

        // Add edit button
        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        editBtn.classList.add('action-btn');
        editBtn.addEventListener('click', () => editEvent(eventName));
        li.appendChild(editBtn);

        // Add delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.classList.add('action-btn');
        deleteBtn.addEventListener('click', () => deleteEvent(eventName));
        li.appendChild(deleteBtn);

        eventsUl.appendChild(li);
    });
}

// Add new event
document.getElementById('add-event-btn').addEventListener('click', () => {
    const eventName = document.getElementById('event-name').value;
    const eventDate = document.getElementById('event-date').value;

    if (eventName && eventDate) {
        // If editing an existing event, remove the old one first
        if (editingEvent) {
            delete events[editingEvent];
            editingEvent = null;
            document.getElementById('add-event-btn').innerText = 'Add Event'; // Reset button text
        }

        events[eventName] = eventDate;
        saveEvents();
        renderEvents();

        // Clear input fields
        document.getElementById('event-name').value = '';
        document.getElementById('event-date').value = '';
    } else {
        alert('Please enter both the event name and date!');
    }
});

// Calculate days until event
function calculateDaysUntil(eventName) {
    const eventDate = new Date(events[eventName]);
    const today = new Date();
    const differenceInTime = eventDate.getTime() - today.getTime();
    const daysUntil = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    const outputText = daysUntil > 0
        ? `There are ${daysUntil} days until ${eventName}.`
        : daysUntil === 0
            ? `Today is the day of ${eventName}!`
            : `${eventName} has already passed.`;

    document.getElementById('days-output').innerText = outputText;
}

// Edit an event
function editEvent(eventName) {
    document.getElementById('event-name').value = eventName;
    document.getElementById('event-date').value = events[eventName];
    editingEvent = eventName; // Set the event to be edited
    document.getElementById('add-event-btn').innerText = 'Save Changes';
}

// Delete an event
function deleteEvent(eventName) {
    if (confirm(`Are you sure you want to delete the event: ${eventName}?`)) {
        delete events[eventName];
        saveEvents();
        renderEvents();
        document.getElementById('days-output').innerText = 'Event deleted.';
    }
}

// Initialize app
loadEvents();
renderEvents();
