let students = JSON.parse(localStorage.getItem("students")) || [];

const studentForm = document.getElementById("studentForm");

if (studentForm) {

    studentForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const student = {

            name: document.getElementById("name").value,

            register: document.getElementById("register").value,

            department: document.getElementById("department").value,

            attendance: Number(
                document.getElementById("attendance").value
            ),

            mark1: Number(
                document.getElementById("mark1").value
            ),

            mark2: Number(
                document.getElementById("mark2").value
            ),

            mark3: Number(
                document.getElementById("mark3").value
            )

        };

        students.push(student);

        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        alert("Student added successfully!");

        studentForm.reset();

        displayStudents();

    });

    displayStudents();
}


function displayStudents() {

    const table = document.getElementById("studentTable");

    if (!table) return;

    table.innerHTML = "";

    students.forEach(function(student, index) {

        const total =
            student.mark1 +
            student.mark2 +
            student.mark3;

        table.innerHTML += `

            <tr>

                <td>${student.name}</td>

                <td>${student.register}</td>

                <td>${student.department}</td>

                <td>${student.attendance}%</td>

                <td>${total}/300</td>

                <td>
                    <button onclick="deleteStudent(${index})">
                        Delete
                    </button>
                </td>

            </tr>

        `;

    });

}


function deleteStudent(index) {

    if (confirm("Delete this student?")) {

        students.splice(index, 1);

        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        displayStudents();

    }

}


function searchStudent() {

    const register =
        document.getElementById("searchRegister").value.trim();

    const student =
        students.find(
            s => s.register === register
        );

    const result =
        document.getElementById("studentResult");

    if (!student) {

        result.innerHTML = `
            <div class="card">
                <h3>Student not found</h3>
                <p>Please check the register number.</p>
            </div>
        `;

        return;
    }

    const total =
        student.mark1 +
        student.mark2 +
        student.mark3;

    const average = total / 3;

    let grade;

    if (average >= 90) {
        grade = "A+";
    }
    else if (average >= 80) {
        grade = "A";
    }
    else if (average >= 70) {
        grade = "B";
    }
    else if (average >= 60) {
        grade = "C";
    }
    else if (average >= 50) {
        grade = "D";
    }
    else {
        grade = "F";
    }

    result.innerHTML = `

        <div class="card">

            <h2>Student Details</h2>

            <p>
                <strong>Name:</strong>
                ${student.name}
            </p>

            <p>
                <strong>Register Number:</strong>
                ${student.register}
            </p>

            <p>
                <strong>Department:</strong>
                ${student.department}
            </p>

            <hr>

            <h3>Attendance</h3>

            <p>
                Attendance:
                <strong>${student.attendance}%</strong>
            </p>

            <hr>

            <h3>Result</h3>

            <table>

                <tr>
                    <th>Subject</th>
                    <th>Mark</th>
                </tr>

                <tr>
                    <td>Subject 1</td>
                    <td>${student.mark1}</td>
                </tr>

                <tr>
                    <td>Subject 2</td>
                    <td>${student.mark2}</td>
                </tr>

                <tr>
                    <td>Subject 3</td>
                    <td>${student.mark3}</td>
                </tr>

                <tr>
                    <th>Total</th>
                    <th>${total}/300</th>
                </tr>

            </table>

            <br>

            <p>
                <strong>Average:</strong>
                ${average.toFixed(2)}%
            </p>

            <p>
                <strong>Grade:</strong>
                ${grade}
            </p>

        </div>

    `;

}
