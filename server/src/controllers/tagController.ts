import helper from './_controllerHelper';
import dataRepository from '../repositories/dataRepository';

export default {
    getTags,
    deleteTag,
    saveTag
};

async function getTags(req, res) {
    try {
        let tags = await dataRepository.getTags();

        return helper.sendData(tags, res);
    } catch (err) {
        return helper.sendFailureMessage(err, res);
    }
}

async function deleteTag(req, res) {
    try {
        let tagId = parseInt(req.params.id);

        await dataRepository.deleteTag(tagId);

        return helper.sendData({}, res);
    } catch (err) {
        return helper.sendFailureMessage(err, res);
    }
}

async function saveTag(req, res) {
    try {
        let tag = req.body.tag;

        await dataRepository.saveTag(tag);

        return helper.sendData({}, res);
    } catch (err) {
        return helper.sendFailureMessage(err, res);
    }
}