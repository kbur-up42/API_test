const API = require('../api/up42Api');
const Steps = require('./../framework/abstractSteps')
const chai = require('chai');
const expect = chai.expect;

class WorkflowSteps extends Steps {
    
    createdWorkflow = {};

    constructor() {
        super();
        this.api = new API()
    }

    async iAmAuthenticated() {
        await this.api.authenticate();
    }

    async iCallTheApiToCreateANewWorkflowUsing(aName, aDescription) {
        const createdWorkflow = await this.api.createWorkflowWith(aName, aDescription);
        expect(createdWorkflow.name).to.be.a('string', aName);
        expect(createdWorkflow.description).to.be.a('string', aDescription);
        this.createdWorkflow = createdWorkflow
    }

    async iCallTheApiToDeleteMyCreatedWorkflow() {
        const deletionCallResult = await this.api.deleteWorkflowWithId(this.createdWorkflow.id);
        expect(deletionCallResult).to.equal(true);
    }

    async iCallTheApiToCreateTheFollowingTasksInsideMyWorkflow(tasks) {
        const result = await this.api.addTaskToWorkflowWithId(this.createdWorkflow.id, tasks);
        this.createdWorkflow.addedTasksResponse = result;
    }

    async theTasksShouldHaveBeenCreatedInsideMyWorkflow(tasks) {
        var taskCountFound = 0;
        for (const responseItem in this.createdWorkflow.addedTasksResponse) {
            for (const givenTask in tasks) {
                if (givenTask.name === responseItem.name) {
                    taskCountFound ++;
                    // break needed out of inner for loop to prevent duplicate task counting
                    break;
                }
            }
        }
        expect(taskCountFound).to.equal(2)
    }

    async aJobShouldBeRunningInsideMyWorkflow() {
        expect(this.createdWorkflow.runningJobs.data.id).to.be.a('string');
    }

    async aWorkFlowShouldHaveBeenCreated() {
        expect(this.createdWorkflow.id).to.be.a('string');
    }

    async iCallTheApiToCreateAndRunTheFollowingJobsForMyWorkflow(jobsToCreate) {
        const runningJobInformation = await this.api.createAndRunJobsInWorkflowWithId(this.createdWorkflow.id, jobsToCreate);
        this.createdWorkflow.runningJobs = runningJobInformation;
    }
}

module.exports = WorkflowSteps;