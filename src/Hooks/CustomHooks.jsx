import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext/AuthContext';

const CustomHooks = () => {
    const authInfo = use(AuthContext)
    return authInfo
};

export default CustomHooks;