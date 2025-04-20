// Fade in the main dashboard after the page has loaded
$(document).ready(function () {
    const mainDashboard = $('#maindashboard');
    mainDashboard.fadeIn(1000);
});

// DOM element references
const inputField = document.getElementById('inputfield');
const bertResponse = document.getElementById('bertresponse');
const userinput = document.getElementById('userinput');
const bertResponseTemplate = document.getElementById('bertresponsetemplate');
let bertResponseTemplateClone = null; // Variable to hold the cloned template

// Clone the response template when the window loads
window.onload = function() {
    bertResponseTemplateClone = bertResponseTemplate.cloneNode(true);
};

// Event listener for handling user input (Enter key)
inputField.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) { // Check if Enter key is pressed
        const inputText = inputField.value.trim();
        if (inputText !== '') { // Check if input is not empty
            interact(); // Call the interaction function
        }
    }
});

// Function to handle user interaction
function interact() {
    userinput.innerHTML = ''; // Clear previous user input display
    const input = inputField.value; // Get user input
    if (input !== '') { // Check if input is not empty
        inputField.value = ''; // Clear the input field
        appendMessage(userinput, input); // Display user input in chat

        sendMessage(input).then(response => { // Send user input to backend and handle response
            appendMessage(bertResponse, response, true); // Display bot response in chat
        }).catch(error => {
            console.error('Error:', error); // Log any errors to console
            appendMessage(bertResponse, 'Error occurred while fetching response.'); // Display error message in chat
        });
    } else {
        const message = 'Please enter a value'; // Error message for empty input
        appendMessage(bertResponse, message, true); // Display error message in chat
    }
}

// Function to send user input to backend
async function sendMessage(input) {
    try {
        const response = await fetch('/chatbot', { // Send POST request to '/chatbot'
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set request header
            },
            body: JSON.stringify({ user_input: input }) // Send user input as JSON payload
        });

        const data = await response.json(); // Parse response as JSON
        return data.response; // Return bot's response
    } catch (error) {
        console.error('Error:', error); // Log any errors to console
        throw error; // Throw the error for handling in caller function
    }
}

// Function to append messages to the chat window
function appendMessage(container, content, cloneTemplate = false) {
    const message = document.createElement('div'); // Create a new div element
    message.innerHTML = `<p>${content}</p>`; // Set inner HTML of the message

    if (cloneTemplate) { // Check if a cloned template is needed
        bertResponseTemplateClone.querySelector('p').firstChild.data = message.innerText; // Set message content in cloned template
        container.appendChild(bertResponseTemplateClone); // Append cloned template to container
    } else {
        container.appendChild(message); // Append message to container
    }

    message.scrollIntoView({ behavior: 'smooth' }); // Scroll to the new message
}
