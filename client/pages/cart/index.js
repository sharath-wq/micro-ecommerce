import useRequest from '@/hooks/use-request';
import { useRouter } from 'next/router';

const CartShow = ({ cartData }) => {
    const router = useRouter();
    const totalPrice = cartData.products.reduce((sum, item) => sum + item.price, 0);

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
        <div class='container max-w-[600px] mx-0 my-auto mt-28'>
            <div class='max-w-2xl mx-auto bg-white shadow-md rounded p-6'>
                <h1 class='text-3xl font-bold mb-6'>Your Cart</h1>

                {cartData && cartData.products.length ? (
                    cartData.products.map((item) => (
                        <div key={item.id} class='flex items-center mb-4'>
                            <img src={item.image} alt='Product Image' class='w-16 h-16 object-contain mr-4 rounded-lg' />
                            <div class='flex-1'>
                                <h2 class='text-lg font-semibold'>{item.title}</h2>
                                <p class='text-gray-700'>
                                    Price: <span class='font-semibold text-teal-500'>${item.price}</span>
                                </p>
                            </div>
                            <button onClick={() => onRemove(item.id)} class='ml-2 text-red-500 focus:outline-none'>
                                Remove
                            </button>
                        </div>
                    ))
                ) : (
                    <div>No Items in cart</div>
                )}

                {cartData.products.length !== 0 && (
                    <div class='mt-8'>
                        <p class='text-gray-700 mb-2'>
                            Total: <span class='font-semibold text-teal-500'>${totalPrice}</span>
                        </p>
                        <button class='bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

CartShow.getInitialProps = async (context, client) => {
    const { data } = await client.get(`/api/cart`);
    return { cartData: data };
};

export default CartShow;
