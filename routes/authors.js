const express = require('express');
const router = express.Router();    
const Author = require('../models/author');


//all authors
router.get('/', async (req,res)=>{
    let searchOption = {}
    if(req.query.name != null){
        searchOption.name = new RegExp(req.query.name, 'i')
    }
    try{
        const authors = await Author.find(searchOption);
        res.render('authors/index', {authors:authors, searchOption: req.query})

    } catch{
        res.redirect('/');
    }
 

})

//new authors
router.get('/new', (req,res)=>{
    res.render('authors/new', {author: new Author()});

})

//create
router.post('/', (req,res)=>{
    const author = new Author({
        name:req.body.name
    })
    author.save((err, newAuthor)=>{
        if(err){
            res.render('authors/new',{
                author: author,
                errorMessage: "error creating author"
            })
        }
        else{
            res.redirect('authors');
        }
    })
    

})
module.exports=router;