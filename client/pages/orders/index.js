import ProductModel from '@/components/ProductModel';
import { useState } from 'react';

const OrderShow = ({ orders }) => {
    const [isModelOpen, setisModelOpen] = useState(false);

    return (
        <div className='container max-w-[600px] mx-0 my-auto mt-28'>
            <h1 className='text-3xl font-bold mb-6'>Your Orders</h1>

            {orders.length > 0 ? (
                <ul className='divide-y divide-gray-300'>
                    {orders.map((order) => (
                        <li key={order.id} className='py-4'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <h2 className='text-lg font-semibold'>{order.id}</h2>
                                    <p className='text-gray-700'>Order Status: {order.status}</p>
                                </div>
                                <button
                                    onClick={() => setisModelOpen(true)}
                                    className='bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                                >
                                    Details
                                </button>
                            </div>
                            {isModelOpen && <ProductModel products={order.products} close={setisModelOpen} />}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-gray-600'>No orders available.</p>
            )}
        </div>
    );
};

OrderShow.getInitialProps = async (context, client) => {
    const { data } = await client.get(`/api/orders`);
    return { orders: data };
};

export default OrderShow;
