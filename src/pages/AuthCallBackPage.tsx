import { useAuth0 } from '@auth0/auth0-react';
import { useCreateUser } from '@/api/UserApi';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthCallBackPage() {
    const navigate = useNavigate();
    const { user } = useAuth0(); 
    const createUserRequest = useCreateUser();

    const hasCreatedUser = useRef(false);
    useEffect(() => {
        if (user?.sub && user?.email) {
            createUserRequest.mutate({auth0Id:user.sub, email:user.email});
            hasCreatedUser.current = true;
        }
        navigate('/');
    }, [createUserRequest,navigate,user]);
    return(
        <div>Loading</div>
    )
}
