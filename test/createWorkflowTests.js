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

const jobToCreate = {
    "nasa-modis:1": {
        "time": "2018-12-01T00:00:00+00:00/2020-12-31T23:59:59+00:00", "limit": 1,
        "zoom_level": 9,
        "imagery_layers": [
            "MODIS_Terra_CorrectedReflectance_TrueColor" 
        ],
        "bbox": [ 
            13.365373, 
            52.49582, 
            13.385796, 
            52.510455
        ] 
    },
    "sharpening:1": { 
        "strength": "medium"
    } 
}
  


describe('Workflow API testing', () => {
    beforeEach( async () => {
        steps = new WorkflowSteps();
        await steps.given.iAmAuthenticated();
    });
    
    afterEach(async () => {
        await steps.iCallTheApiToDeleteMyCreatedWorkflow();
    });

    it('should create an empty workflow', async () => { //OK
        await steps.when.iCallTheApiToCreateANewWorkflowUsing(workflowToCreate.name, workflowToCreate.description);
        await steps.then.aWorkFlowShouldHaveBeenCreated();
    });

    it('should create a workflow with a \'MODIS (GeoTIFF) by NASA\' block', async () => { //OK
        
        await steps.when.iCallTheApiToCreateANewWorkflowUsing(workflowToCreate.name, workflowToCreate.description);
        await steps.and.iCallTheApiToCreateTheFollowingTasksInsideMyWorkflow(tasksToCreate);
        await steps.then.theTasksShouldHaveBeenCreatedInsideMyWorkflow(tasksToCreate);
    });
});
