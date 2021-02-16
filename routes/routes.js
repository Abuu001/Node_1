const router =  require('express').Router()
const controller=require('../controllers/controllers')

router.post('/channels',controller.postChannel)
router.get('/channels',controller.getChannels)
router.get('/channel',controller.getChannel)
router.delete('/channel/:id',controller.deleteChannel)
router.patch('/channel/:id',controller.updateChannel)

router.post('/lessons',controller.postLessons)
router.get('/lessons',controller.getLessons)
router.get('/lesson/:id',controller.getLesson)
router.delete('/lesson/:id',controller.deleteLesson)
router.patch('/lesson/:id',controller.updateLesson)

module.exports= router;
