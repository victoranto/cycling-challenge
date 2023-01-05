const request = require('supertest')
const api = require('../../index')

describe('API Athlete', () => {
  it ('API Athlete are returned as json', async () => {
    await request(api)
      .get('/athlete')
      .expect('Content-Type', /application\/json/)
  })
  it('There is at least one athlete', async () => {
    const response = await request(api).get('/athlete')
    expect(response.body.length).toBeGreaterThan(0)
  })
  it('Athletes have the property email', async () => {
    const response = await request(api).get('/athlete')
    expect(response.body[0]).toHaveProperty('email')
  })
  it('No added duplicate athlete', async () => {
    const response = await request(api).get('/athlete')
    const athlete = response.body[0]
    const at = {
      email: athlete.email,
      name: 'New Athlete'
    }
    const responsePost = await request(api).post('/athlete/new').send(at)
    expect(responsePost.status).toBe(500)
    expect(responsePost.body).toHaveProperty('code')
  })
})
