const nameRegex = /^[A-Za-z\s]+$/;
const idRegex = /^[0-9]+$/;
const contactRegex = /^[0-9]{10}$/;

let students = JSON.parse(localStorage.getItem('students')) || [];
let editIndex = null;

const saveToLocalStorage = () => {
    localStorage.setItem('students', JSON.stringify(students));
};

const renderTable = () => {
    const studentTableBody = document.getElementById('studentTableBody');
    studentTableBody.innerHTML = '';

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
        studentTableBody.appendChild(row);
    });
};

const addStudent = (student) => {
    if(editIndex === null) {
        students.push(student);
    } else {
        students[editIndex] = student;
        editIndex = null;
    }
    saveToLocalStorage();
    renderTable();
};

const editStudent = (index) => {
    const student = students[index];
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentID').value = student.id;
    document.getElementById('emailID').value = student.email;
    document.getElementById('contactNo').value = student.contact;
    editIndex = index;
};

const deleteStudent = (index) => {
    students.splice(index, 1);
    saveToLocalStorage();
    renderTable();
};

document.getElementById('studentForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('studentName').value.trim();
    const id = document.getElementById('studentID').value.trim();
    const email = document.getElementById('emailID').value.trim();
    const contact = document.getElementById('contactNo').value.trim();

    if (!nameRegex.test(name) || !idRegex.test(id) || !contactRegex.test(contact) || !email.includes('@')) {
        alert('Invalid Input! Please check your entries.');
        return;
    }

    const student = { name, id, email, contact };
    addStudent(student);

    document.getElementById('studentForm').reset();
});

renderTable();
