const { TechnologyService } = require("../services/tech-service");
const { UserService } = require('../services/user-service');

const service = new TechnologyService();
const userService = new UserService();

class TechnologyHandler {

    async create(req, res) {
        let token = req.headers['authorization'];
        let user = await userService.getUserFromToken(token);
        let result = await service.create(req.body, user);

        if (result) {
            console.log('Create technology successful');
            res.status(201);
        } else {
            console.log('Create technology failed');
            res.status(404);
        }
        res.end();
    }

    async getAll(req, res) {
        let result = await service.getAll();

        if (result) {
            console.log('Get all technologies successful');
            res.send(result);
        } else {
            console.log('Get all technologies failed');
            res.status(404);
        }
        res.end();
    }

    async getById(req, res) {
        let result = await service.getById(req.params.id);

        if (result) {
            console.log('Get technology successful');
            res.send(result);
        } else {
            console.log('Get technology failed');
            res.status(404);
        }
        res.end();
    }

    async delete(req, res) {
        let result = await service.delete(req.params.id);
        
        if (result) {
            console.log('Delete technology successful');
            res.send(result);
        } else {
            console.log('Delete technology failed');
            res.status(404);
        }
        res.end();
    }

    async update(req, res) {
        let token = req.headers['authorization'];
        let user = await userService.getUserFromToken(token);
        let result = await service.update(req.params.id, req.body, user);

        if (result) {
            console.log('Update technology successful');
            res.send(result);
        } else {
            console.log('Update technology failed');
            res.status(404);
        }
        res.end();
    }

    async publish(req, res) {
        let token = req.headers['authorization'];
        let user = await userService.getUserFromToken(token);
        let result = await service.publish(req.params.id, req.body, user);

        if (result) {
            console.log('Publish technology successful');
            res.send(result);
        } else {
            console.log('Publish technology failed');
            res.status(404);
        }
        res.end();
    }

    async classify(req, res) {
        let token = req.headers['authorization'];
        let user = await userService.getUserFromToken(token);
        let result = await service.classify(req.params.id, req.body, user);

        if (result) {
            console.log('Classify technology successful');
            res.send(result);
        } else {
            console.log('Classify technology failed');
            res.status(404);
        }
        res.end();
    }
}

exports.TechnologyHandler = TechnologyHandler;