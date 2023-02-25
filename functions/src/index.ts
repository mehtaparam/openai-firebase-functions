import * as functions from 'firebase-functions';
import {Configuration, OpenAIApi} from 'openai';

const DEFAULT_MODAL = 'text-davinci-003';

const configuration = new Configuration({
  organization: process.env.ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// eslint-disable-next-line max-len
export const openAIHttpFunction = functions.https.onRequest(async (request, response) => {
  const params = request.query;

  if (!params.query) {
    response.send('Please Send Query Paramater');
  }

  const openAPIResponse = await openai.createCompletion({
    model: process.env.MODAL || DEFAULT_MODAL,
    prompt: params?.query?.toString() || 'Not Defined',
    max_tokens: +(process.env.MAX_TOKENS || 0),
    temperature: +(process.env.TEMPRATURE || 0),
  });

  response.send(JSON.stringify(openAPIResponse.data));
});

