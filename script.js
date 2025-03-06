const loginForm = document.getElementById('login-form');
const loginSection = document.getElementById('login-section');
const stateSelectionSection = document.getElementById('state-selection');

// Handle login button click (or form submission)
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();  // Prevent default form submission

    // You can validate the login credentials here if necessary

    // Hide the login section and show the state selection section
    loginSection.style.display = 'none';  // Hide the login section
    stateSelectionSection.style.display = 'block';  // Show the state selection section
});

// State selection
document.getElementById('load-universities').addEventListener('click', function () {
    const selectedState = document.getElementById('state-dropdown').value;

    // Define universities for each state
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

    // Fetch universities based on the selected state
    const universities = universitiesByState[selectedState];
      // Get the universities array for selected state
      console.log(selectedState);

    const universitiesList = document.getElementById('universities');
    universitiesList.innerHTML = '';  // Clear existing list

    if (universities && universities.length > 0) {
        universities.forEach(university => {
            const li = document.createElement('li');
            const universityLink = document.createElement('a');
            universityLink.href = '#';  // You can replace the # with an actual link if needed
            universityLink.textContent = university;

            universityLink.addEventListener('click', function () {
                showCollegeDetails(university);
            });

            li.appendChild(universityLink);
            universitiesList.appendChild(li);
        });
    } else {
        // If no universities are found for the selected state, show a message
        universitiesList.innerHTML = '<li>No universities found for the selected state.</li>';
    }

    // Hide the state selection section and show the university list section
    stateSelectionSection.style.display = 'none';
    document.getElementById('university-list').style.display = 'block';
});

// Show college details and stream options
function showCollegeDetails(university) {
    document.getElementById('university-list').style.display = 'none';
    document.getElementById('college-details').style.display = 'block';

    // Display mock college details for the selected university (you can replace with real data later)
    document.getElementById('college-info').innerHTML = `
        <p><strong>${university}</strong></p>
        <p>Course Fees: $10,000/year</p>
        <p>Placement: 90% placement rate</p>
        <p>Infrastructure: Excellent facilities</p>
    `;
}

// Handle stream selection
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
