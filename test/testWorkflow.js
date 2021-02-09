const chai = require('chai');
const API = require('../src/api/up42Api')
const api = new API()
const expect = chai.expect;
const WorkflowSteps = require('../src/steps/workflowSteps')
let steps

const workflowToCreate = {
    'createdId': '',
    'name': 'QA coding challenge workflow',
    'description': 'Workflow description'
}

beforeEach( async () => {
    steps = new WorkflowSteps()
    await steps.given.iAmAuthenticated()
});

afterEach(async () => {
    await steps.iCallTheApiToDeleteMyCreatedWorkflow()
});

describe('Happy flows for creating workflows', () => {
    it('should create an empty workflow', async () => {
        await steps.when.iCallTheApiToCreateANewWorkflowUsing(workflowToCreate.name, workflowToCreate.description);
        await steps.then.aWorkFlowShouldHaveBeenCreated();
    });

    it('should create a workflow with a \'MODIS (GeoTIFF) by NASA\' block', async () => {
        await steps.when.iCallTheApiToCreateANewWorkflowUsing(workflowToCreate.name, workflowToCreate.description);
        await steps.and.iCallTheApiToCreateATaskInsideMyWorkflow();
        await steps.then.aTaskShouldHaveBeenCreatedInsideMyWorkflow();
    });

    it('should create a workflow with blocs and run a job', async () => {
        await steps.when.iCallTheApiToCreateANewWorkflowUsing(workflowToCreate.name, workflowToCreate.description);
        await steps.and.iCallTheApiToCreateATaskInsideMyWorkflow();
        await steps.and.iCallTheApiToCreateAJobInsideMyWorkflow();
        await steps.and.iCallTheApiToRunMyJobInsideMyWorkflow();
        await steps.then.aJobShouldBeRunningInsideMyWorkflow();
    });

    it('should create a workflow with blocks, run it and asynchronously monitors the running job', async () => {

    });
});
