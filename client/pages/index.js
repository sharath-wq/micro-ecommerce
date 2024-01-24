import Link from 'next/link';

const LandingPage = ({ currentUser }) => {
    return (
        <div className='flex gap-5 container max-w-[400px] mx-0 my-auto mt-28'>
            Hai, there {currentUser && currentUser.email}
        </div>
    );
};

// LandingPage.getInitialProps = async (context, client, currentUser) => {

// };

export default LandingPage;
