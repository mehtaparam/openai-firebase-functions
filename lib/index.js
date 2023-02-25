"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openAIHttpFunction = exports.helloWorld = void 0;
const functions = require("firebase-functions");
const openai_1 = require("openai");
const DEFAULT_MODAL = "text-davinci-003";
exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});
const configuration = new openai_1.Configuration({
    organization: process.env.ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new openai_1.OpenAIApi(configuration);
// eslint-disable-next-line max-len
exports.openAIHttpFunction = functions.https.onRequest(async (request, response) => {
    var _a;
    const params = request.query;
    if (!params.query) {
        response.send("Please Send Query Paramater");
    }
    const openAPIResponse = await openai.createCompletion({
        model: process.env.MODAL || DEFAULT_MODAL,
        prompt: ((_a = params === null || params === void 0 ? void 0 : params.query) === null || _a === void 0 ? void 0 : _a.toString()) || "Not Defined",
        max_tokens: +(process.env.MAX_TOKENS || 0),
        temperature: +(process.env.TEMPRATURE || 0),
    });
    response.send(JSON.stringify(openAPIResponse.data));
});
//# sourceMappingURL=index.js.map