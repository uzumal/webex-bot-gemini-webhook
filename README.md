# Gemini Webex Bot 🤖💬

Gemini is your friendly AI assistant for Webex spaces. It leverages the power of the Gemini AI model to provide intelligent responses and summaries within your conversations!

## Features ✨

* **Intelligent Responses:** Gemini understands context and provides relevant replies to your questions and comments.
* **Summarization:** Get quick summaries of long conversations or threads to stay on top of discussions.
* **Customizable:** Tailor Gemini's behavior with environment variables to fit your needs.

## Getting Started 🚀

1. **Clone the Repository:**
   ```bash
   git clone https://your-github-repo-url.git
   ```
2. Set Up Environment Variables:
    - Create a .env file in the project root directory.
    - Add the following variables, replacing the placeholders with your actual values:
    ```bash
    WEBEX_ACCESS_TOKEN=your_webex_access_token
    GEMINI_APIKEY=your_gemini_api_key
    MY_BOT_NAME=your_webex_bot_name
    ```
3. Deploy to Google Apps Script:
    - Open the project in the Google Apps Script editor.
    - Set up the environment variables in the script properties (see below).
    - Deploy the script as a web app.
4. Add Gemini to Your Webex Space:
    - Invite your bot (using the MY_BOT_NAME email) to the Webex space where you want it to be active.

## Setting Up Environment Variables in Google Apps Script 🔧
    1. In the script editor, go to "File" -> "Project properties".
    2. Open the "Script properties" tab.
    3. Add the following properties with your values:
        - WEBEX_ACCESS_TOKEN
        - GEMINI_APIKEY
        - MY_BOT_NAME

## Technical Details ⚙️
- Webex Integration: The bot uses the Webex API to listen for messages and send responses.
- Gemini AI Model: The Gemini AI model is responsible for understanding the context of messages and generating intelligent replies.
- Google Apps Script: GAS provides the serverless environment for running the bot and handling API interactions.

## Contributing 🤝
Contributions are welcome! Feel free to open issues or submit pull requests.

## License 📄
This project is licensed under the MIT License.