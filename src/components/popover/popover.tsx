"use client"
import React, {ReactElement, ReactNode, useMemo} from 'react';
import styles from './popover.module.css';
import {PopoverContext} from './context/context';
import {cx} from './utils/utils';

interface PopoverProps {
    children: ReactNode;
    className?: string;
}

/**
 * A component that creates a popover container using the native HTML popover API.
 * Must be used with PopoverTrigger and PopoverContent components.
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Must contain PopoverTrigger and PopoverContent components
 * @param {string} [props.className] - Optional CSS class for additional styling
 *
 * @example
 * // Basic usage
 * <Popover>
 *   <PopoverTrigger>
 *     <button>Open Menu</button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <div>Popover content here</div>
 *   </PopoverContent>
 * </Popover>
 *
 * @example
 * // With custom styling
 * <Popover className="custom-wrapper">
 *   <PopoverTrigger>
 *     <button className="menu-button">Settings</button>
 *   </PopoverTrigger>
 *   <PopoverContent className="settings-menu">
 *     <nav>
 *       <ul>
 *         <li><button>Profile</button></li>
 *         <li><button>Preferences</button></li>
 *       </ul>
 *     </nav>
 *   </PopoverContent>
 * </Popover>
 *
 * @returns {ReactElement} A Popover component that manages its children's state and positioning
 */
export function Popover({children, className}: PopoverProps): ReactElement {
    const id = useMemo(
        () => `popover-${Math.random().toString(36).slice(2, 11)}`,
        []
    );

    return (
        <PopoverContext.Provider value={{id}}>
            <div className={cx(styles.popover, className)}>{children}</div>
        </PopoverContext.Provider>
    );
}
