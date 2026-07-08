async function apiFetch(url, options = {}) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

async function loadContacts() {
    try {
        const contacts = await apiFetch('/api/contacts');
        const contactsList = document.getElementById('contacts-list');
        contactsList.innerHTML = '';
        contacts.forEach(contact => {
            const li = document.createElement('li');
            li.textContent = `${contact.firstName} ${contact.lastName} - ${contact.email} - ${contact.birthday} - ${contact.favoriteColor}`;
            contactsList.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading contacts:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadContacts();
});
