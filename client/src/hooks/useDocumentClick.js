import { useEffect } from 'react';

const useDocumentClick = (componentHandlerFunction) => {
    useEffect(() => {
        // Add event listener to the document
        const handleDocumentClick = (event) => {
            componentHandlerFunction(event);
        };

        window.addEventListener('click', handleDocumentClick);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('click', handleDocumentClick);
        };
    }, [componentHandlerFunction]);
};

export default useDocumentClick;