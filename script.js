// Get references to DOM elements
const form = document.getElementById('gender-form');
const input = document.getElementById('name-input');
const resultBox = document.getElementById('result');

// Listen for form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent page refresh

  // Get and clean the name entered by the user
  const name = input.value.trim();

  // Validation: If input empty, show error message
  if (!name) {
    resultBox.textContent = "Please enter your name.";
    resultBox.style.color = "red";
    return;
  }

  // Show temporary loading message
  resultBox.style.color = "black";
  resultBox.textContent = "Predicting ...";

  try {
    // Make API call to Genderize API with the entered name
    const response = await fetch(`https://api.genderize.io/?name=${name}`);
    const data = await response.json();

    // If no prediction is available for the name
    if (!data.gender) {
      resultBox.textContent = `No prediction found for ${name}!`;
      resultBox.style.color = "gray";
      return;
    }

    // Extract gender and probability values
    const gender = data.gender;
    const probability = (data.probability * 100).toFixed(2);

    // Display prediction result
    resultBox.textContent = `Predicted Gender: ${gender.toUpperCase()} (${probability}%)`;

    // Add color styling based on predicted gender
    if (gender === "male") resultBox.style.color = "blue";
    else if (gender === "female") resultBox.style.color = "deeppink";

    // Fade-in animation effect
    resultBox.style.opacity = 0;
    setTimeout(() => {
      resultBox.style.opacity = 1;
    }, 100);

    // Clear input field after showing result
    input.value = "";

  } catch (error) {
    // Handles network or fetch errors
    resultBox.textContent = "Error fetching data. Please try again later.";
    resultBox.style.color = "red";
    console.error(error);
  }
});
