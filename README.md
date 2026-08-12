# Project Documentation: Chatbot Application

> **Scope** · Timeboxed technical assessment (short). Built to a brief under a fixed clock — scope decisions were deliberate.

## Introduction
This project involves developing a chatbot application using Python, Flask, and spaCy for natural language processing. The chatbot aims to provide responses to frequently asked questions (FAQs) based on user input.

## Project Structure
The project is structured as follows:
- **app.py:** Flask application handling HTTP requests and responses.
- **templates/:** HTML templates for the frontend interface.
- **static/:** Static files including CSS, JavaScript, and Bootstrap files.
- **test_app.py/:** Test script for the application.
- **faqs.json/:** Sample QA.
- **readme.md/:** Documentation and instructions.

## Technologies Used
- **Python:** Core programming language.
- **Flask:** Micro web framework for Python.
- **spaCy:** Natural language processing library.
- **Anaconda:** Python & R framework (Not necessarily required).
- **Bootstrap:** CSS framework for responsive design.

## Setup Instructions
### Prerequisites
- Python installed.
- pip package manager.
- venv (optional).

### Setting Up Environment
1. **Setting up the folders and files:**
   Unzip the provided archive.

2. **Create and activate a virtual environment (optional but recommended):**
   ```bash
   python -m venv venv
   # Activate the virtual environment
   # Windows
   venv\Scripts\activate
   # Unix/macOS
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install flask
   pip install spacy
   python -m spacy download en_core_web_lg  # (around 500MB - en_core_web_sm is sufficient for demonstration purposes)
   ```

### Running the Application
1. **Navigate to the main directory:**
   ```bash
   cd path/chat_basic_hubinit
   ```

2. **Start the Flask application:**
   ```bash
   python app.py
   ```

3. **Access the application:**
   Open a web browser and go to `http://localhost:5000`.

### Running Tests
To run the unit tests, open a different terminal, navigate to the main folder, and execute:
```bash
python test_app.py
```

## Dataset
The following questions and answers are used to set up the model, which are contained in the faqs.json file:
```json
{
    "what are your hours?": "Our working hours are 9 AM to 5 PM, Monday to Friday.",
    "how can I reset my password?": "You can reset your password by clicking on 'Forgot Password' on the login page.",
    "where is your company located?": "We are located at 123 Main Street, City, Country.",
    "what is your return policy?": "You can return any item within 30 days of purchase.",
    "how do I contact support?": "You can contact support via email at support@example.com or call us at (123) 456-7890.",
    "do you have a mobile app?": "Yes, you can download our mobile app from the App Store or Google Play Store.",
    "what payment methods do you accept?": "We accept credit/debit cards, PayPal, and bank transfers.",
    "can I change my shipping address after placing an order?": "Please contact our support team to change your shipping address after placing an order.",
    "how long does shipping take?": "Shipping times vary depending on your location. Please check our shipping policy for more details.",
    "what is your privacy policy?": "Our privacy policy outlines how we collect, use, and protect your personal information.",
    "are your products eco-friendly?": "We strive to offer eco-friendly products and are committed to sustainable practices.",
    "what are your customer service hours?": "Our customer service team is available from 8 AM to 6 PM, Monday to Saturday.",
    "how can I track my order?": "You can track your order status by logging into your account or using the tracking number provided in your confirmation email.",
    "do you offer international shipping?": "Yes, we offer international shipping to most countries. Shipping fees and delivery times may vary.",
    "what are the benefits of creating an account?": "Creating an account allows you to track your orders, save your preferences, and receive exclusive offers.",
    "how can I cancel my order?": "To cancel your order, please contact our customer support team as soon as possible with your order details.",
    "what should I do if I receive a damaged item?": "If you receive a damaged item, please contact our customer support team within 48 hours of delivery for assistance.",
    "do you offer gift wrapping services?": "Yes, we offer gift wrapping services for an additional fee. You can select this option during checkout.",
    "how can I update my billing information?": "You can update your billing information by logging into your account and navigating to the 'Billing Information' section.",
    "what is your warranty policy?": "Our warranty policy covers manufacturing defects for a period of one year from the date of purchase. Please refer to our warranty terms for more details.",
    "do you have a loyalty program?": "Yes, we have a loyalty program that rewards you with points for every purchase. You can redeem these points for discounts on future orders.",
    "what steps do you take to ensure customer data security?": "We use industry-standard encryption and security measures to protect customer data. Our privacy policy provides detailed information on how we safeguard your information.",
    "how can I unsubscribe from marketing emails?": "You can unsubscribe from marketing emails by clicking on the 'Unsubscribe' link at the bottom of any promotional email you receive from us."
}
```

## Project Details
### Functionality
The chatbot:
- Receives user queries through a web interface. I decided to reuse some of the components from my previous project which acted as the front-end interface, leaving behind elements that added some kind of value, aesthetic or otherwise. It's a Bootstrap project having individual styling and JavaScript files, and the JavaScript file was altered to allow integration with the Flask server.
- Processes queries using spaCy for NLP. I decided to settle with phrase matching and context-based matching with a high threshold prioritizing accuracy.
- Provides responses fetched from predefined FAQs stored in JSON format.

### Architecture Overview
- **Frontend:** HTML, CSS, JavaScript for user interface.
- **Backend:** Flask routes handle requests and integrate with spaCy for NLP processing.

## Challenges Faced
- **Integration with spaCy:** Balancing accuracy and recall posed a challenge, especially due to overlapping keywords in questions such as warranty, return, and privacy policy. Prioritizing accuracy was essential to ensure precise responses. Although I haven't yet determined the optimal parameters, I am managing my time carefully to avoid delays in submission, considering the time zone differences and my other internship commitments. I feel satisfied with the current balance between the time invested and the value achieved for our objectives and I hope you feel the same.
- **Frontend Design:** Aligning frontend design with user experience goals was difficult, particularly maintaining chat history due to the limitations of the initial container-based design.
- **Learning Experience:** As a beginner with Flask and similar projects, using ChatGPT as a guide/debugger/StackOverflow alternative was crucial.
- **Testing:** I decided this was the time to try testing for the first time in my life as I was manually trying all inputs in the web interface. Getting that working was exciting. Although I'm having seemingly random errors in test cases which I find bewildering at this point, I've also had successful test runs which could also point to the variations required in my model parameters and environment stability.

## Future Improvements
- Enhance NLP capabilities with advanced spaCy features and fine-tuning.
- Integrate with an external LLM API for more sophisticated responses.
- Design a scalable chat interface.
- Use a custom-trained ML model for improved performance.

## Conclusion
This project demonstrates the implementation of a chatbot using Python, Flask, and spaCy, aimed at handling FAQs efficiently. Future iterations will focus on expanding functionality and enhancing user interaction. Feel free to suggest corrections or improvements, especially for the issues I have raised, if possible.