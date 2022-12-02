import { useAppSelector } from 'app/hooks';
import { LangKey } from 'constants/lang';
import { FC } from 'react';
import { Popover } from 'react-tiny-popover';
import { Button } from './Button';

interface IPointFilter {
  isFilterOpen: boolean;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  priority: string[];
  checkedState: boolean[];
  handleOnChange: (position: number) => void;
}
export const HighliteByPriority: FC<IPointFilter> = ({
  isFilterOpen,
  setIsFilterOpen,
  priority,
  checkedState,
  handleOnChange,
}) => {
  const { lang } = useAppSelector((state) => state.langReducer);
  return (
    <Popover
      isOpen={isFilterOpen}
      positions={['bottom', 'left', 'top', 'right']}
      padding={10}
      onClickOutside={() => setIsFilterOpen((prev) => !prev)}
      content={
        <div className="z-10 w-48 rounded border-2 border-gray-50 bg-white shadow-md">
          <ul
            className="space-y-1 p-3 text-sm text-gray-700"
            aria-labelledby="dropdownBgHoverButton"
          >
            {priority.map((p, index) => {
              return (
                <li key={index}>
                  <div className="flex items-center rounded p-2 hover:bg-gray-100">
                    <input
                      id={'checkbox-' + p}
                      type="checkbox"
                      name={p}
                      value={p}
                      checked={checkedState[index]}
                      onChange={() => handleOnChange(index)}
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600"
                    />
                    <label
                      htmlFor={'checkbox-' + p}
                      className="ml-2 w-full rounded text-base font-medium text-gray-900"
                    >
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </label>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      }
    >
      <div>
        <Button onClick={() => setIsFilterOpen((prev) => !prev)}>
          {isFilterOpen
            ? lang === LangKey.EN
              ? 'Close'
              : 'Закрыть'
            : lang === LangKey.EN
            ? 'Highlight'
            : 'Подсветка'}
        </Button>
      </div>
    </Popover>
  );
};

export default HighliteByPriority;
