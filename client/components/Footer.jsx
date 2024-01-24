const Footer = () => {
    return (
        <div className='container mx-auto my-10'>
            <hr className='border-t border-gray-300 my-8' />
            <footer className='flex items-center justify-between'>
                <p className='text-gray-600'>© 2024 Ecomm. All rights reserved.</p>
                <div className='flex space-x-4'>
                    <a href='#' className='text-teal-500 hover:text-teal-700'>
                        Privacy Policy
                    </a>
                    <a href='#' className='text-teal-500 hover:text-teal-700'>
                        Terms of Service
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
