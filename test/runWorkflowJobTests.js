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
    it('should create a workflow with blocs and run a job', async () => {
        steps = new WorkflowSteps();

        await steps.given.iAmAuthenticated();
        await steps.when.iCallTheApiToCreateANewWorkflowUsing(workflowToCreate.name, workflowToCreate.description);
        await steps.and.iCallTheApiToCreateTheFollowingTasksInsideMyWorkflow(tasksToCreate);
        await steps.and.iCallTheApiToCreateAndRunTheFollowingJobsForMyWorkflow(jobToCreate);
        await steps.then.aJobShouldBeRunningInsideMyWorkflow();
        await steps.iCallTheApiToDeleteMyCreatedWorkflow();
    });

    it('should create a workflow with blocks, run it and asynchronously monitors the running job', async () => {
    });
});