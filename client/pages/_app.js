import '@/styles/globals.css';
import buildClient from '@/api/build-client';
import Navbar from '@/components/Navbar';

const AppComponent = ({ Component, pageProps, currentUser }) => {
    return (
        <div className='w-full h-screen flex flex-col justify-center items-center bg-[#f4f4f4]'>
            <Navbar currentUser={currentUser} />
            <Component {...pageProps} currentUser={currentUser} />
        </div>
    );
};

AppComponent.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser');

    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
    }

    return {
        pageProps,
        ...data,
    };
};

export default AppComponent;
