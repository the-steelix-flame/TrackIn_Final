const express = require('express');
const router = express.Router({ mergeParams: true });
const db = require('../db');
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const {isLoggedIn} = require('../middleware.js');


// GET /notes - list all notes
router.get('/', isLoggedIn, async (req, res) => {
    const userId = req.session.user_id;
    const [notes] = await db.query(
        'SELECT * FROM notes WHERE user_id = ? ORDER BY noteId DESC',
        [userId]
    );
    res.render("userTradenote.ejs", { notes, username: req.session.username });
});

// POST /notes/add - create a new note
router.post('/add', isLoggedIn, async (req, res) => {
    const { title, content } = req.body;
    const userId = req.session.user_id;

    if (!title && !content) return res.redirect('/notes');

    await db.query(
        'INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)',
        [userId, title || 'Untitled Note', content]
    );

    res.redirect('/notes');
});

// POST /notes/delete/:id - delete a note
router.post('/delete/:id', isLoggedIn, async (req, res) => {
    const noteId = req.params.id;
    const userId = req.session.user_id;

    await db.query(
        'DELETE FROM notes WHERE noteId = ? AND user_id = ?',
        [noteId, userId]
    );

    res.redirect('/notes');
});

module.exports = router;
