import React from 'react';

const ProductModel = ({ close, products }) => {
    console.log(products);

    return (
        <div className='fixed inset-0 z-10 flex items-center justify-center'>
            <div className='absolute inset-0 bg-gray-800 opacity-75'></div>
            <div className='bg-white p-6 max-w-md mx-auto rounded-lg z-20'>
                <h1 className='text-3xl font-bold mb-6'>Order Details</h1>
                {products.map((product) => (
                    <>
                        <p className='text-gray-700'>Title: {product.title}</p>
                        <p className='text-gray-700'>Price: {product.price}</p>
                    </>
                ))}
                <button
                    className='bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4'
                    onClick={() => close(false)}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ProductModel;
