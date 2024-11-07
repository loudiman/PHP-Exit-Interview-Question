const express = require('express');
const bodyParser = require('body-parser');
const SurveyCreationDataManipulation = require('../../js/survey-creation/survey-creation-data-manipulation'); // Assuming this is the data manipulation class

class Server {
  constructor() {
    this.app = express();
    this.port = 3000;
    this.dataManipulation = new SurveyCreationDataManipulation(); // Initialize data manipulation class

    // Middleware
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    // Set up routes
    this.setupRoutes();
  }

  setupRoutes() {
    // Route to get all surveys
    this.app.get('/surveys', async (req, res) => {
      try {
        const surveys = await this.dataManipulation.getAllSurveys();
        res.json(surveys); // Return all surveys in JSON format
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch surveys' });
      }
    });

    // Route to get all questions
    this.app.get('/questions', async (req, res) => {
      try {
        const questions = await this.dataManipulation.getAllQuestions();
        res.json(questions); // Return all questions in JSON format
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch questions' });
      }
    });

    // Route to create a new survey
    this.app.post('/surveys', async (req, res) => {
      const { survey_name, status } = req.body;
      try {
        await this.dataManipulation.createSurvey(survey_name, status);
        res.status(201).json({ message: 'Survey created successfully' });
      } catch (err) {
        res.status(500).json({ error: 'Failed to create survey' });
      }
    });

    // Route to create a new question
    this.app.post('/questions', async (req, res) => {
      const { question_text, question_type } = req.body;
      try {
        await this.dataManipulation.createQuestion(question_text, question_type);
        res.status(201).json({ message: 'Question created successfully' });
      } catch (err) {
        res.status(500).json({ error: 'Failed to create question' });
      }
    });

    // Route to update a survey (by ID)
    this.app.put('/surveys/:id', async (req, res) => {
      const surveyId = req.params.id;
      const { survey_name, status } = req.body;
      try {
        await this.dataManipulation.updateSurvey(surveyId, survey_name, status);
        res.json({ message: 'Survey updated successfully' });
      } catch (err) {
        res.status(500).json({ error: 'Failed to update survey' });
      }
    });

    // Route to update a question (by ID)
    this.app.put('/questions/:id', async (req, res) => {
      const questionId = req.params.id;
      const { question_text, question_type } = req.body;
      try {
        await this.dataManipulation.updateQuestion(questionId, question_text, question_type);
        res.json({ message: 'Question updated successfully' });
      } catch (err) {
        res.status(500).json({ error: 'Failed to update question' });
      }
    });

    // Route to delete a survey (by ID)
    this.app.delete('/surveys/:id', async (req, res) => {
      const surveyId = req.params.id;
      try {
        await this.dataManipulation.deleteSurvey(surveyId);
        res.json({ message: 'Survey deleted successfully' });
      } catch (err) {
        res.status(500).json({ error: 'Failed to delete survey' });
      }
    });

    // Route to delete a question (by ID)
    this.app.delete('/questions/:id', async (req, res) => {
      const questionId = req.params.id;
      try {
        await this.dataManipulation.deleteQuestion(questionId);
        res.json({ message: 'Question deleted successfully' });
      } catch (err) {
        res.status(500).json({ error: 'Failed to delete question' });
      }
    });
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

module.exports = Server;
