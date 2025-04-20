import spacy
from spacy.matcher import PhraseMatcher
from flask import Flask, request, jsonify, render_template
import json

# Initialize Flask application
app = Flask(__name__)

# Load Spacy's large English model
nlp = spacy.load("en_core_web_lg")

# Load FAQs from JSON file
with open('faqs.json') as f:
    faq_dict = json.load(f)

# Initialize PhraseMatcher with Spacy's vocabulary
matcher = PhraseMatcher(nlp.vocab)

# Create patterns from FAQ questions
patterns = [nlp(question) for question in faq_dict.keys()]

# Add patterns to the PhraseMatcher
matcher.add("FAQ", None, *patterns)

# Function to get the response from FAQ based on user input
def get_faq_response(user_input):
    # Default response if no match is found
    best_answer = "I'm sorry, I don't have an answer for that. Can you please rephrase your question?"

    # Return default response if user input is empty
    if not user_input or user_input.strip() == "":
        return best_answer
    
    try:
        # Use PhraseMatcher for keyword-based matching
        doc = nlp(user_input)
        matches = matcher(doc)
        if matches:
            match_id, start, end = matches[0]  # Consider the first match
            return faq_dict[doc[start:end].text]

        # Check for exact matching of user input with FAQ questions using similarity threshold
        for question, answer in faq_dict.items():
            if user_input.lower().strip() != "" and nlp(user_input.lower().strip()).similarity(nlp(question.lower())) > 0.95:  # Adjust similarity threshold as needed
                return answer

        return best_answer
    
    except Exception as e:
        return f"Error: {str(e)}"

# Route to render the chatbot interface
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle POST requests from the chatbot interface
@app.route('/chatbot', methods=['POST'])
def chatbot():
    try:
        user_input = request.json.get('user_input')
        if user_input:
            response = get_faq_response(user_input)
            return jsonify({"response": response})
        else:
            return jsonify({"response": "Please provide a valid input."})
    except Exception as e:
        return jsonify({"response": f"Error processing request: {str(e)}"})

# Run the Flask application in debug mode
if __name__ == '__main__':
    app.run(debug=True)
