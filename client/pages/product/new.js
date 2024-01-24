import useRequest from '@/hooks/use-request';
import Router from 'next/router';
import { useEffect, useState } from 'react';

export default ({ currentUser }) => {
    const [productTitle, setProductTitle] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImageURL, setProductImageURL] = useState('');

    const { doRequest, errors } = useRequest({
        url: '/api/products',
        method: 'post',
        body: {
            title: productTitle,
            description: productDescription,
            price: productPrice,
            image: productImageURL,
        },
        onSuccess: () => Router.push('/'),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        doRequest();
    };

    useEffect(() => {
        if (!currentUser) {
            Router.replace('/auth/signin');
        }
    }, []);

    return (
        <div className='container max-w-[400px] mx-0 my-auto mt-28'>
            <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='productTitle'>
                        Product Title
                    </label>
                    <input
                        value={productTitle}
                        onChange={(e) => setProductTitle(e.target.value)}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='productTitle'
                        type='text'
                        placeholder='Enter product title'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='productPrice'>
                        Product Price
                    </label>
                    <input
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='productPrice'
                        type='number'
                        placeholder='Enter product price'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='productDescription'>
                        Product Description
                    </label>
                    <textarea
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='productDescription'
                        placeholder='Enter product description'
                        required
                    ></textarea>
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='productImageURL'>
                        Product Image URL
                    </label>
                    <input
                        value={productImageURL}
                        onChange={(e) => setProductImageURL(e.target.value)}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='productImageURL'
                        type='url'
                        placeholder='Enter product image URL'
                        required
                    />
                </div>
                {errors}
                <div className='flex items-center justify-between'>
                    <button
                        className='bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        type='submit'
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};
