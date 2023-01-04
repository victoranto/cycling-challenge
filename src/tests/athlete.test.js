const request = require('supertest')
const api = require('../../index')

describe('API Pokemon', () =>{
  it("API test are returned as json", async () => {
    await request(api)
      .get('/test')
      .expect('Content-Type', /application\/json/)
  })  
  
})
