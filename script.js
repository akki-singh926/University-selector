const loginForm = document.getElementById('login-form');
const loginSection = document.getElementById('login-section');
const stateSelectionSection = document.getElementById('state-selection');
const registrationForm = document.getElementById('registration-form');
const universitiesList = document.getElementById('universities');
const loadUniversitiesButton = document.getElementById('load-universities');
const registrationSection = document.getElementById('registration-section');

// Buttons
const goToRegisterButton = document.getElementById('go-to-register');
const backToLoginButton = document.getElementById('back-to-login');

// Navigate to Registration
goToRegisterButton.addEventListener('click', function () {
    loginSection.style.display = 'none';
    registrationSection.style.display = 'block';
});

// Navigate back to Login
backToLoginButton.addEventListener('click', function () {
    registrationSection.style.display = 'none';
    loginSection.style.display = 'block';
});

// Registration Logic
registrationForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const username = document.getElementById('new-username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('new-password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if username or email already exists
    const userExists = users.some(user => user.username === username || user.email === email);
    
    if (userExists) {
        alert('Username or email already exists. Please try another.');
        return;
    }

    // Store user data
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! You can now log in.');

    registrationSection.style.display = 'none';
    loginSection.style.display = 'block';
});

// Login Logic
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Validate credentials
    const validUser = users.find(user => user.username === username && user.password === password);

    if (validUser) {
        alert('Login successful!');
        loginSection.style.display = 'none';
        stateSelectionSection.style.display = 'block';
        const welcomeMessage = document.getElementById('welcome-message');
        welcomeMessage.classList.add('show');
    } else {
        alert('Invalid username or password');
    }
});



// Show universities based on selected state
loadUniversitiesButton.addEventListener('click', function () {
    const selectedState = document.getElementById('state-dropdown').value;

    const universitiesByState = {
        'Bihar': ['Patna University', 'Nalanda University', 'Indira Gandhi Institute of Medical Sciences'],
        'Kerela': ['University of Kerala', 'Cochin University of Science and Technology', 'National Institute of Technology Calicut'],
        'Pune': ['Savitribai Phule Pune University', 'MIT World Peace University', 'Flame University'],
        'Delhi': ['University of Delhi', 'Jawaharlal Nehru University', 'Jamia Millia Islamia'],
        'Noida': ['Shiv Nadar University', 'Jaypee Institute of Information Technology', 'Amity University'],
        'Chennai': ['Anna University', 'Indian Institute of Technology Madras', 'University of Madras'],
        'Karnataka': ['Indian Institute of Science', 'University of Bangalore', 'Manipal University'],
        'Hyderabad': ['University of Hyderabad', 'Osmania University', 'Indian School of Business']
    };

    const universities = universitiesByState[selectedState];

    universitiesList.innerHTML = ''; // Clear list before adding new data

    if (universities && universities.length > 0) {
        universities.forEach(university => {
            const li = document.createElement('li');
            const universityLink = document.createElement('a');
            universityLink.href = '#';
            universityLink.textContent = university;

            universityLink.addEventListener('click', function () {
                showCollegeDetails(university);
            });

            li.appendChild(universityLink);
            universitiesList.appendChild(li);
        });
    } else {
        universitiesList.innerHTML = '<li>No universities found for the selected state.</li>';
    }

    stateSelectionSection.style.display = 'none';
    document.getElementById('university-list').style.display = 'block';
});

// Show details of the selected university
function showCollegeDetails(university) {
    document.getElementById('university-list').style.display = 'none';
    document.getElementById('college-details').style.display = 'block';

    document.getElementById('college-info').innerHTML = `
        <p><strong>${university}</strong></p>
        <p>Course Fees: $10,000/year</p>
        <p>Placement: 90% placement rate</p>
        <p>Infrastructure: Excellent facilities</p>
    `;
}




// Stream dropdown change event
document.getElementById('stream-dropdown').addEventListener('change', function () {
    const selectedStream = this.value;
    let streamDetails = '';

    if (selectedStream === 'engineering') {
        streamDetails = '<p>Courses: Computer Science, Mechanical, Civil, etc.</p>';
    } else if (selectedStream === 'medical') {
        streamDetails = '<p>Courses: MBBS, BDS, Nursing, etc.</p>';
    } else if (selectedStream === 'arts') {
        streamDetails = '<p>Courses: History, Literature, Psychology, etc.</p>';
    }

    document.getElementById('stream-details').innerHTML = streamDetails;
});
