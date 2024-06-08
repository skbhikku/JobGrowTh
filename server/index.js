const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 5000;

app.use(bodyParser.json());



const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'your database name',
    port: '3306',
});


//delete user from database
app.delete('/api/deleteUser/:id', (req, res) => {
    const userId = req.params.id;
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting MySQL connection', err);
                res.status(500).send('Error deleting question');
                return;
            }
    
            connection.query(`DELETE FROM user_table WHERE id = ?`,userId, (error, results) => {
                if (error) {
                    connection.release();
                    console.error('Error deleting question', error);
                    res.status(500).send('Error deleting question');
                } else {
                    // After deletion, re-index the IDs
                    connection.query(`SET @index = 0`);
                    connection.query(`UPDATE user_table SET id = @index := @index + 1`);
                    connection.query(`ALTER TABLE user_table AUTO_INCREMENT = `);
                    connection.release();
                    res.status(200).send('User deleted successfully');
                }
            });
        });
    });


// Endpoint to handle user login
// Assuming you have already set up your Express server and connected to the database



app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Check if email and password match with records in the database
    pool.query('SELECT * FROM user_table WHERE email = ? AND password = ?', [email, password], (error, results) => {
        if (error) {
            console.error('Error authenticating user', error);
            res.status(500).send('Error authenticating user');
        } else {
            if (results.length > 0) {
                // User authenticated successfully
                const { name, email } = results[0]; // Assuming name column is in the first position
                res.status(200).json({ message: 'Login successful', name, email });
            } else {
                // User authentication failed
                res.status(401).json({ error: 'Invalid credentials' });
            }
        }
    });
});

//questions add from the chrome to question.json file

const fs = require('fs');
app.use(bodyParser.json());
app.post('/api/questionsadd', (req, res) => {
    try {
      const formData = req.body;
  
      let existingQuestions = [];
      try {
        existingQuestions = JSON.parse(fs.readFileSync('src/Components/Questions.json', 'utf8'));
      } catch (err) {
        // File doesn't exist or is empty, ignore
      }
  
      existingQuestions.push(formData);
  
      fs.writeFileSync('src/Components/Questions.json', JSON.stringify(existingQuestions, null, 2));
  
      res.status(200).json({ message: 'Question added successfully!' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error occurred while adding question!' });
    }
  });
  // clear data from Questions.json file
  app.post('/api/clearQuestions', (req, res) => {
    try {
      fs.writeFileSync('src/Components/Questions.json', JSON.stringify([], null, 2));
      res.status(200).json({ message: 'All questions cleared successfully!' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error occurred while clearing questions!' });
    }
  });
  //clear data from the Quizdata database table
  app.post('/api/clearUserData', async (req, res) => {
    try {
      // Clear the data
      await pool.query('DELETE FROM quizdata');
  
      // Reset the auto-increment ID column to start with zero
      await pool.query('ALTER TABLE quizdata AUTO_INCREMENT = 1');
  
      // Send success response
      res.status(200).json({ message: 'All user quiz data cleared and ID sequence reset successfully!' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error occurred while clearing user data and resetting ID sequence!' });
    }
  });
  
  
  



  app.post('/api/checkEmail', (req, res) => {
    const { email } = req.body;

    pool.query('SELECT * FROM quizdata WHERE email = ?', [email], (error, results) => {
        if (error) {
            console.error('Error checking email:', error);
            res.status(500).send('Error checking email');
        } else {
            const exists = results.length > 0;
            const score = exists ? results[0].score : null;
            res.status(200).json({ exists, score });
        }
    });
});

app.post('/api/submitScore', (req, res) => {
    const { email, score } = req.body;

    pool.query('INSERT INTO quizdata (email, score) VALUES (?, ?)', [email, parseInt(score, 10)], (insertError, insertResults) => {
        if (insertError) {
            console.error('Error inserting email:', insertError);
            res.status(500).send('Error inserting email');
        } else {
            res.status(200).send('Score submitted successfully');
        }
    });
});




// Registration endpoint
app.post('/api/register', (req, res) => {
    const { email, name, state, university, role, password } = req.body;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting MySQL connection', err);
            res.status(500).send('Error registering user');
            return;
        }

        // Check if the email already exists
        connection.query('SELECT email FROM user_table WHERE email = ?', [email], (error, results) => {
            if (error) {
                connection.release();
                console.error('Error checking for existing email', error);
                res.status(500).send('Error registering user');
                return;
            }

            if (results.length > 0) {
                // Email already exists
                connection.release();
                res.status(400).send({ message: 'Email already exists' });
            } else {
                // Email does not exist, proceed with registration
                connection.query('INSERT INTO user_table (email, name, state, university, role, password) VALUES (?, ?, ?, ?, ?, ?)', 
                [email, name, state, university, role, password], 
                (insertError, insertResults) => {
                    connection.release();
                    if (insertError) {
                        console.error('Error registering user', insertError);
                        res.status(500).send('Error registering user');
                    } else {
                        res.status(200).send({ message: 'User registered successfully' });
                    }
                });
            }
        });
    });
});


// Endpoint to fetch questions by category
app.get('/api/questionsinterview', (req, res) => {
    const { category } = req.query;

    const tableName = category; // Table name directly from category

    if (!tableName) {
        return res.status(400).json({ error: 'Invalid category' });
    }

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting MySQL connection', err);
            res.status(500).send('Error fetching questions');
            return;
        }

        connection.query(`SELECT * FROM ??`, [tableName], (error, results) => {
            connection.release();
            if (error) {
                console.error('Error fetching questions', error);
                res.status(500).send('Error fetching questions');
            } else {
                res.status(200).json(results);
            }
        });
    });
});

// Endpoint to add a new question
app.post('/api/addQuestion', (req, res) => {
    const { questionText, answerText, category } = req.body;

    const tableName = category; // Table name directly from category

    if (!tableName) {
        return res.status(400).json({ error: 'Invalid category' });
    }

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting MySQL connection', err);
            res.status(500).send('Error adding question');
            return;
        }

        connection.query(`INSERT INTO ?? (question_text, answer_text) VALUES (?, ?)`, [tableName, questionText, answerText], (error, results) => {
            connection.release();
            if (error) {
                console.error('Error adding question', error);
                res.status(500).send('Error adding question');
            } else {
                res.status(200).send('Question added successfully');
            }
        });
    });
});

// Endpoint to delete a question by ID
app.delete('/api/deleteQuestion/:id', (req, res) => {
    const questionId = req.params.id;
    const category = req.query.category;

    const tableName = category; // Table name directly from category

    if (!tableName) {
        return res.status(400).json({ error: 'Invalid category' });
    }

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting MySQL connection', err);
            res.status(500).send('Error deleting question');
            return;
        }

        connection.query(`DELETE FROM ?? WHERE id = ?`, [tableName, questionId], (error, results) => {
            if (error) {
                connection.release();
                console.error('Error deleting question', error);
                res.status(500).send('Error deleting question');
            } else {
                // After deletion, re-index the IDs
                connection.query(`SET @index = 0`);
                connection.query(`UPDATE ?? SET id = @index := @index + 1`, [tableName]);
                connection.query(`ALTER TABLE ?? AUTO_INCREMENT = 1`, [tableName]);
                connection.release();
                res.status(200).send('Question deleted successfully');
            }
        });
    });
});

app.get('/api/users', (req, res) => {
    // Get a connection from the pool
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting MySQL connection', err);
        res.status(500).send('Error fetching user data');
        return;
      }
  
      // Query to select all user data from the user_table
      const sql = 'SELECT * FROM user_table';
  
      // Execute the query
      connection.query(sql, (error, results) => {
        // Release the connection
        connection.release();
  
        if (error) {
          console.error('Error fetching user data', error);
          res.status(500).send('Error fetching user data');
          return;
        }
  
        // Send the fetched user data as JSON response
        res.json(results);
      });
    });
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
