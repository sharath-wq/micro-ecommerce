import useRequest from '@/hooks/use-request';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ProductShow = ({ product, currentUser }) => {
    const router = useRouter();

    // const { doRequest, errors } = useRequest({
    //     url: '/api/orders',
    //     method: 'post',
    //     body: {
    //         ticketId: ticket.id,
    //     },
    //     onSuccess: (order) => {
    //         console.log(order);
    //         router.push(`/orders/${order.id}`);
    //     },
    // });

    return (
        <div className='container max-w-[600px] mx-0 my-auto mt-28'>
            <div className='max-w-2xl mx-auto bg-white shadow-md rounded p-6'>
                <div className='flex justify-center'>
                    <img src={product.image} alt={product.title} className='w-full h-80 object-contain mb-6 rounded-lg' />
                </div>
                <div className=''>
                    <div>
                        <h1 className='text-3xl font-bold mb-2'>{product.title}</h1>
                        <p className='text-gray-700 mb-2'>
                            Price: <span className='font-semibold text-teal-500 text-2xl'>${product.price.toFixed(2)}</span>
                        </p>
                        <p className='text-gray-600 mb-6'>{product.description}</p>
                    </div>
                    <div className='flex gap-2'>
                        <button className='bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                            Add to Cart
                        </button>
                        {product.userId === currentUser.id && (
                            <Link
                                href={`/product/edit/${product.id}`}
                                type='button'
                                className='bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                            >
                                Edit Product
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

ProductShow.getInitialProps = async (context, client) => {
    const { productId } = context.query;
    const { data } = await client.get(`/api/products/${productId}`);
    return { product: data };
};

export default ProductShow;
