require('dotenv').config();

const WEBEX_ACCESS_TOKEN = process.env.WEBEX_ACCESS_TOKEN;
const GEMINI_APIKEY = process.env.GEMINI_APIKEY;
const MY_BOT_NAME = process.env.MY_BOT_NAME;

function doPost(e) {
    const event = JSON.parse(e.postData.contents);

    if (event.data.personEmail == MY_BOT_NAME){
        return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
    }

    let messageId = event.data.id;
    const url = 'https://webexapis.com/v1/messages';

    const messageResp = UrlFetchApp.fetch(url + '/' + messageId, {
        'headers': {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + WEBEX_ACCESS_TOKEN,
        },
        'method': 'get'
    });
    let userMessage = JSON.parse(messageResp).text;

    const prompt = userMessage;

    // Gemini APIの呼び出し
    const geminiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=' + GEMINI_APIKEY;
    const requestOptions = {
        'method': 'post',
        'headers': {
        'Content-Type': 'application/json'
        },
        'payload': JSON.stringify({
        'contents': [{
            'parts': [{'text': prompt}]
        }],
        'safetySettings': [
            {
            'category': 'HARM_CATEGORY_DANGEROUS_CONTENT',
            'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
            }
        ],
        'generationConfig': {
            'temperature': 0.9,
            'topK': 1,
            'topP': 1,
            'maxOutputTokens': 2048,
            'stopSequences': []
        }
        })
    };

    const geminiResp = UrlFetchApp.fetch(geminiUrl, requestOptions);
    const responseText = geminiResp.getContentText();
    const json = JSON.parse(responseText);
    const text = json.candidates[0].content.parts[0].text;
    UrlFetchApp.fetch(url, {
        'headers': {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + WEBEX_ACCESS_TOKEN,
        },
        'method': 'post',
        'payload': JSON.stringify({
        'roomId': JSON.parse(messageResp).roomId,
        'parentId': messageId,
        'text': text
        })
    });
    return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}