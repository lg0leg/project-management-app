import { FC } from 'react';

interface IPriority {
  type?: string;
}

export const Priority: FC<IPriority> = ({ type }) => {
  return (
    <>
      {type && type === 'none' && null}
      {type && type === 'critical' && (
        <span className="w-full rounded bg-red-100 px-2.5 py-0.5 text-center text-sm font-medium text-red-800">
          Critical
        </span>
      )}
      {type && type === 'high' && (
        <span className="w-full rounded bg-yellow-100 px-2.5 py-0.5 text-center text-sm font-medium text-yellow-800">
          High
        </span>
      )}
      {type && type === 'medium' && (
        <span className="w-full rounded bg-blue-100 px-2.5 py-0.5 text-center text-sm font-medium text-blue-800">
          Medium
        </span>
      )}
      {type && type === 'low' && (
        <span className="w-full rounded bg-green-100 px-2.5 py-0.5 text-center text-sm font-medium text-green-800">
          Low
        </span>
      )}
    </>
  );
};
