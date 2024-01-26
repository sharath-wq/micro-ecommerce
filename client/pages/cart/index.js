import Model from '@/components/Model';
import useRequest from '@/hooks/use-request';
import { useRouter } from 'next/router';
import { useState } from 'react';

const CartShow = ({ cartData }) => {
    const router = useRouter();
    const totalPrice = cartData.products.reduce((sum, item) => sum + item.price, 0);
    const [isModelOpen, setIsModelOpen] = useState(false);

    const { doRequest, errors } = useRequest({
        url: '/api/cart/remove',
        method: 'post',
        body: {},
        onSuccess: (product) => {
            console.log(product);
            router.push(`/cart`);
        },
    });

    const onRemove = (productId) => {
        doRequest({ productId: productId });
    };

    return (
        <div className='container max-w-[600px] mx-0 my-auto mt-28'>
            <div className='max-w-2xl mx-auto bg-white shadow-md rounded p-6'>
                <h1 className='text-3xl font-bold mb-6'>Your Cart</h1>

                {cartData && cartData.products.length ? (
                    cartData.products.map((item) => (
                        <div key={item.id} className='flex items-center mb-4'>
                            <img
                                src={item.image}
                                alt='Product Image'
                                className='w-16 h-16 object-contain mr-4 rounded-lg'
                            />
                            <div className='flex-1'>
                                <h2 className='text-lg font-semibold'>{item.title}</h2>
                                <p className='text-gray-700'>
                                    Price: <span className='font-semibold text-teal-500'>${item.price}</span>
                                </p>
                            </div>
                            <button onClick={() => onRemove(item.id)} className='ml-2 text-red-500 focus:outline-none'>
                                Remove
                            </button>
                        </div>
                    ))
                ) : (
                    <div>No Items in cart</div>
                )}

                {cartData.products.length !== 0 && (
                    <div className='mt-8'>
                        <p className='text-gray-700 mb-2'>
                            Total: <span className='font-semibold text-teal-500'>${totalPrice}</span>
                        </p>
                        <button
                            onClick={() => setIsModelOpen(true)}
                            className='bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
            {isModelOpen && (
                <Model
                    cartId={cartData.id}
                    totalPrice={totalPrice}
                    products={cartData.products}
                    setIsModelOpen={setIsModelOpen}
                />
            )}
        </div>
    );
};

CartShow.getInitialProps = async (context, client) => {
    const { data } = await client.get(`/api/cart`);
    return { cartData: data };
};

export default CartShow;
