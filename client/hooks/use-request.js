import axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async (props = {}) => {
        try {
            setErrors(null);
            const response = await axios[method](url, { ...body, ...props });

            if (onSuccess) {
                onSuccess(response.data);
            }

            return response.data;
        } catch (error) {
            setErrors(
                <div
                    className='mb-4 flex flex-col items-start justify-start w-full rounded-lg bg-teal-100  p-4 text-sm gap-1'
                    role='alert'
                >
                    <span className='font-medium text-3xl' style={{ color: '#e53e3e' }}>
                        Oops!
                    </span>
                    <ul className='list-disc pl-4'>
                        {error?.response?.data?.errors.map((err) => (
                            <li key={err.field} style={{ color: '#e53e3e' }}>
                                {err.message}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    };

    return { doRequest, errors };
};
