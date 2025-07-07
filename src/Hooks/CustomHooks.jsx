
import { AuthContext } from '../Context/AuthContext/AuthContext';
import { useContext } from 'react';

const CustomHooks = () => {
    const authInfo = useContext(AuthContext)
    return authInfo
};

export default CustomHooks;