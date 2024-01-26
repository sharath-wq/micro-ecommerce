import useRequest from '@/hooks/use-request';
import { useRouter } from 'next/router';

const Model = ({ products, setIsModelOpen, totalPrice, cartId }) => {
    const router = useRouter();

    const { doRequest, errors } = useRequest({
        url: '/api/orders',
        method: 'post',
        body: {
            cartId: cartId,
        },
        onSuccess: (order) => {
            router.push(`/orders`);
        },
    });

    return (
        <div className='modal' id='checkoutModal'>
            <div className='modal-content p-6 bg-white max-w-md mx-auto rounded shadow-lg'>
                <h1 className='text-3xl font-bold mb-6'>Checkout</h1>
                {products.map((product) => (
                    <div key={product.id} className='flex items-center mb-4'>
                        <img src={product.image} alt='Product Image' className='w-16 h-16 object-contain mr-4 rounded-lg' />
                        <div className='flex-1'>
                            <h2 className='text-lg font-semibold'>{product.title}</h2>
                            <p className='text-gray-700'>
                                Price: <span className='font-semibold text-teal-500'>${product.price}</span>
                            </p>
                        </div>
                    </div>
                ))}
                <div className='mt-8'>
                    <p className='text-gray-700 mb-2'>
                        Total: <span className='font-semibold text-teal-500'>${totalPrice}</span>
                    </p>
                    <div onClick={() => doRequest()} className='flex gap-3'>
                        <button className='bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                            Buy Now
                        </button>
                        <button
                            className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                            onClick={() => setIsModelOpen(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Model;
