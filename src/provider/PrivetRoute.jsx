import React from 'react';
import UseAuth from '../hooks/UseAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';

const PrivetRoute = ({children}) => {
    const {user, loading} = UseAuth()
    const location = useLocation();
    
    if(loading){
        return <Loading></Loading>
    }

    if(user) {
        return children;
    }
    return <Navigate to='/login' state={{from: location}} replace></Navigate>;
};

export default PrivetRoute;