import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RefreshOnRouteChange = () => {
    const location = useLocation();

    useEffect(() => {
        // List of specific routes where a refresh is needed
        const refreshRoutes = ['/rv400', '/rv1', '/rv1plus', "/rv400-brz"];

        if (refreshRoutes.includes(location.pathname)) {
            // Force a page refresh
            window.location.reload();
        }
    }, [location]);

    return null; // This component doesn't need to render anything
};

export default RefreshOnRouteChange;