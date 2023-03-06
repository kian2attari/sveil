import { MongoClient } from 'mongodb';
import { MONGO_URL } from '$env/static/private';

const client = new MongoClient(MONGO_URL)

export function start_db(): Promise<MongoClient> {
    console.log('Connecting to MongoDB...')
    return client.connect()
}

export default client.db()