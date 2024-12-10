from flask import Flask, jsonify, request
import os
from gemini import GeminiAssistant
from gemini_tool import get_filter_meta_data, separate_query

# from langchain_pinecone import PineconeVectorStore
# from openai import OpenAI
# import yfinance as yf
# from langchain_community.embeddings import HuggingFaceEmbeddings
from sentence_transformers import SentenceTransformer
from pinecone import Pinecone
# import numpy as np
# import requests
import os
from dotenv import load_dotenv
from flask_cors import CORS
from groq import Groq


app = Flask(__name__)
load_dotenv()

# Enable CORS for all routes
CORS(app, origins="*")

@app.route('/')
def home():
    return jsonify(message="Hello, World!")


def get_huggingface_embeddings(text, model_name="sentence-transformers/all-mpnet-base-v2"):
    """
    Generates embeddings for the given text using a specified Hugging Face model.

    Args:
        text (str): The input text to generate embeddings for.
        model_name (str): The name of the Hugging Face model to use.
                        Defaults to "sentence-transformers/all-mpnet-base-v2".

    Returns:
        np.ndarray: The generated embeddings as a NumPy array.
    """
    model = SentenceTransformer(model_name)
    print("model", model)
    print("text", text)
    return model.encode(text)

@app.route('/get_products', methods=['GET'])
def get_products():
    client = Groq(
        api_key=os.getenv("GROQ_API_KEY"),
    )
    # Get query parameter from the request
    query = request.args.get('query', default="What are some companies that manufacture consumer hardware?", type=str)
    if not query:
        return jsonify({"response": "What can I help you with? You can ask questions on finding tickers to fund in."})
    index_name = "stocks-with-metadata"
    namespace = "stock-descriptions_metadata"  # Adjust the namespace as necessary
    
    s = separate_query(query)
    print(s)
    possible_description = s['possible_description_company']
    criteria = s['criteria']
    print("improved_query", query)
    # Connect to your Pinecone index
    pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
    pinecone_index = pc.Index(index_name)
    
    # Get embeddings for the query
    raw_query_embedding = get_huggingface_embeddings(possible_description)
    filter_meta_data = {}
    
    try:
        filter_meta_data = get_filter_meta_data(criteria)
    except Exception as e:
        print(f"Failed to get the filter meta data ${e}")
    print("fitler_meta_data", filter_meta_data)
    # Query Pinecone for top 10 matches
    top_matches = pinecone_index.query(vector=raw_query_embedding.tolist(), top_k=10, include_metadata=True, namespace=namespace, filter=filter_meta_data)
    
    contexts = [item['metadata']['text'] for item in top_matches['matches']]
    metadata_list = [item['metadata'] for item in top_matches['matches']]
    augmented_query = "<CONTEXT>\n" + "\n\n-------\n\n".join(contexts[:10]) + "\n-------\n</CONTEXT>\n\n\n\nMY QUESTION:\n" + query
    print(augmented_query)

    # OpenAI client setup
 

    system_prompt = """You are an expert at providing answers about stocks. Please answer my question provided."""

    # Request answer from OpenAI
    chat_completion = client.chat.completions.create(
        model="llama-3.1-70b-versatile",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": augmented_query}
        ]
    )
    response = chat_completion.choices[0].message.content
    print(response)
    # print("returned this")
    print("tickers", metadata_list)
    # print(top_matches)
    return jsonify({"response": response, "tickers": metadata_list}), 200

if __name__ == '__main__':
    app.run(debug=True)
