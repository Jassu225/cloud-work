import * as React from 'react';
import './Button.css';

type ButtonTypes = 'submit' | 'reset' | 'button';

interface ButtonProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  type?: ButtonTypes;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className, type }) => {
  return (
    <button className={`Button-container ${className}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: '',
  type: 'button'
};

export default Button;