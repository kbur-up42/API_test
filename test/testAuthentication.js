const chai = require('chai');
const API = require('../src/framework/up42Api')
const api = new API()
const expect = chai.expect;

beforeEach( async function() {
    await api.authenticate();
});



describe('Creating a new workflow', () => {
    it('should retrieve an access token', async function(){
        await api.createWorkflowWith('QA coding challenge workflow','Workflow description');
    });
});
