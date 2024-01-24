import request from 'supertest';
import { app } from '../../app';
import { Product } from '../../models/product';
import { getCookies } from '../../utils/getCookies';

const createProduct = async (token: string) => {
    return request(app).post('/api/products').set('Cookie', token).send({
        title: 'Test Product',
        description: 'Test Description',
        image: 'test-image-url',
        price: 10.99,
    });
};

it('returns a 401 if user is not authenticated', async () => {
    await request(app).post('/api/products').send().expect(401);
});

it('returns a 400 with invalid title', async () => {
    const token = await getCookies();
    await request(app)
        .post('/api/products')
        .set('Cookie', token)
        .send({
            description: 'Test Description',
            image: 'test-image-url',
            price: 10.99,
        })
        .expect(400);
});

it('returns a 400 with invalid price', async () => {
    const token = await getCookies();
    await request(app)
        .post('/api/products')
        .set('Cookie', token)
        .send({
            title: 'Test Product',
            description: 'Test Description',
            image: 'test-image-url',
            price: -10.99, // Negative price
        })
        .expect(400);
});

it('returns a 400 with invalid description', async () => {
    const token = await getCookies();
    await request(app)
        .post('/api/products')
        .set('Cookie', token)
        .send({
            title: 'Test Product',
            image: 'test-image-url',
            price: 10.99,
        })
        .expect(400);
});

it('creates a product with valid inputs', async () => {
    const token = await getCookies();

    let products = await Product.find({});
    expect(products.length).toEqual(0);

    await createProduct(token[0]);

    products = await Product.find({});
    expect(products.length).toEqual(1);
    expect(products[0].title).toEqual('Test Product');
});
