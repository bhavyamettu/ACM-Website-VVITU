import { createContext, useContext } from 'react';

// Navigation + shared UI state (page turning, selected timeline year, modal …)
export const NavContext = createContext(null);
export const useNav = () => useContext(NavContext);
