import {Fragment, ReactNode} from 'react';

interface TableProps {
  tableHead: string[];
  children: ReactNode;
}

function Table({tableHead, children}: TableProps) {
  return (
    <Fragment>
      <table>
        <thead>
          <tr>
            <td>No</td>
            {tableHead.map((data) => {
              return (
                <Fragment>
                  <td>{data}</td>
                </Fragment>
              );
            })}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </Fragment>
  );
}

export default Table;

// interface TDataProps {
//   data: string[] | object[];
// }

// export const TData = ({data}: TDataProps) => {
//   return <Fragment>
//     {
//         data.map(() => {

//         })
//     }
//   </Fragment>;
// };
