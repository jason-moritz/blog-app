import db from '../db/connection.js'
import Post from '../models/post.js'
import faker from 'faker'

const insertData = async () => {
    await db.dropDatabase()

const posts = [...Array(50)].map((post) => {

    return {
    title: faker.lorem.sentence(),
    author: faker.name.findName(),
    imgURL: faker.internet.url(),
    article: faker.lorem.paragraph()
    }
})

await Post.insertMany(posts)
console.log('Created Post')

db.close()
}

insertData()