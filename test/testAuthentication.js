const chai = require('chai');
const API = require('../src/api/up42Api')
const api = new API()
const expect = chai.expect;
const Steps = require('./../src/steps')
let steps

const workflowToCreate = {
    'createdId': '',
    'name': 'QA coding challenge workflow',
    'description': 'Workflow description'
}

beforeEach( async function () {
    steps = new Steps()
    await steps.given.iAmAuthenticated()
});

afterEach(async () => {
    await steps.iCallTheApiToDeleteMyCreatedWorkflow()
});

describe('Happy flows for creating workflows', () => {
    it('should create an empty workflow', async function (){
        await steps.when.iCallTheApiToCreateANewWorkflowUsing(workflowToCreate.name, workflowToCreate.description);
        await steps.then.aWorkFlowShouldHaveBeenCreated();
    });

    it('should create a workflow with a \'MODIS (GeoTIFF) by NASA\' block', async function () {
        await steps.when.iCallTheApiToCreateANewWorkflowUsing(workflowToCreate.name, workflowToCreate.description);
        await steps.and.iCallTheApiToCreateATaskInsideMyWorkflow();
    });
});
