const router =  require('express').Router()
const controller=require('../controllers/controllers')

router.post('/messages',controller.postMessage);
router.get('/messages',controller.getMessages);
router.get('/message/:id',controller.getMessage);
router.delete('/message/:id',controller.deleteMessage);
router.patch('/message/:id',controller.updateMessage);

router.post('/lessons',controller.postLessons);
router.get('/lessons',controller.getLessons);
router.get('/lesson/:id',controller.getLesson);
router.delete('/lesson/:id',controller.deleteLesson);
router.patch('/lesson/:id',controller.updateLesson);

router.get('/users',controller.getUsers);
router.get('/user/:username',controller.getUsername);

module.exports= router;

