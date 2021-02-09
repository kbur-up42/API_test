const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

class API {
    PROJECT_API_KEY = 'TCw9T6lh.UN0DVS0fidDWtdjoMf9ZdFbLBLfCGGjFgp3';
    PROJECT_ID = '357588b5-c353-4190-b3ca-130e86824a07';
    authenticationUrl = `https://${this.PROJECT_ID}:${this.PROJECT_API_KEY}@api.up42.com`;
    baseUrl = `https://api.up42.com/projects/${this.PROJECT_ID}`

    async addTaskToWorkflowWithId(workflowId, tasksToCreate) {
        const payload = tasksToCreate;
        return await request(this.baseUrl)
            .post(`/workflows/${workflowId}/tasks/ `)
            .set(`Authorization`, `Bearer ${this.ACCESS_TOKEN}`)
            .set('Content-Type', 'application/json')
            .send(payload)
            .expect(200)
            .then((taskCreationPostResponse) => {
                expect(taskCreationPostResponse.body.error).to.be.a('null');
                return taskCreationPostResponse.body.data;
            })
    }

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

    async createAndRunJobsInWorkflowWithId(workflowId, Jobs) {
        const payload = Jobs;
        await request(this.baseUrl)
            .post(`/workflows/${workflowId}/jobs`)
            .set(`Authorization`, `Bearer ${this.ACCESS_TOKEN}`)
            .set('Content-Type', 'application/json')
            .send(payload)
            .expect(200)
            .then((jobsResponse) => {
                expect(jobsResponse.body.error).to.be.a('null');
                console.log(jobsResponse.body);
                return jobsResponse.body
            });
    }

    async createWorkflowWith(name, description) {
        const payload = {
            "name": name,
            "description": description 
        }
        return await request(this.baseUrl)
            .post('/workflows/')
            .set(`Authorization`, `Bearer ${this.ACCESS_TOKEN}`)
            .set('Content-Type', 'application/json')
            .send(payload)
            .expect(200)
            .then((workflowCreationPostResponse) => {
                expect(workflowCreationPostResponse.body.error).to.be.a('null');
                return workflowCreationPostResponse.body.data;
            })
    }

    async deleteWorkflowWithId(workflowId) {
        return await request(this.baseUrl)
            .delete(`/workflows/${workflowId}`)
            .set(`Authorization`, `Bearer ${this.ACCESS_TOKEN}`)
            .send()
            .expect(204)
            .then( () => {
                return true;
            })
    }

    
}

module.exports = API;