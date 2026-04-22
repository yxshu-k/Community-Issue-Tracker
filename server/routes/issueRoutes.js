const express = require('express');
const router = express.Router();
const {
  createIssue,
  getAllIssues,
  getIssueById,
  updateIssueStatus,
  deleteIssue,
  getMyIssues,
} = require('../controllers/issueController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getAllIssues);
router.post('/', protect, createIssue);
router.get('/myissues', protect, getMyIssues);
router.get('/:id', getIssueById);
router.put('/:id', protect, updateIssueStatus);
router.delete('/:id', protect, deleteIssue);

module.exports = router;