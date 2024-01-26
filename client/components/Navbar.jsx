import Link from 'next/link';

const Navbar = ({ currentUser, cartLength }) => {
    const links = [
        !currentUser && { label: 'Signup', href: '/auth/signup' },
        !currentUser && { label: 'Signin', href: '/auth/signin' },
        currentUser && { label: 'Orders', href: '/orders' },
        currentUser && { label: `Cart ${cartLength}`, href: '/cart' },
        currentUser && { label: 'Sell', href: '/product/new' },
        currentUser && { label: 'Sign Out', href: '/auth/signout' },
    ]
        .filter((linkConfig) => linkConfig)
        .map(({ label, href }) => {
            return (
                <Link
                    key={label}
                    className='ml-4 inline-block rounded border border-white px-4 py-2 text-sm leading-none text-white hover:border-transparent hover:bg-white hover:text-teal-500 lg:mt-0'
                    href={href}
                >
                    {label}
                </Link>
            );
        });

    return (
        <nav className='flex justify-between w-full bg-teal-500 p-6 fixed top-0'>
            <div className='flex flex-shrink-0 items-center text-white'>
                <Link href={'/'} className='text-xl font-semibold tracking-tight cursor-pointer'>
                    Ecomm
                </Link>
            </div>
            <div className='flex items-center'>{links}</div>
        </nav>
    );
};

export default Navbar;
