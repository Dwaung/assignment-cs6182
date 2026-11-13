import mongoose from 'mongoose'

export async function initDatabase() {
    const DATABASE_URL = process.env.DATABASE_URL

    if (!DATABASE_URL) {
        throw new Error('DATABASE_URL environment variable is missing')
    }

    try {
        await mongoose.connect(DATABASE_URL)

        console.info('Successfully connected to MongoDB')

    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message)
        throw error
    }
}