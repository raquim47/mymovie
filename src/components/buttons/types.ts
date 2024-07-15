import { ButtonHTMLAttributes, ReactNode } from 'react';
import { LinkProps } from 'react-router-dom';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  accent?: boolean;
}

export interface ILinkButtonProps extends LinkProps {
  children: ReactNode;
}
