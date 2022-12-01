import { useAppSelector } from 'app/hooks';
import { LangKey } from 'constants/lang';
import { FC } from 'react';

interface IPriority {
  type?: string;
}

export const Priority: FC<IPriority> = ({ type }) => {
  const { lang } = useAppSelector((state) => state.langReducer);
  return (
    <>
      {type && type === 'none' && null}
      {type && type === 'critical' && (
        <div className="h-6 w-full rounded-t-full bg-red-100 text-center">
          <span className=" text-sm font-medium text-red-800">
            {lang === LangKey.EN ? 'Critical' : 'Критический'}
          </span>
        </div>
      )}
      {type && type === 'high' && (
        <div className="h-6 w-full rounded-t-full bg-yellow-100 text-center">
          <span className="text-sm font-medium text-yellow-800">
            {lang === LangKey.EN ? 'High' : 'Высокий'}
          </span>
        </div>
      )}
      {type && type === 'medium' && (
        <div className="h-6 w-full rounded-t-full bg-blue-100 text-center">
          <span className="text-sm font-medium text-blue-800">
            {lang === LangKey.EN ? 'Medium' : 'Средний'}
          </span>
        </div>
      )}
      {type && type === 'low' && (
        <div className="h-6 w-full rounded-t-full bg-green-100 text-center">
          <span className="text-sm font-medium text-green-800">
            {lang === LangKey.EN ? 'Low' : 'Низкий'}
          </span>
        </div>
      )}
    </>
  );
};
