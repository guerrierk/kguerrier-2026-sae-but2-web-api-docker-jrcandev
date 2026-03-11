import express from 'express'
import { prisma } from './client.js'

const app = express()
app.use(express.json())

app.get('/api/health', async (_req, res) => {
  try {
    // Test simple de connexion PostgreSQL via Prisma
    await prisma.$queryRaw`SELECT 1`

    res.status(200).json({
      status: 'ok',
      api: 'up',
      database: 'up'
    })
  } catch (error) {
    console.error('Healthcheck failed:', error)

    res.status(503).json({
      status: 'error',
      api: 'up',
      database: 'down'
    })
  }
})


const port = process.env.API_PORT
app.listen(port, () => {
    console.log(`API running on port ${port}`)
})