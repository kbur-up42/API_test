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

    async iCallTheApiToCreateATaskInsideMyWorkflow() {
        const result = await this.api.addTaskToWorkflowWithId(this.createdWorkflow.id);
        // console.log(result)
    }

    async aTaskShouldHaveBeenCreatedInsideMyWorkflow() {

    }

    async iCallTheApiToRunMyJobInsideMyWorkflow() {

    }

    async aJobShouldBeRunningInsideMyWorkflow() {
        
    }

    async aWorkFlowShouldHaveBeenCreated() {
        expect(this.createdWorkflow.id).to.be.a('string');
    }

    async iCallTheApiToCreateAJobInsideMyWorkflow() {

    }
}

module.exports = WorkflowSteps;