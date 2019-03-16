'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 8000;

const config = {
    channelSecret: 'c139dbb597452e223d2cc1d047c1adf5',
    channelAccessToken: 'M2iTx1qpyw8gBTpWeVB4aOKki2wvUQdKAsToJKU2XSIiTU2bXxWlTQ5DwGKR1/d0uUshzpV1hj9y0xFVveObX2689uWVsMBInxXL7jrPZu2sIVULiHNQ44LIinZOTktAttMNtkVEGynnQsgUzkwBywdB04t89/1O/w1cDnyilFU='
};

const app = express();

app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});

const client = new line.Client(config);

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text //実際に返信の言葉を入れる箇所
  });
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);
