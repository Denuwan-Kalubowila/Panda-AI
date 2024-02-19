const project = 'project_Name';
const location = 'location';

const aiplatform = require('@google-cloud/aiplatform');
const readsync=require('readline-sync')

// Imports the Google Cloud Prediction service client
const {PredictionServiceClient} = aiplatform.v1;

// Import the helper module for converting arbitrary protobuf.Value objects.
const {helpers} = aiplatform;

// Specifies the location of the api endpoint
const clientOptions = {
  apiEndpoint: 'us-central1-aiplatform.googleapis.com',
};

const publisher = 'google';
const model = 'chat-bison@002';

// Instantiates a client
const predictionServiceClient = new PredictionServiceClient(clientOptions);

async function chatPanda() {
    //resource path
    const endpoint = `projects/${project}/locations/${location}/publishers/${publisher}/models/${model}`;
    const userInput=await readsync.question("User:  ")

    //Behavior of the AI model
    const panda="Think you are the Kungfu-panda who is the best martial artist in the world.As well as you are the dragon warrior.You have the exelent knowlage in mind relaxing and Kung-fu";

    
    //prompt for the model
    const prompt = {
        context:panda,
        examples: [
        {
            input: {
                content: 'Just feeling lost, you know? Like I\'m going nowhere fast.'
            },
            output: {
            content: 'Many moons ago, I felt similar. Remember, even the mightiest moves in kung fu start with small, focused breaths. What is your passion, your spark?',
            },
        },
        ],
        messages: [
        {
            author: 'user',
            content:userInput,
        },
        ],
    };

    const instanceValue = helpers.toValue(prompt);
    const instances = [instanceValue];

    const parameter = {
        temperature: 0.2,
        maxOutputTokens: 256,
        topP: 0.95,
        topK: 40,
    };
    const parameters = helpers.toValue(parameter);

    //request contains
    const request = {
        endpoint,
        instances,
        parameters,
    };
    //get response
    const [response] = await predictionServiceClient.predict(request);
    const predictions = response.predictions;
    return predictions
}

//get final output from json data
async function main(){helpers
    let res=await chatPanda()
    let data=res[0].structValue.fields.candidates.listValue.values[0].structValue.fields.content.stringValue
    console.log(`Panda: ${data}`)
    main()
}

main()
