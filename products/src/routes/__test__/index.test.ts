import request from 'supertest';
import { app } from '../../app';
import { getCookies } from '../../utils/getCookies';

const createProduct = () => {
    return request(app).post('/api/products').set('Cookie', getCookies()).send({
        title: 'Product1',
        description: 'description',
        price: 100,
        image: 'adhsfija',
    });
};

it('can fetcha list of tickets', async () => {
    await createProduct();
    await createProduct();
    await createProduct();

    const response = await request(app).get('/api/products').send().expect(200);

    expect(response.body.length).toEqual(3);
});
