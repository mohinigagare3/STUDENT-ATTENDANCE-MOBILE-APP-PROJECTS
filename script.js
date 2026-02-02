let students = JSON.parse(localStorage.getItem("students")) || [];

function addStudent() {
    const nameInput = document.getElementById("studentName");
    const name = nameInput.value.trim();

    if (name === "") {
        alert("Please enter student name");
        return;
    }

    const student = {
        id: Date.now(),
        name: name,
        status: "Absent"
    };

    students.push(student);
    saveData();
    nameInput.value = "";
    displayStudents();
}

function displayStudents() {
    const list = document.getElementById("studentList");
    list.innerHTML = "";

    let presentCount = 0;
    let absentCount = 0;

    students.forEach(student => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.name}</td>
            <td><button class="present-btn" onclick="markPresent(${student.id})">Present</button></td>
            <td><button class="absent-btn" onclick="markAbsent(${student.id})">Absent</button></td>
            <td><button class="remove-btn" onclick="removeStudent(${student.id})">X</button></td>
        `;

        list.appendChild(row);

        if (student.status === "Present") {
            presentCount++;
        } else {
            absentCount++;
        }
    });

    document.getElementById("totalStudents").innerText = students.length;
    document.getElementById("presentCount").innerText = presentCount;
    document.getElementById("absentCount").innerText = absentCount;
}

function markPresent(id) {
    students = students.map(student => {
        if (student.id === id) {
            student.status = "Present";
        }
        return student;
    });
    saveData();
    displayStudents();
}

function markAbsent(id) {
    students = students.map(student => {
        if (student.id === id) {
            student.status = "Absent";
        }
        return student;
    });
    saveData();
    displayStudents();
}

function removeStudent(id) {
    students = students.filter(student => student.id !== id);
    saveData();
    displayStudents();
}

function saveData() {
    localStorage.setItem("students", JSON.stringify(students));
}

displayStudents();
