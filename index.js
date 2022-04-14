const express = require('express');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const critical = require('critical');
const Joi = require('joi');

const app = new express();

app.use(express.json());

app.post('/', async (req, res) => {

    try {

        let validation = await validateUrl(req.body);

        let url = req.body.url;

        let response = await fetch(url);
        let responseText = await response.text();
        let length = responseText.length;

        const {css, html, uncritical} = await critical.generate({
            inline: true,
            base: process.cwd() + '/dist',
            html: responseText,
            width: 1300,
            height: 900,
            target: {
                css: 'critical.css',
                html: 'index-critical.html',
                uncritical: 'uncritical.css'
            } 
        });

        let result = {
            url: url,
            length: length
        }
        
        res.send(result);
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
    
});

function validateUrl(payload) {
    const schema = Joi.object({
        url: Joi.string().uri().required()
    });

    let { error } = schema.validate(payload);

    return new Promise((resolve, reject) => {
        if(!error) {
            resolve('the url is valid');
        }
        else {
            reject(`invalid url: ${error.details[0].message}`);
        }
    })

}

const port = process.env.PORT || 3000;

app.listen(port, 'localhost', () => {
    console.log(`Listening on port ${port}`);
});