const app = require("./index")
const supertest = require('supertest')
const request = supertest(app)

it('get allergens', async done => {
    const response = await request.get('/allergens')
    expect(response.status).toBe(200)
    expect(response.body[0]).toBe('gluten')
    done()
  })

  it('get products', async done => {
    const response = await request.get('/products')
    let isArray = Array.isArray(JSON.parse(response.text));
    expect(isArray).toBe(true)
    done()
  })

  it('get memebers', async done => {
    const response = await request.get('/members')
    let isArray = Array.isArray(JSON.parse(response.text));
    expect(isArray).toBe(true)
    done()
  })

  it('caneat algorhitm', async done => {
    const response = await request.get('/caneat')
    let isArray = Array.isArray(JSON.parse(response.text));
    expect(isArray).toBe(true)
    done()
  })

  it('add member', async done => {
    let query = {name:"Axx"};
    const response = await request.post('/member').send( query ).set('Accept', 'application/json')
    expect(response.text).toBe(`{"info":"member added"}`)
    done()
  })

  it('add member allergen', async done => {
    let query = {"allergens":["milk"]}
    const response = await request.put('/member/Axx/allergens').send(query)
    expect(response.text).toBe(`{"info":"memeber updated"}`)
    done()
  })

  it('remove member allergen', async done => {
    let query = {"allergens":["milk"]}
    const response = await request.delete('/member/Axx/allergens').send(query);
    expect(response.text).toBe(`{"info":"memeber updated"}`)
    done()
  })

  it('remove member', async done => {
    const response = await request.delete('/member/Axx')
    expect(response.text).toBe(`{"memeber":"deleted"}`)
    done()
  })

  it('add product', async done => {
    let query = {barcode:"5050083516313"};
    const response = await request.post('/product').send( query ).set('Accept', 'application/json')
    expect(response.text).toBe(`{"product":"added"}`)
    done()
  })

  it('remove product', async done => {
    let query = {barcode:"5050083516313"};
    const response = await request.delete('/product/5050083516313')
    expect(response.text).toBe(`{"product":"deleted"}`)
    done()
  })



  

  afterAll(() => {
    app.close();
  });

