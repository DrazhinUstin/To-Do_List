import { React, useState } from 'react';
import { FaPlus, FaEdit } from 'react-icons/fa';
import ShortUniqueId from 'short-unique-id';
import List from './List';

const App = () => {
    const [list, setList] = useState([]);
    const [text, setText] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [editID, setEditID] = useState(null);

    const handlerSubmit = (event) => {
        event.preventDefault();
        if (!text) return;
        if (isEdit) {
            const editItem = list.find((item) => item.id === editID);
            editItem.text = text;
            setList(list);
            cancelEdit();
        } else {
            const id = new ShortUniqueId({ length: 16 })();
            const newItem = { id, text };
            setList([...list, newItem]);
        }
        setText('');
    };

    const removeItem = (id) => {
        const newList = list.filter((item) => item.id !== id);
        setList(newList);
        if (isEdit) cancelEdit();
    };

    const clearList = () => {
        setList([]);
        if (isEdit) cancelEdit();
    };

    const editItem = (id, text) => {
        setText(text);
        setIsEdit(true);
        setEditID(id);
    };

    const cancelEdit = () => {
        setIsEdit(false);
        setEditID(null);
        setText('');
    };

    return (
        <div className='wrapper'>
            <h1 className='title'>to-do list</h1>
            <form className='form' onSubmit={handlerSubmit}>
                <input
                    type='text'
                    placeholder='Please, add something...'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button type='submit'>{isEdit ? <FaEdit /> : <FaPlus />}</button>
            </form>
            {list.length ? (
                <>
                    <List list={list} removeItem={removeItem} editItem={editItem} editID={editID} />
                    <button className='clear-all-btn' onClick={clearList}>
                        clear all
                    </button>
                </>
            ) : (
                <div className='empty-list'>You have no to-does...</div>
            )}
        </div>
    );
};

export default App;
