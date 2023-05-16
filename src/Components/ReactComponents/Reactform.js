import React, { useState } from 'react';
import Rtable from './ReactTable';

export default function Reactform() {
  const [data, setData] = useState({
    name: '',
    problem: '',
    solution: '',
  });

  const [list, setList] = useState([]);
  const [editid, setEditId] = useState(null);
  const [togglebtn, setTogglebtn] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const { name, problem, solution } = data;

  const changehandler = (e) => {
    if (e.currentTarget.value.charAt(0) == ' ') {
      e.target.value = e.target.value.replace(/\s/g, '');
    }
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submithandler = (e) => {
    e.preventDefault();

    if (!data.name || !data.problem || !data.solution) {
      alert('please fill the fields ...  ');
    } else if (data && togglebtn) {
      setList(
        list.map((val) => {
          if (val.id === editid) {
            return {
              ...val,
              Name: data.name,
              Issue: data.problem,
              Solution: data.solution,
            };
          }
          return val;
        })
      );
      setTogglebtn(false);
      setEditId(null);
      setShowTable(true)
      setShowForm(false)
      setData({
        name: ' ',
        problem: ' ',
        solution: '',
      });
    } else {
      const newitem = {
        id: new Date().getTime().toString(),
        Name: data.name,
        Issue: data.problem,
        Solution: data.solution,
      };
      setList([...list, newitem]);
    }
    setShowForm(false);
    setShowTable(true);
    console.log(list, 'list');
    setData({
      name: ' ',
      problem: ' ',
      solution: '',
    });
  };

  const Deleteitem = (getid) => {
    console.log(getid, 'id');
    const delteditem = list.filter((item) => item.id !== getid);
    setList(delteditem);
  };

  const EditItem = (getid) => {
    console.log(getid, 'edit');
    let editeddata = list.find((item) => item.id == getid);

    setEditId(getid);
    setTogglebtn(true);
    setShowForm(true);
    setShowTable(false);
    setData({
      name: editeddata.Name,
      problem: editeddata.Issue,
      solution: editeddata.Solution,
    });
  };

  const OpenForm = () => {
    setShowForm(!showForm);
  };

  const Onsearch = (e) => {
    let searchstring = e.target.value;
    if (e.currentTarget.value.charAt(0) == ' ') {
      e.target.value = e.target.value.replace(/\s/g, '');
    }
    setSearchInput(searchstring);
  };

  const filterdata = list.filter((item) =>
    item.Issue.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      <div className="formopenbtn">
        <h4> React List </h4>
        <button onClick={OpenForm}>
          {' '}
          {showForm ? ' Close form' : ' Open form '}{' '}
        </button>
      </div>

      <div className="formdiv">
        {showForm && (
          <form novalidate>
            <div className="nameinput">
              <legend> Name : </legend>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="enter ypur name "
                onChange={changehandler}
              />
            </div>
            <div className="problemInput">
              <legend> Problem : </legend>
              <textarea
                name="problem"
                //  defaultValue={data.problem}
                value={problem}
                placeholder="enter your issue "
                rows={4}
                cols={40}
                onChange={changehandler}
              />
            </div>

            <div className="solutionInput">
              <legend> Solution : </legend>
              <textarea
                name="solution"
                //  defaultValue={data.solution}
                value={solution}
                placeholder="enter solution for issue "
                rows={4}
                cols={40}
                onChange={changehandler}
              />
            </div>
            <div>
              <button className="submitbtn" onClick={submithandler}>
                {' '}
                {togglebtn ? ' Update' : 'Submit '}{' '}
              </button>
            </div>
          </form>
        )}
      </div>
      <div>
        {showTable && list.length > 0   && (
          <div className="searchInput">
            <label> Search : </label>
            <input
              onput
              type="search"
              placeholder="enter the issue"
              onChange={Onsearch}
            />
            <Rtable datalist={filterdata} delete={Deleteitem} edit={EditItem} />
          </div>
        )}
      </div>
    </div>
  );
}
