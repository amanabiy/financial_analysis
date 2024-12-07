import google.generativeai as genai
from google.api_core import exceptions as google_exceptions
import os
from dotenv import load_dotenv

load_dotenv()

class GeminiAssistant:
    def __init__(self, model_name, system_instruction=None, tools=[], functions={}, starting_history=None):
        GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
        self.api_key = GEMINI_API_KEY
        if not self.api_key:
            raise ValueError("Gemini API key not found")

        genai.configure(api_key=self.api_key)
    
       
        self.model = genai.GenerativeModel(model_name='gemini-1.5-flash', system_instruction=system_instruction, tools=tools)
        self.functions = functions
        self.chat = None
        self.history = starting_history if starting_history else []

    def start_chat(self):
        """Start a chat session with the model."""
        self.chat = self.model.start_chat(enable_automatic_function_calling=False)

    def send_message(self, message):
        """Send a message to the model and handle function calls."""
        context = " ".join([f"User: {entry['message']} Assistant: {entry['response']}" for entry in self.history])
        full_message = f"{context} User: {message}" if context else message
        try:
            response = self.chat.send_message(full_message)
            function_calls = []

            for part in response.parts:
                if fn := part.function_call:
                    function_calls.append(fn)
        
            # Execute the function calls and gather responses
            responses = {}
            to_be_returned_responses = {}
            print("function calls", function_calls)
            for fn in function_calls:
                func_name = fn.name
                args = fn.args
                print("function name, and args", func_name, {**args})
                result = self.functions[func_name](**args)
                to_be_returned_responses[func_name] = { 'result': result, 'args': {**args} }
                responses[func_name] = result
            print("to_be_returne", to_be_returned_responses)
            return to_be_returned_responses
            if responses:
                # Build the response parts only if there are responses
                response_parts = [
                    genai.protos.Part(function_response=genai.protos.FunctionResponse(name=fn, response={"result": val}))
                    for fn, val in responses.items()
                ]
                final_response = self.chat.send_message(response_parts)
            else:
                # If there are no responses, use the initial response
                final_response = response

            final_response_text = final_response.text
            
            # Update history with the latest interaction
            self.history.append({"message": message, "response": final_response_text})

            return { "fun_call_res": to_be_returned_responses, "text": final_response_text }
        except google_exceptions.GoogleAPICallError as e:
            print(f"Error in Google API call: {e}")
            return { "error": f"An error occurred while processing the message. {e}" }
        except Exception as e:
            print(f"Unexpected error: {e}")
            return { "error": f"An unexpected error occurred. {e}" }
