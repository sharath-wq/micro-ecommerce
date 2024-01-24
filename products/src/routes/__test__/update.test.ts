import request from 'supertest';
import { app } from '../../app';
import { Product } from '../../models/product';
import { getCookies } from '../../utils/getCookies';
import mongoose from 'mongoose';

it('returns a 401 if user is not authenticated', async () => {
    const fakeOrderId = new mongoose.Types.ObjectId().toHexString();
    await request(app).put(`/api/products/${fakeOrderId}`).send().expect(401);
});

it('returns a 404 if the product is not found', async () => {
    const fakeOrderId = new mongoose.Types.ObjectId().toHexString();

    const token = await getCookies();
    await request(app)
        .put(`/api/products/${fakeOrderId}`)
        .set('Cookie', token[0])
        .send({
            title: 'Updated Title',
            description: 'Updated Description',
            image: 'updated-image-url',
            price: 20.99,
        })
        .expect(404);
});

it('returns a 401 if the user is not the owner of the product', async () => {
    // Create a product with a different user ID
    const product = Product.build({
        title: 'Test Product',
        description: 'Test Description',
        image: 'test-image-url',
        price: 10.99,
        userId: new mongoose.Types.ObjectId().toHexString(),
    });
    await product.save();

    const token = await getCookies(new mongoose.Types.ObjectId().toHexString());
    await request(app)
        .put(`/api/products/${product.id}`)
        .set('Cookie', token[0])
        .send({
            title: 'Updated Title',
            description: 'Updated Description',
            image: 'updated-image-url',
            price: 20.99,
        })
        .expect(401);
});

it('returns a 400 with invalid inputs', async () => {
    const token = await getCookies();
    const product = await Product.build({
        title: 'Test Product',
        description: 'Test Description',
        image: 'test-image-url',
        price: 10.99,
        userId: 'current-user-id',
    });
    await product.save();

    await request(app)
        .put(`/api/products/${product.id}`)
        .set('Cookie', token[0])
        .send({
            title: '', // Invalid title
            description: 'Updated Description',
            image: 'updated-image-url',
            price: -20.99, // Invalid price
        })
        .expect(400);
});

it('updates the product with valid inputs', async () => {
    const userId = new mongoose.Types.ObjectId().toHexString();
    const token = await getCookies(userId);
    const product = await Product.build({
        title: 'Test Product',
        description: 'Test Description',
        image: 'test-image-url',
        price: 10.99,
        userId: userId,
    });
    await product.save();

    await request(app)
        .put(`/api/products/${product.id}`)
        .set('Cookie', token[0])
        .send({
            title: 'Updated Title',
            description: 'Updated Description',
            image: 'updated-image-url',
            price: 20.99,
        })
        .expect(200);

    // Fetch the updated product from the database
    const updatedProduct = await Product.findById(product.id);
    expect(updatedProduct!.title).toEqual('Updated Title');
    expect(updatedProduct!.description).toEqual('Updated Description');
    expect(updatedProduct!.image).toEqual('updated-image-url');
    expect(updatedProduct!.price).toEqual(20.99);
});

// Add more test cases as needed
