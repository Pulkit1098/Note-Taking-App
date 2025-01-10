const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


//Route-1 = code to get all the notes using: GET - "/api/notes/fetchallnotes". **login required**
router.get('/fetchallnotes', fetchuser, async (req, res)=>{

    try{
        const notes = await Notes.find({user: req.user.id});
        res.json(notes)
        
    } catch(error){ 
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });  
    }
});

//Route-2 = code to add a new note using: POST - "/api/notes/addnote". **login required**
router.post('/addnote', fetchuser,[
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter the description').isLength({ min: 5 }),
], async (req, res)=>{

    try{
        const { title, description, tag } = req.body;

        //checking if everything is ok
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()

        res.json(savedNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

//Route-3 = update an existing note using: PUT - "/api/notes/updatenote/:id". *login required*

router.put('/updatenote/:id', fetchuser, async (req, res)=>{

    try{
        const { title, description, tag } = req.body;

        //creating a new note
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if(!note){
        return res.status(404).send("Note Not Found")
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("permission not allowed")
        }
        
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json({note});   

    } catch(error){
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }

})
//Route-4 = Delete an existing note using: DELETE - "/api/notes/deletenote/:id". *login required*

router.delete('/deletenote/:id', fetchuser, async (req, res)=>{

    try{
        const { title, description, tag } = req.body;

        //find the note to be Deleted and delete it
        let note = await Notes.findById(req.params.id);
        if(!note){
        return res.status(404).send("Note Not Found")
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("permission not allowed")
        }
        
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success": "Note has been deleted", note: note});   

    } catch(error){
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }

})

module.exports = router