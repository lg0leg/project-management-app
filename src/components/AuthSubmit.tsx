import React from 'react';
interface IProps {
  text: string;
}
export default function AuthSubmit({ text }: IProps) {
  return (
    <button
      type="submit"
      className="mt-5 w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none "
    >
      {text}
    </button>
  );
}
