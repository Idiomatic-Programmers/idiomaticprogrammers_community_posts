const fs = require('fs')
const path = require('path');

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let basePath = path.join('content', 'post')

if (!fs.existsSync('content')){
    fs.mkdirSync('content')
}

if (!fs.existsSync(basePath)){
    fs.mkdirSync(basePath)
}

rl.question("What will be the title of your post? 📄 ", (title)=>{
    rl.question("Write comma-separated Categories for your Post - ", (cats)=>{
        rl.question("Write comma-separated Tags for your Post - ", (tags)=>{
            
            rl.question("What's your Author Name (Pen Name)? ", (author)=>{
                author = author.split(" ")[0]
                let categories = ""
                cats.split(',').forEach(category => {
                    categories += `- ${category.trim()}\n`
                })

                let tagString = ""
                tags.split(',').forEach(tag => {
                    tagString += `- ${tag.trim()}\n`
                })

                let date = new Date().toISOString()
                date = date.split(':')[0]+":00.000+05:30"

                const metadata = `---
title: ${title}
date: ${date}
summary: WRITE_A_SUMMARY_OF_YOUR_POST
draft: true
featured: false
author: ${author}
tags:
${tagString}
categories:
${categories}
image: ""
---\n`

                const authorMeta = `---
name: ""
title: ""
summary: ""
pen: ${author}
github: ""
linkedin: ""
mail: ""
website: ""
draft: false
---`

                const re = RegExp(/[\W_]+/gm)
                let folderName = title.replace(re, '-').toLowerCase()

                if (!fs.existsSync(path.join(basePath, author))){
                    fs.mkdirSync(path.join(basePath, author))
                    fs.writeFileSync(path.join(basePath, author, `${author.toLowerCase()}.md`), authorMeta)
                }

                basePath = path.join(basePath, author)

                if (!fs.existsSync(path.join(basePath, folderName))){
                    fs.mkdirSync(path.join(basePath, folderName))
                    fs.writeFileSync(path.join(basePath, folderName, 'index.md'), metadata)

                    console.log(`Post file created at ${path.join(basePath, folderName, 'index.md')} 🥳 🥳 🥳`)
                    console.log("Don't forget to write a short summary in the Metadata 😊")
                } else {
                    console.log(`${title} already exist 🙁`)
                }
                rl.close()
            })
        })
    })
    
})
