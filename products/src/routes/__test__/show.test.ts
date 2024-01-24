import request from 'supertest';
import { app } from '../../app';
import { Product } from '../../models/product';
import mongoose from 'mongoose';

it('returns a 404 if the product is not found', async () => {
    const fakeOrderId = new mongoose.Types.ObjectId().toHexString();
    const response = await request(app).get(`/api/products/${fakeOrderId}`).send().expect(404);

    expect(response.body.errors[0].message).toEqual('Not found');
});

it('returns the product if it is found', async () => {
    // Create a product to be fetched
    const product = Product.build({
        title: 'Test Product',
        description: 'Test Description',
        image: 'test-image-url',
        price: 10.99,
        userId: new mongoose.Types.ObjectId().toHexString(),
    });
    await product.save();

    // Make a request to fetch the product
    const response = await request(app).get(`/api/products/${product.id}`).send().expect(200);

    // Assert that the response contains the fetched product
    expect(response.body.id).toEqual(product.id);
    expect(response.body.title).toEqual('Test Product');
    expect(response.body.description).toEqual('Test Description');
    expect(response.body.image).toEqual('test-image-url');
    expect(response.body.price).toEqual(10.99);
});

// Add more test cases as needed
