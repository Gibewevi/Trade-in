'use client'

// components/RemoveHeader.js
import { useEffect } from 'react';

const RemoveHeader = () => {
    useEffect(() => {
        const header = document.getElementById('header');
        if (header) {
            header.style.display = 'none';
        }

        // Nettoyage : réafficher la header lorsque le composant est démonté
        return () => {
            if (header) {
                header.style.display = '';
            }
        };
    }, []);

    return null;
};

export default RemoveHeader;
