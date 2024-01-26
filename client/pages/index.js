import Link from 'next/link';

const LandingPage = ({ currentUser, products }) => {
    const truncateDescription = (text, maxChars) => {
        if (text.length > maxChars) {
            return text.substring(0, maxChars) + '...';
        }
        return text;
    };

    return products && products.length ? (
        <div className='container mx-0 my-auto mt-28'>
            <h1 className='text-3xl font-bold mb-6'>Product List</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                {products.map((product) => (
                    <Link key={product.id} href={`/product/${product.id}`}>
                        <div className='bg-white shadow-md rounded p-4'>
                            <img src={product.image} alt={product.title} className='w-full h-40 object-contain mb-4' />
                            <h2 className='text-lg font-bold mb-2'>{product.title}</h2>
                            <p className='text-gray-700 mb-2'>
                                Price:{' '}
                                <span className='font-semibold text-teal-500 text-2xl '>${product.price.toFixed(2)}</span>
                            </p>
                            <p className='text-gray-600'>{truncateDescription(product.description, 80)}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    ) : (
        <div className='container mx-0 flex justify-center my-auto mt-28'>No Product Available</div>
    );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
    const { data } = await client.get('/api/products');

    return { products: data };
};

export default LandingPage;
