import { start_db } from "$db/mongo";

start_db().then(() => {
    console.log('MongoDB connected!')
}).catch(e => {
    console.error('MongoDB connection failed!', e)
})

