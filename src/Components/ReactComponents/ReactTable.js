import React from 'react';

export default function ReactTable(props) {
  const Tabledata = props.datalist;
  console.log(Tabledata, 'datatable');
  const Border = { border: '2px solid black' };

  return (
    <div className="tablediv">
      {Tabledata && Tabledata.length > 0 ? (
        <table>
          <thead>
            <th style={Border}> Issues </th>
            <th style={Border}> Solution </th>
            <th style={Border}> DeleteItem </th>
            <th style={Border}> EditItem </th>
          </thead>
          <tbody>
            {Tabledata.map((item, index) => {
              return (
                <tr keys={index}>
                  <td style={Border}> {item.Issue} </td>
                  <td style={Border}> {item.Solution} </td>
                  <td style={Border}>
                    {' '}
                    <button onClick={() => props.delete(item.id)}>
                      Delete{' '}
                    </button>{' '}
                  </td>
                  <td style={Border}>
                    <button onClick={() => props.edit(item.id)}> Edit </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h4> No Matches ... </h4>
      )}
    </div>
  );
}
