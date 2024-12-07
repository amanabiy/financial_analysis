'use client';

import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
// import ReactMarkdown from 'react-markdown';
import { RenderMessage } from './Markdown'

interface Response {
  markdown: string;
}

const InputResponse: React.FC = () => {
  const [response, setResponse] = useState<Response | null>(null);
  const [input, setInput] = useState<string>('');
  const response_sample = `
# Markdown Examples

## 1. Headers
# This is a Heading 1
## This is a Heading 2
### This is a Heading 3
#### This is a Heading 4
##### This is a Heading 5
###### This is a Heading 6

## 2. Emphasis
*This text is italic*  
_This text is also italic_

**This text is bold**  
__This text is also bold__

**You can combine _bold_ and _italic_**

## 3. Lists
### Unordered List
- Item 1
- Item 2
  - Sub-item 1
  - Sub-item 2

### Ordered List
1. First item
2. Second item
   1. Sub-item 1
   2. Sub-item 2

## 4. Links
[This is a link](http://example.com)

[This is a reference-style link][1]

[1]: http://example.com

## 5. Images
![This is an image](https://www.thoughtco.com/thmb/yeuX1zVKy65C2tAhGSwGeiwmIMk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/close-up-of-flame-536940503-59b2b3de845b3400107a7f27-5b967c9546e0fb00254ed63b.jpg)

![Alt text][image]

[image]: https://reactormag.com/wp-content/uploads/2024/01/avatar-the-last-airbender-flying.jpg

## 6. Blockquotes
> This is a blockquote.
> 
> - You can include lists within blockquotes.
> - Like this.

## 7. Code
### Inline Code
Use the \`print()\` function to display output.

### Code Block
\`\`\`python
def hello_world():
    print("Hello, World!")
\`\`\`

## 8. Horizontal Rule
---

## 9. Tables
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1, Col 1 | Row 1, Col 2 | Row 1, Col 3 |
| Row 2, Col 1 | Row 2, Col 2 | Row 2, Col 3 |

## 10. Strikethrough
This is ~~strikethrough~~ text.

## 11. Task Lists
- [x] Task 1
- [ ] Task 2
- [ ] Task 3

## 12. Footnotes
This is a sentence with a footnote[^1].

[^1]: This is the footnote.

## 13. Definition Lists
Term 1
: Definition 1

Term 2
: Definition 2

## 14. HTML Elements
You can also use HTML tags like <b>bold</b> and <i>italic</i> in markdown.

## 15. Emoji
Here is a smiley face: :smile:`

  const sendRequest = async () => {
    if (input.trim()) {
      // Simulate a server response for the example
      const serverResponse: Response = { markdown: `${response_sample}` };
      setResponse(serverResponse);
      setInput('');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      sendRequest();
    }
  };

  return (
    <div className="flex flex-col h-full w-full justify-center items-center bg-black text-white">
      <h2 className="text-2xl font-semibold mb-4">Find Your Next Investment</h2>
      <p className="text-sm mb-4 text-gray-400">
        Discover stocks with natural language queries, e.g.,
        <em>"What companies build data centers?"</em>.
        Search NYSE stocks by metrics like Market Cap, Volume, Sector, and more.
      </p>
      <div className="w-full mb-4">
        {/* Input and Button Together */}
        <div className="relative w-full">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="w-full py-3 pl-4 pr-16 bg-black text-white border border-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your query..."
          />
          <button
            onClick={sendRequest}
            disabled={!input.trim()}
            className={`absolute right-0 top-0 bottom-0 px-6 py-4 bg-blue-600 text-white rounded-r-lg shadow-md transition duration-300 ease-in-out ${!input.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
          >
            Send
          </button>
        </div>
      </div>
      <div className="w-full overflow-y-auto mt-4">
        {response && (
          <div className="p-6 border rounded-lg bg-gray-800 shadow-md">
            <RenderMessage>{response.markdown}</RenderMessage>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputResponse;
