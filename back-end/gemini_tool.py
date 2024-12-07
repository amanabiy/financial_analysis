import os
import google.generativeai as genai
from dotenv import load_dotenv
from gemini import GeminiAssistant
from filter import build_metadata_filter

load_dotenv()

# def set_light_values(brightness: int, color_temp: str):
#     """Set the brightness and color temperature of a room light. (mock API).

#     Args:
#         brightness: Light level from 0 to 100. Zero is off and 100 is full brightness
#         color_temp: Color temperature of the light fixture, which can be `daylight`, `cool` or `warm`.

#     Returns:
#         A dictionary containing the set brightness and color temperature.
#     """
#     return {
#         "brightness": brightness,
#         "colorTemperature": color_temp
#     }

def get_filter_meta_data(query):
    system_instruction = (
        "You are an assistant designed to help filter based on given parameters. "
        "Your task is to execute the provided function exactly according to its details. "
        "Do not ask questions, simply execute the function as described."
        "Don't ask for more informations, you can just call the function with empty parameter if you are not sure"
        "If A parameter of a function is optional don't ask more information about it"
    )
    assistant = GeminiAssistant(model_name="gemini-1.0",
            system_instruction=system_instruction,
            tools=[
                build_metadata_filter
            ],
            functions= {
                'build_metadata_filter': build_metadata_filter
            }
        )

    # Start the chat
    assistant.start_chat()

    # Example of sending a message to Gemini
    response = assistant.send_message(query)
    print(response)
    return response['build_metadata_filter']['result']



def separate_query_and_filter_criteria(query: str, criteria: str):
    """
    Separates the search query from the filtering criteria provided.

    This function extracts the main query from the string and prepares the filter criteria
    for use in a search or database query. The query and criteria should be provided as 
    inputs, where the query is the main question or search term, and the criteria is a 
    dictionary containing key-value pairs representing the filtering conditions.

    Args:
        query (str): The main query should be a description of possible company (the user looking for) or question to search for mainly description about a company.
        criteria (str): a string description for the critera filtered from the query mainly on country and sector

    Returns:
        tuple: A tuple containing two elements:
            - The first element is the query string (str).
            - The second element is the dictionary of filter criteria (dict).
            
    Example:
        query = "What are some tech companies?"
        criteria = {'sector': 'Technology', 'marketCap_gt': 10000000000}
        result = separate_query_and_filter_criteria(query, criteria)
        # result will be ("What are some tech companies?", {'sector': 'Technology', 'marketCap_gt': 10000000000})
    """
    pass

def separate_query(query):
    system_instruction = """You are an expert at formulating prompts you take in the prompt for the user and generate a prompt based on it.
        The first part is if there is any description about the company they want to see you will elaborate that so that it can be matched with
        The yfininace long description through RAG.
        
        Don't ask for extra information.
        Don't say "based on your input", just improve the prompt.
        
        Criteria should be only about:
         country
         sector: description
    """
    
    assistant = GeminiAssistant(model_name="gemini-1.0",
            system_instruction=system_instruction,
            tools=[
                separate_query_and_filter_criteria
            ],
            functions= {
                'separate_query_and_filter_criteria': separate_query_and_filter_criteria
            }
        )

    # Start the chat
    assistant.start_chat()

    # Example of sending a message to Gemini
    response = assistant.send_message(query)
    print(response)
    return response['separate_query_and_filter_criteria']['args']


    

if __name__ == '__main__':
    print(get_filter_meta_data("sector like technology"))
