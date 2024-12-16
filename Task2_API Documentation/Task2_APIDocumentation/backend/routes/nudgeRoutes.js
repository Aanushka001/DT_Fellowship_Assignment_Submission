import express from 'express';

const createNudgeRoutes = (nudgeController) => {
  const router = express.Router();

  router.get('/', nudgeController.getAllNudges.bind(nudgeController));
  router.post('/', nudgeController.createNudge.bind(nudgeController));
  router.put('/:id', nudgeController.updateNudge.bind(nudgeController));
  router.delete('/:id', nudgeController.deleteNudge.bind(nudgeController));

  return router;
};

export default createNudgeRoutes;