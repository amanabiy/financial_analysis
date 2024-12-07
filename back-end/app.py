from flask import Flask, jsonify, request
import os

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
    # Get query parameter from the request
    query = request.args.get('query', default="What are some companies that manufacture consumer hardware?", type=str)
    index_name = "stocks"
    namespace = "default"  # Adjust the namespace as necessary

    # Connect to your Pinecone index
    pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
    pinecone_index = pc.Index(index_name)
    
    # Get embeddings for the query
    raw_query_embedding = get_huggingface_embeddings(query)
    # Query Pinecone for top 10 matches
    top_matches = pinecone_index.query(vector=raw_query_embedding.tolist(), top_k=10, include_metadata=True, namespace=namespace)
    contexts = [item['metadata']['text'] for item in top_matches['matches']]
    augmented_query = "<CONTEXT>\n" + "\n\n-------\n\n".join(contexts[:10]) + "\n-------\n</CONTEXT>\n\n\n\nMY QUESTION:\n" + query
    print(augmented_query)

    # OpenAI client setup
    client = Groq(
        api_key=os.getenv("GROQ_API_KEY"),
    )

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
    return jsonify({"response": response}), 200

if __name__ == '__main__':
    app.run(debug=True)
