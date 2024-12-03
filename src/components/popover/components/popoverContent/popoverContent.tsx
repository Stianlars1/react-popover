"use client";
import {Children, cloneElement, isValidElement, ReactNode, useRef} from 'react';
import styles from './popoverContent.module.css';
import {usePopover} from '../../context/context';
import {cx} from "@/components/popover/utils/utils";

interface PopoverContentProps {
    children: ReactNode;
    className?: string;
}

export function PopoverContent({children, className}: PopoverContentProps) {
    const {id} = usePopover();
    const popoverRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={popoverRef}
            id={id}
            popover="auto"
            className={cx(styles.popoverContent, className)}
        >
            {/*
        Clone children and add popovertarget attribute to any button
        that has popoverTargetAction
      */}
            {Children.map(children, child => {
                if (
                    isValidElement(child) &&
                    child.type === 'button' &&
                    'popoverTargetAction' in child.props  // Correct React camelCase
                ) {
                    return cloneElement(child, {
                        popoverTarget: id,  // Correct React camelCase
                        ...child.props
                    });
                }
                return child;
            })}
        </div>
    );
}