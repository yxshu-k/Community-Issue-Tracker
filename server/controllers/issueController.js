const Issue = require('../models/Issue');

// @desc    Create new issue
// @route   POST /api/issues
const createIssue = async (req, res) => {
  try {
    const { title, description, category, location, photo } = req.body;

    const issue = await Issue.create({
      title,
      description,
      category,
      location,
      photo,
      reportedBy: req.user._id,
    });

    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all issues
// @route   GET /api/issues
const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate('reportedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single issue
// @route   GET /api/issues/:id
const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate('reportedBy', 'name email');

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update issue status (authority only)
// @route   PUT /api/issues/:id
const updateIssueStatus = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    issue.status = req.body.status || issue.status;
    const updatedIssue = await issue.save();

    res.json(updatedIssue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete issue
// @route   DELETE /api/issues/:id
const deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    await issue.deleteOne();
    res.json({ message: 'Issue removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get my issues
// @route   GET /api/issues/myissues
const getMyIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ reportedBy: req.user._id })
      .sort({ createdAt: -1 });

    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createIssue,
  getAllIssues,
  getIssueById,
  updateIssueStatus,
  deleteIssue,
  getMyIssues,
};