const WEBEX_ACCESS_TOKEN = process.env.WEBEX_ACCESS_TOKEN;
const OPENAI_APIKEY = process.env.OPENAI_APIKEY;
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
  const requestOptions = {
    "method": "post",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+ OPENAI_APIKEY
    },
    "payload": JSON.stringify({
      "model": "gpt-3.5-turbo",
      "messages": [
         {"role": "user", "content": prompt}]
    })
  }
  const chatgptResp = UrlFetchApp.fetch("https://api.openai.com/v1/chat/completions", requestOptions);

  const responseText = chatgptResp.getContentText();
  const json = JSON.parse(responseText);
  const text = json['choices'][0]['message']['content'].trim();

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