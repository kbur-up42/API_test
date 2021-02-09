const WorkflowSteps = require('../src/steps/workflowSteps')
let steps

const workflowToCreate = {
    'createdId': '',
    'name': 'QA coding challenge workflow',
    'description': 'Workflow description'
}

const tasksToCreate = [
    {
        "name": "nasa-modis:1",
        "parentName": null,
        "blockId": "ef6faaf5-8182-4986-bce4-4f811d2745e5"
    }, {
        "name": "sharpening:1",
        "parentName": "nasa-modis:1",
        "blockId": "e374ea64-dc3b-4500-bb4b-974260fb203e"
    } 
];

describe('Workflow API testing', () => {
    beforeEach( async () => {
        steps = new WorkflowSteps();
        await steps.given.iAmAuthenticated();
    });
    
    afterEach(async () => {
        await steps.iCallTheApiToDeleteMyCreatedWorkflow();
    });

    it('should create an empty workflow', async () => {
        await steps.when.iCallTheApiToCreateANewWorkflowUsing(workflowToCreate.name, workflowToCreate.description);
        await steps.then.aWorkFlowShouldHaveBeenCreated();
    });

    it('should create a workflow with a \'MODIS (GeoTIFF) by NASA\' block', async () => {
        
        await steps.when.iCallTheApiToCreateANewWorkflowUsing(workflowToCreate.name, workflowToCreate.description);
        await steps.and.iCallTheApiToCreateTheFollowingTasksInsideMyWorkflow(tasksToCreate);
        await steps.then.theTasksShouldHaveBeenCreatedInsideMyWorkflow(tasksToCreate);
    });
});
