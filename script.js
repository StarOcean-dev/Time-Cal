// Initialize events
let events = {};

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
        li.innerText = `${index + 1}. ${eventName} on ${events[eventName]}`;
        li.addEventListener('click', () => calculateDaysUntil(eventName));
        eventsUl.appendChild(li);
    });
}

// Add new event
document.getElementById('add-event-btn').addEventListener('click', () => {
    const eventName = document.getElementById('event-name').value;
    const eventDate = document.getElementById('event-date').value;

    if (eventName && eventDate) {
        events[eventName] = eventDate;
        saveEvents();
        renderEvents();
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

// Initialize app
loadEvents();
renderEvents();

