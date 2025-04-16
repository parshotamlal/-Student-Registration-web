// Regular expressions for input validation
const nameRegex = /^[A-Za-z\s]+$/; // Validates name (letters and spaces)
const idRegex = /^[0-9]+$/; // Validates ID (numbers only)
const contactRegex = /^[0-9]{10}$/; // Validates contact (10 digits)

// Load students from localStorage or initialize as an empty array
let students = JSON.parse(localStorage.getItem('students')) || [];
let editIndex = null; // Track if a student is being edited

// Save students to localStorage
const saveToLocalStorage = () => {
    localStorage.setItem('students', JSON.stringify(students));
};

// Render student data in table
const renderTable = () => {
    const studentTableBody = document.getElementById('studentTableBody');
    studentTableBody.innerHTML = ''; // Clear table before re-rendering

    // Loop through students and create a row for each
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row); // Add row to table
    });
};

// Add or update student in the list
const addStudent = (student) => {
    if (editIndex === null) {
        students.push(student); // Add new student
    } else {
        students[editIndex] = student; // Update existing student
        editIndex = null; // Reset edit mode
    }
    saveToLocalStorage(); // Save to localStorage
    renderTable(); // Re-render table
};

// Pre-fill form with student details for editing
const editStudent = (index) => {
    const student = students[index];
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentID').value = student.id;
    document.getElementById('emailID').value = student.email;
    document.getElementById('contactNo').value = student.contact;
    editIndex = index; // Set edit mode
};

// Delete student from the list
const deleteStudent = (index) => {
    students.splice(index, 1); // Remove student
    saveToLocalStorage(); // Save changes to localStorage
    renderTable(); // Re-render table
};

// Form submission handler
document.getElementById('studentForm').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission

    // Get form values and trim spaces
    const name = document.getElementById('studentName').value.trim();
    const id = document.getElementById('studentID').value.trim();
    const email = document.getElementById('emailID').value.trim();
    const contact = document.getElementById('contactNo').value.trim();

    // Validate inputs
    if (!nameRegex.test(name) || !idRegex.test(id) || !contactRegex.test(contact) || !email.includes('@')) {
        alert('Invalid Input! Please check your entries.');
        return; // Stop if validation fails
    }

    const student = { name, id, email, contact }; // Create student object
    addStudent(student); // Add student to list

    // Reset form
    document.getElementById('studentForm').reset();
});

// Render table on page load
renderTable();