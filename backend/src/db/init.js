import mongoose from 'mongoose'

export function initDatabase() {
    const DATABASE_URL = process.env.DATABASE_URL

    if (!DATABASE_URL) {
        throw new Error('DATABASE_URL environment variable is missing')
    }

    mongoose.connection.on('open', () => {
        console.info('Successfully connected to MongoDB')
    })

    return mongoose.connect(DATABASE_URL)
}