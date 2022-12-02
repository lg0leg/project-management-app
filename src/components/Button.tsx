import { FC, ReactNode } from 'react';

interface IButtonProps {
  children?: ReactNode;
  color?: string;
  customClasses?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  margin?: number;
  onClick?: () => void;
}

interface Colors {
  [key: string]: string;
}

export const Button: FC<IButtonProps> = ({
  children,
  color = 'deafault',
  customClasses,
  type = 'button',
  margin,
  onClick,
}) => {
  const colors: Colors = {
    deafault: 'bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-300',
    alternative:
      'border border-gray-200 bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-200',
    dark: 'bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-300',
    light: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 focus:ring-gray-200',
    green: 'bg-green-700 text-white hover:bg-green-800 focus:ring-green-300',
    red: 'bg-red-700 text-white hover:bg-red-800 focus:ring-red-300',
    yellow: 'bg-yellow-400 text-white hover:bg-yellow-500 focus:ring-yellow-300',
    purple: 'bg-purple-700 text-white hover:bg-purple-800 focus:ring-purple-300',
  };
  return (
    <button
      type={type}
      className={
        !customClasses
          ? `mx-${
              margin ? margin : '0'
            } rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-4 ${
              colors[color]
            } `
          : customClasses
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};
