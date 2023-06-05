const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');


// Middleware function
const myMiddleware = (req, res, next) => {
    // Your middleware logic here
    next();
};

// Usage
router.use(myMiddleware);

router.post('/register', (req, res) => {
    const { name, firstName, apartmentNumber } = req.body;

    console.log(req.body);

    // Save the user data to the database or perform any necessary operations
    // Replace the following code with your actual implementation

    // Assuming you have a database or data store configured
    const user = {
        name,
        firstName,
        apartmentNumber
    };

    // Return the registered user data
    res.json({ user });
});


const storage = multer.diskStorage({
    destination: 'uploads/', // Specify the destination folder
    filename: (req, file, cb) => {
        // Generate a unique filename
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const extension = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
    }
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), (req, res) => {
    // Access the uploaded file via req.file
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    res.send('File uploaded successfully.');
});


module.exports = router;