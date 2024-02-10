document.addEventListener('DOMContentLoaded', function () {
  displayRecords();
});

function createOrUpdateRecord() {
  const id = document.getElementById('id').value;
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  if (!id || !name || !email) {
      alert('ID, Name, and Email are required.');
      return;
  }

  // Validate ID (numeric)
  if (!/^\d+$/.test(id)) {
    alert('ID should be a number.');
    return;
}

// Validate Name (string)
if (!/^[a-zA-Z]+$/.test(name)) {
    alert('Name should only contain letters.');
    return;
}

// Validate Email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
    alert('Invalid email format.');
    return;
}

  const record = {
      id,
      name,
      email
  };

  let records = JSON.parse(localStorage.getItem('records')) || [];

  // Check if the record with the given ID already exists
  const existingRecordIndex = records.findIndex(rec => rec.id === id);

  if (existingRecordIndex !== -1) {
      // Update existing record
      records[existingRecordIndex] = record;
  } else {
      // Create new record
      records.push(record);
  }

  localStorage.setItem('records', JSON.stringify(records));

  displayRecords();
  clearForm();
}

function displayRecords() {
  const recordsDiv = document.getElementById('records');
  recordsDiv.innerHTML = '';

  const records = JSON.parse(localStorage.getItem('records')) || [];

  records.forEach((record, index) => {
      const recordDiv = document.createElement('div');
      recordDiv.classList.add('record');
      recordDiv.innerHTML = `
          <p><strong>ID:</strong> ${record.id}</p>
          <p><strong>Name:</strong> ${record.name}</p>
          <p><strong>Email:</strong> ${record.email}</p>
          <button onclick="updateRecord(${index})">Update</button>
          <button onclick="deleteRecord(${index})">Delete</button>
      `;
      recordsDiv.appendChild(recordDiv);
  });
}

function updateRecord(index) {
  let records = JSON.parse(localStorage.getItem('records')) || [];
  const record = records[index];

  document.getElementById('id').value = record.id;
  document.getElementById('name').value = record.name;
  document.getElementById('email').value = record.email;
}

function deleteRecord(index) {
  let records = JSON.parse(localStorage.getItem('records')) || [];
  records.splice(index, 1);
  localStorage.setItem('records', JSON.stringify(records));
  displayRecords();
}

function clearForm() {
  document.getElementById('id').value = '';
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
}

