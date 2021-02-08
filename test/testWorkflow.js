const express = require('express');
const request = require('supertest');
const PROJECT_API_KEY = 'TCw9T6lh.UN0DVS0fidDWtdjoMf9ZdFbLBLfCGGjFgp3';
const PROJECT_ID = '357588b5-c353-4190-b3ca-130e86824a07';
const baseUrl = `https://${PROJECT_ID}:${PROJECT_API_KEY}@api.up42.com`;

describe('Creating a workflow', () => {
    it('should retrieve an access token', () => {
        request(baseUrl)
            .post('/oauth/token')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send('grant_type=client_credentials')
            .expect(200)
            .then((postResponse) => {
                // console.log(postResponse);
                expect(postResponse.body.data.error).to.be.eql(null);
                expect(postResponse.body.data.token_type).to.be.eql('bearer');
                expect(postResponse.body.data.access_token).to.be.eql(!null);
            });
    });
});
