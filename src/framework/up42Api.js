// import { request } from 'supertest'
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

class API {
    PROJECT_API_KEY = 'TCw9T6lh.UN0DVS0fidDWtdjoMf9ZdFbLBLfCGGjFgp3';
    PROJECT_ID = '357588b5-c353-4190-b3ca-130e86824a07';
    authenticationUrl = `https://${this.PROJECT_ID}:${this.PROJECT_API_KEY}@api.up42.com`;
    baseUrl = `https://api.up42.com/projects/${this.PROJECT_ID}`

    async authenticate() {
        await request(this.authenticationUrl)
            .post('/oauth/token')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send('grant_type=client_credentials')
            .expect(200)
            .then((postResponse) => {
                expect(postResponse.body.data.accessToken).to.be.a('string');
                this.ACCESS_TOKEN = postResponse.body.data.accessToken;
            });
    }

    async createWorkflowWith(name, description) {
        const payload = {
            "name": name,
            "description": description 
        }
        await request(this.baseUrl)
            .post('/workflows/')
            .set(`Authorization`, `Bearer ${this.ACCESS_TOKEN}`)
            .send(payload)
            .then((workflowCreationPostResponse) => {
                console.log(workflowCreationPostResponse);
            })
    }
}

module.exports = API