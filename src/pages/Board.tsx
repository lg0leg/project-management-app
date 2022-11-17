import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Column } from 'components/Column';
import { IBoard, IColumn, ITask, IUser } from 'models/dbTypes';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';

export const usersListmocks: IUser[] = [
  {
    _id: '81D49233-C159-3FC5-25B9-8902157B1111',
    name: 'User1',
    login: 'User1',
  },
  {
    _id: '81D49233-C159-3FC5-25B9-8902157B2222',
    name: 'User2',
    login: 'User2',
  },
];

const columnListMocks: IColumn[] = [
  {
    _id: 'AF3FEC0A-43AD-8C7B-F546-74EA8EC14EEB',
    title: 'In Mi Corporation',
    order: 0,
    boardId: '45D324B3-89E6-DEDD-F544-EC98149BD313',
  },
  {
    _id: 'B2C8C6E7-59BA-1C3D-D63C-2B22AD8CB98D',
    title: 'Ornare In Inc.',
    order: 1,
    boardId: '45D324B3-89E6-DEDD-F544-EC98149BD313',
  },
  {
    _id: '09E0E3AA-DBE8-9F35-2B50-B9E727DD7FB4',
    title: 'Sit Amet Incorporated',
    order: 2,
    boardId: '45D324B3-89E6-DEDD-F544-EC98149BD313',
  },
  {
    _id: 'B3A16794-64AC-3452-A7D9-5B235A124241',
    title: 'Donec Corp.',
    order: 3,
    boardId: '45D324B3-89E6-DEDD-F544-EC98149BD313',
  },
  {
    _id: '79798712-9C1B-20B3-22A1-BAF66D929977',
    title: 'Aliquet Phasellus Inc.',
    order: 4,
    boardId: '45D324B3-89E6-DEDD-F544-EC98149BD313',
  },
  {
    _id: 'E5B5C5EB-4A85-3DAB-913F-08EC974EA480',
    title: 'Class Consulting',
    order: 5,
    boardId: '45D324B3-89E6-DEDD-F544-EC98149BD313',
  },
];

export const tasksListMocks: ITask[] = [
  {
    _id: 'E6D624FD-0159-0C1E-AC4A-4A54438634CB',
    title: 'In Dolor Associates',
    order: 0,
    boardId: '45D324B3-89E6-DEDD-F544-EC98149BD313',
    columnId: 'AF3FEC0A-43AD-8C7B-F546-74EA8EC14EEB',
    description: 'mi lacinia mattis. Integer eu lacus. Quisque imperdiet, erat nonummy',
    userId: 'CEA7DCDB-8EFF-FE5E-5F31-C5EC7EDA3583',
    users: ['8A0A7BD2-3183-25CF-38A7-63ADEC2D4C24'],
  },
  {
    _id: 'B0A7E3C3-EACD-5DF6-D79E-740AB7493DAD',
    title: 'Sed Turpis Consulting',
    order: 1,
    boardId: '45D324B3-89E6-DEDD-F544-EC98149BD313',
    columnId: 'AF3FEC0A-43AD-8C7B-F546-74EA8EC14EEB',
    description: 'tempus non, lacinia at, iaculis quis, pede. Praesent eu dui.',
    userId: '3E2D817D-1FF5-1D15-FE8C-2C8AE4F08D26',
    users: ['8A0A7BD2-3183-25CF-38A7-63ADEC2D4C24'],
  },
  {
    _id: 'CE69F7E1-6456-965B-15B5-1433D478E4BA',
    title: 'Ultrices Incorporated',
    order: 0,
    boardId: '45D324B3-89E6-DEDD-F544-EC98149BD313',
    columnId: 'B2C8C6E7-59BA-1C3D-D63C-2B22AD8CB98D',
    description: 'Phasellus vitae mauris sit amet lorem semper auctor. Mauris vel',
    userId: 'CF2915CD-E7A1-671B-CDC3-1E811B688EDD',
    users: ['8A0A7BD2-3183-25CF-38A7-63ADEC2D4C24'],
  },
  {
    _id: '907AB4F4-2FE6-B075-0396-8B6455E54223',
    title: 'Nulla Facilisis Incorporated',
    order: 1,
    boardId: '45D324B3-89E6-DEDD-F544-EC98149BD313',
    columnId: 'B2C8C6E7-59BA-1C3D-D63C-2B22AD8CB98D',
    description: 'metus. In nec orci. Donec nibh. Quisque nonummy ipsum non',
    userId: '58B1680F-F1BD-B491-A2A9-AF4543BA88DA',
    users: ['8A0A7BD2-3183-25CF-38A7-63ADEC2D4C24'],
  },
  {
    _id: 'B69847DD-735E-86AD-11E7-88F051D37DDD',
    title: 'Aliquam Adipiscing Company',
    order: 2,
    boardId: '45D324B3-89E6-DEDD-F544-EC98149BD313',
    columnId: 'B2C8C6E7-59BA-1C3D-D63C-2B22AD8CB98D',
    description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames',
    userId: 'A5D9717C-1791-83FF-CA2A-7771AA3BC960',
    users: ['8A0A7BD2-3183-25CF-38A7-63ADEC2D4C24'],
  },
  {
    _id: '25B8E3D4-A7A5-4DEC-79EE-6D3B2A341564',
    title: 'Venenatis Incorporated',
    order: 0,
    boardId: '45D324B3-89E6-DEDD-F544-EC98149BD313',
    columnId: '09E0E3AA-DBE8-9F35-2B50-B9E727DD7FB4',
    description: 'lobortis, nisi nibh lacinia orci, consectetuer euismod est arcu ac',
    userId: '8A0A7BD2-3183-25CF-38A7-63ADEC2D4C24',
    users: ['8A0A7BD2-3183-25CF-38A7-63ADEC2D4C24'],
  },
];

export const boardsListMocks: IBoard[] = [
  {
    _id: '45D324B3-89E6-DEDD-F544-EC98149BD313',
    title: 'Anastasia Gibbs',
    owner: '81D49233-C159-3FC5-25B9-8902157B1111',
    users: ['81D49233-C159-3FC5-25B9-8902157B1111', '81D49233-C159-3FC5-25B9-8902157B2222'],
  },
];

export const Board: FC = () => {
  const { id } = useParams();
  const [board, setBoard] = useState(boardsListMocks);
  const [columns, setColumns] = useState(columnListMocks);
  const [tasks, setTasks] = useState(tasksListMocks);

  const onDragEnd = (dropResult: DropResult) => {
    const { source, destination, type, draggableId } = dropResult;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (type === 'TASK') {
      const newtasks: ITask[] = tasks.map((task) => {
        if (task._id !== draggableId) {
          if (source.droppableId === destination.droppableId) {
            if (
              source.index > destination.index &&
              task.order >= destination.index &&
              task.order <= source.index
            )
              return { ...task, order: task.order + 1 };
            if (
              source.index < destination.index &&
              task.order <= destination.index &&
              task.order >= source.index
            )
              return { ...task, order: task.order - 1 };
          }
          if (task.columnId === destination!.droppableId && task.order >= destination!.index)
            return { ...task, order: task.order + 1 };
          if (task.columnId === source!.droppableId && task.order > source!.index)
            return { ...task, order: task.order - 1 };
          return task;
        } else {
          return { ...task, columnId: destination!.droppableId, order: destination!.index };
        }
      });
      setTasks(newtasks);
    }
    if (type === 'COLUMN') {
      const draggedColumnId = draggableId.split('.')[1];
      if (source.droppableId === destination.droppableId) {
        const newColumns: IColumn[] = columns.map((column) => {
          if (column._id !== draggedColumnId) {
            if (
              source.index > destination.index &&
              column.order >= destination.index &&
              column.order <= source.index
            )
              return { ...column, order: column.order + 1 };
            if (
              source.index < destination.index &&
              column.order <= destination.index &&
              column.order >= source.index
            )
              return { ...column, order: column.order - 1 };
            return { ...column };
          } else {
            return { ...column, order: destination!.index };
          }
        });
        setColumns(newColumns);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex max-h-[calc(100vh-100px-80px)] flex-col items-center justify-center bg-gray-50">
        <h1 className="max-h-[70px] w-full px-5 pt-4 text-3xl font-semibold text-gray-900">
          {board[0].title}
        </h1>
        <Droppable droppableId={'board.' + id} type={'COLUMN'} direction={'horizontal'}>
          {(provided) => (
            <div
              className="scrollbar flex h-full w-full space-x-4 overflow-x-auto overflow-y-hidden p-4 text-gray-700"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {columns
                .sort((col1, col2) => col1.order - col2.order)
                .map((column, index) => {
                  return (
                    <Column
                      key={column._id}
                      index={index}
                      column={column}
                      tasks={tasks.filter((task) => task.columnId === column._id)}
                    />
                  );
                })}
              <div className="ml-4">{provided.placeholder}</div>
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default Board;
