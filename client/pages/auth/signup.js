import { useEffect, useState } from 'react';
import Router from 'next/router';

import useRequest from '@/hooks/use-request';

export default ({ currentUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email,
            password,
        },
        onSuccess: () => Router.push('/'),
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        doRequest();
    };

    useEffect(() => {
        if (currentUser) {
            Router.replace('/');
        }
    }, []);

    return (
        <div class='container max-w-[400px] mx-0 my-auto mt-28'>
            <form onSubmit={onSubmit} class='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <div class='mb-4'>
                    <label class='block text-gray-700 text-sm font-bold mb-2' for='email'>
                        Email
                    </label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='email'
                        type='email'
                        placeholder='Email'
                    />
                </div>
                <div class='mb-4'>
                    <label class='block text-gray-700 text-sm font-bold mb-2' for='password'>
                        Password
                    </label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='password'
                        type='password'
                        placeholder='Password'
                    />
                </div>
                {errors}
                <div class='flex items-center justify-between'>
                    <button
                        class='bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        type='submit'
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};
