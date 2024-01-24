import { useState } from 'react';
import { Router, useRouter } from 'next/router';
import useRequest from '@/hooks/use-request';
import Link from 'next/link';

const ProductUpdate = ({ product }) => {
    const router = useRouter();
    const { productId } = router.query;

    const [updatedProduct, setUpdatedProduct] = useState({
        title: product.title,
        price: product.price,
        description: product.description,
        image: product.image,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct({
            ...updatedProduct,
            [name]: value,
        });
    };

    const { doRequest, errors } = useRequest({
        url: `/api/products/${productId}`,
        method: 'put', // Assuming you're using PUT for updating
        body: updatedProduct,
        onSuccess: () => router.push('/'),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        doRequest();
    };

    return (
        <div className='container max-w-[600px] mx-0 my-auto mt-28'>
            <h1 className='text-3xl font-bold mb-6'>Edit Product</h1>
            <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='title'>
                        Title
                    </label>
                    <input
                        type='text'
                        id='title'
                        name='title'
                        value={updatedProduct.title}
                        onChange={handleInputChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        placeholder='Product Title'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='price'>
                        Price
                    </label>
                    <input
                        type='number'
                        id='price'
                        name='price'
                        value={updatedProduct.price}
                        onChange={handleInputChange}
                        step='0.01'
                        min='0'
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        placeholder='Product Price'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='description'>
                        Description
                    </label>
                    <textarea
                        id='description'
                        name='description'
                        value={updatedProduct.description}
                        onChange={handleInputChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        placeholder='Product Description'
                    ></textarea>
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='imageURL'>
                        Image URL
                    </label>
                    <input
                        type='text'
                        id='imageURL'
                        name='image'
                        value={updatedProduct.image}
                        onChange={handleInputChange}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        placeholder='Product Image URL'
                    />
                </div>
                {errors}
                <div className='flex items-center justify-between'>
                    <button
                        type='submit'
                        className='bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    >
                        Update Product
                    </button>
                </div>
            </form>
        </div>
    );
};

ProductUpdate.getInitialProps = async (context, client) => {
    const { productId } = context.query;
    const { data } = await client.get(`/api/products/${productId}`);
    return { product: data };
};

export default ProductUpdate;
