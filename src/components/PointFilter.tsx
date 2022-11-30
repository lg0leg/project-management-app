import { FC } from 'react';

interface IPointFilter {
  priority: string[];
  checkedState: boolean[];
  handleOnChange: (position: number) => void;
}
export const PointFilter: FC<IPointFilter> = ({ priority, checkedState, handleOnChange }) => {
  return (
    <div className="z-10 w-48 rounded border-2 border-gray-50 bg-white shadow-md">
      <ul className="space-y-1 p-3 text-sm text-gray-700" aria-labelledby="dropdownBgHoverButton">
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
        {/* <li>
              <div className="flex items-center rounded p-2 hover:bg-gray-100">
                <input
                  id="checkbox-item-1"
                  type="checkbox"
                  value=""
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600"
                />
                <label
                  htmlFor="checkbox-item-1"
                  className="ml-2 w-full rounded text-sm font-medium text-gray-900"
                >
                  Default checkbox
                </label>
              </div>
            </li>
            <li>
              <div className="flex items-center rounded p-2 hover:bg-gray-100">
                <input
                  checked
                  id="checkbox-item-2"
                  type="checkbox"
                  value=""
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600"
                />
                <label
                  htmlFor="checkbox-item-2"
                  className="ml-2 w-full rounded text-sm font-medium text-gray-900"
                >
                  Checked state
                </label>
              </div>
            </li>
            <li>
              <div className="flex items-center rounded p-2 hover:bg-gray-100">
                <input
                  id="checkbox-item-3"
                  type="checkbox"
                  value=""
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600"
                />
                <label
                  htmlFor="checkbox-item-3"
                  className="ml-2 w-full rounded text-sm font-medium text-gray-900"
                >
                  Default checkbox
                </label>
              </div>
            </li>
            <li>
              <div className="flex items-center rounded p-2 hover:bg-gray-100">
                <input
                  id="checkbox-item-4"
                  type="checkbox"
                  value=""
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600"
                />
                <label
                  htmlFor="checkbox-item-4"
                  className="ml-2 w-full rounded text-sm font-medium text-gray-900"
                >
                  Default checkbox
                </label>
              </div>
            </li>
            <li>
              <div className="flex items-center rounded p-2 hover:bg-gray-100">
                <input
                  id="checkbox-item-5"
                  type="checkbox"
                  value=""
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600"
                />
                <label
                  htmlFor="checkbox-item-5"
                  className="ml-2 w-full rounded text-sm font-medium text-gray-900"
                >
                  Default checkbox
                </label>
              </div>
            </li> */}
      </ul>
    </div>
  );
};

export default PointFilter;
