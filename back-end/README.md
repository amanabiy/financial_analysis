
## Getting Started

### Prerequisites

- Python 3.x
- Flask
- Pinecone SDK
- Any other dependencies listed in `requirements.txt`

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Set up a virtual environment and activate it:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up your Pinecone account and initialize the database.

5. Create a `.env` file in the root directory of your project and add the following environment variables:
   ```env
   PINECONE_API_KEY=
   GROQ_API_KEY=
   
   ```

6. Run the Flask application:
   ```bash
   python app.py
   ```

7. Access the web app at [http://localhost:5000](http://localhost:5000).

## Resources

- [Getting Started With Embeddings](https://huggingface.co/blog/getting-started-with-embeddings)
- [Article on RAG on a code base](https://blog.lancedb.com/rag-codebase-1/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
