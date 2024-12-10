## Financial Analysis Project

# Find your next inverstment through natural language

This project enables users to find stock tickers and filter companies using natural language queries. By leveraging powerful AI tools like Gemini 1.5 and Pinecone for Retrieval-Augmented Generation (RAG), it allows for intuitive, natural language-based interactions with stock data.

## Features

- **Natural Language Queries**: Allows users to ask questions like:
  - "Find companies that build [specific product]"
  - "Filter companies by country, sector, revenue growth, market cap"
  
- **Advanced Filtering**: Users can filter companies based on criteria like:
  - Country
  - Sector
  - Revenue growth
  - Market capitalization
  
- **AI-Powered Search**: Utilizes function calling from Gemini 1.5 to interpret natural language queries and retrieve structured data, improving the efficiency of the RAG process.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/)
- **Backend**: [Flask](https://flask.palletsprojects.com/)
- **Natural Language Processing**: [Gemini 1.5](https://www.google.com/search?q=Gemini+1.5) (function calling)
- **Vector Database**: [Pinecone](https://www.pinecone.io/)
  
## Challenges & Solutions

### Challenge 1: Filtering Companies Using Natural Language
- **Problem**: Using solely RAG for filtering wouldn't work efficiently for numerical filters such as revenue growth or market cap.
- **Solution**: I stored all useful filtering information in metadata and used function calling to extract structured data. This structured data was passed to the filtering process to minimize the scope of RAG, which enhanced both search efficiency and the ability to filter companies using natural language.

### Challenge 2: Slow Data Retrieval
- **Problem**: Retrieving large datasets, like company tickers and business summaries, was taking too long (over an hour).
- **Solution**: I implemented multithreading to speed up the data retrieval process.

## Installation
You will find a guide for the front-end and the back-end in the directories.

## Contributing

If you’d like to contribute to this project, feel free to submit issues or pull requests. Contributions to improve the functionality and efficiency of the project are always welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to **Headstarter** for their support and collaboration on this amazing project.
