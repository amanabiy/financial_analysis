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
        "You are an assistant designed to help filter tickers based on given parameters. "
        "You have a function called build_metadata_filter and you will need to get the inputs for this function"
        "Don't ask for more informations, you can just call the function with empty parameter if you are not sure"
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
    print("the data to query", query)
    # Example of sending a message to Gemini
    response = assistant.send_message(query)
    print(response)
    return response['build_metadata_filter']['result']



def generate_possible_desc_and_filter_criteria(possible_description_company: str, criteria: str):
    """
    Generates a possible description of the company the user is looking for like it would be in the
    Yahoo finance business summary, and also a criteria string from the prompt 

    Args:
        possible_description_company (str): This should be a possible description of the company they are looking. It can't be empty
        criteria (str): a string description for the critera filtered from the query mainly on country and sector 

    Returns:
        tuple: A tuple containing two elements:
            - The first element is the query string (str).
            - The second element is the dictionary of filter criteria (dict).
            
    Example:
        query = "A technology company that works in smartphone, datacenters and more."
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
                generate_possible_desc_and_filter_criteria
            ],
            functions= {
                'generate_possible_desc_and_filter_criteria': generate_possible_desc_and_filter_criteria
            }
        )

    # Start the chat
    assistant.start_chat()

    # Example of sending a message to Gemini
    response = assistant.send_message(query)
    print(response)
    return response['generate_possible_desc_and_filter_criteria']['args']


    

if __name__ == '__main__':
    print(get_filter_meta_data("sector like technology"))
