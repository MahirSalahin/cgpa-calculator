let courseCounter = 1;

function addCourseInput() {
    const courseInputsDiv = document.getElementById('courseInputs');
    const courseDiv = document.createElement('div');
    courseDiv.className = 'course-input';

    const inputContainer = document.createElement('div');
    inputContainer.className = 'input-container';
    inputContainer.innerHTML = `
    <input type="text" id="course${courseCounter}Name" value="Course ${courseCounter}" required>
    <input type="number" id="course${courseCounter}Credit" placeholder="Credit" min="0.25" step="0.25" required>
    <select id="course${courseCounter}Grade" required>
      <option value="4.00">A+</option>
      <option value="3.75">A</option>
      <option value="3.50">A-</option>
      <option value="3.25">B+</option>
      <option value="3.00">B</option>
      <option value="2.75">B-</option>
      <option value="2.50">C+</option>
      <option value="2.25">C</option>
      <option value="2.00">D</option>
      <option value="0.00">F</option>
    </select>
    <button type="button" class="delete-btn" onclick="removeCourseInput(this)">X</button>
  `;

    courseDiv.appendChild(inputContainer);
    courseInputsDiv.appendChild(courseDiv);
    courseCounter++;
}
addCourseInput();
function removeCourseInput(button) {
    const courseInputDiv = button.parentElement.parentElement;
    courseInputDiv.remove();
    // Update courseCounter after removing a course input
    courseCounter = document.querySelectorAll('.course-input').length + 1;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous content
}

function calculateCGPA() {
    let totalGradePoints = 0;
    let totalCredits = 0;

    for (let i = 1; i < courseCounter; i++) {
        const gradeSelect = document.getElementById(`course${i}Grade`);
        const selectedGrade = parseFloat(gradeSelect.value);

        const creditInput = document.getElementById(`course${i}Credit`);
        const credits = parseFloat(creditInput.value);

        totalGradePoints += selectedGrade * credits;
        totalCredits += credits;
    }

    const cgpa = (totalGradePoints / totalCredits).toFixed(2);
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous content

    // Split the CGPA into digits
    const digits = ("CGPA: " + cgpa).split('');

    digits.forEach((digit, index) => {
        const span = document.createElement('span');
        span.textContent = digit;
        span.style.animation = `fadeIn 1.0s ${index * 0.1}s forwards`; // Adjust delay as needed
        resultDiv.appendChild(span);
    });

    resultDiv.style.display = 'flex'; // Display as flex to show digits horizontally
}

function toggleMode() {
    const body = document.querySelector('body');
    const containers = document.querySelectorAll('.container');
    const h1 = document.querySelector('h1');
    const header = document.querySelector('header');
    const inputs = document.querySelectorAll('.course-input input, .course-input select');
    const buttons = document.querySelectorAll('button.toggle-mode');
    const resultDiv = document.getElementById('result');

    body.classList.toggle('dark-mode');
    containers.forEach(container => container.classList.toggle('dark-mode'));
    h1.classList.toggle('dark-mode');
    header.classList.toggle('dark-mode');
    inputs.forEach(input => input.classList.toggle('dark-mode'));
    buttons.forEach(button => {
        button.classList.toggle('dark-mode');
        button.textContent = body.classList.contains('dark-mode') ? 'Light' : 'Dark';
    });

    resultDiv.classList.toggle('dark-mode');
}