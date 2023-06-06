import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();
const configuration =  new Configuration({
    apikey:process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
router.route('/').get((req, res)=>{
    res.status(200).jason({message:'Hello from Dall-E'});
})
router.route('/').post(async(req, res)=>{
    try{
        const{prompt} = req.body;
        const aiResponse = await openai.createImage({
            prompt,
            n:1,
            size:'1024x1024',
            response_format: 'b64_jason',
        });

        const image = airesponse.data.data[0].b64_jason;
        res.status(200).jason({photo:image});
    } catch(error){
        console.error(error);
        res.status(500).send(error?.response.data.error.message || 'something went wrong');
    }
});
export default router;