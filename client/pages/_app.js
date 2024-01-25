import '@/styles/globals.css';
import buildClient from '@/api/build-client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AppComponent = ({ Component, pageProps, currentUser, cartLength }) => {
    return (
        <div className='w-full  flex flex-col justify-center items-center'>
            <Navbar cartLength={cartLength} currentUser={currentUser} />
            <Component {...pageProps} currentUser={currentUser} />
            <Footer />
        </div>
    );
};

AppComponent.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser');
    let cartLength = 0;

    if (data?.currentUser) {
        cartLength = (await client.get('/api/cart')).data.products.length;
    }

    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
    }

    return {
        pageProps,
        cartLength,
        ...data,
    };
};

export default AppComponent;
