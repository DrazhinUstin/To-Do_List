import { React, useState, useEffect, useRef } from 'react';
import { FaPlus, FaEdit, FaGithub } from 'react-icons/fa';
import ShortUniqueId from 'short-unique-id';
import Time from './components/Time';
import List from './components/List';
import { getStorageItem, setStorageItem } from './storage';

const App = () => {
    const [list, setList] = useState(getStorageItem('list'));
    const [text, setText] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [editID, setEditID] = useState(null);
    const inputDOM = useRef(null);

    useEffect(() => setStorageItem('list', list), [list]);

    const handlerSubmit = (event) => {
        event.preventDefault();
        if (!text) {
            inputDOM.current.focus();
            return;
        }
        if (isEdit) {
            const editItem = list.find((item) => item.id === editID);
            editItem.text = text;
            setList([...list]);
            cancelEdit();
        } else {
            const id = new ShortUniqueId({ length: 16 })();
            const newItem = { id, text };
            setList([...list, newItem]);
            setText('');
        }
    };

    const clearList = () => {
        setList([]);
        if (isEdit) cancelEdit();
    };

    const removeItem = (id) => {
        const newList = list.filter((item) => item.id !== id);
        setList(newList);
        if (isEdit) cancelEdit();
    };

    const editItem = (id, text) => {
        setText(text);
        setIsEdit(true);
        setEditID(id);
        inputDOM.current.focus();
    };

    const cancelEdit = () => {
        setIsEdit(false);
        setEditID(null);
        setText('');
    };

    return (
        <>
            <div className='wrapper'>
                <header>
                    <Time />
                    <span className='amount'>{list.length}</span>
                </header>
                <h1>to-do list</h1>
                <form className='form' onSubmit={handlerSubmit}>
                    <input
                        type='text'
                        placeholder='Please, add something...'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        ref={inputDOM}
                    />
                    <button type='submit'>{isEdit ? <FaEdit /> : <FaPlus />}</button>
                </form>
                <List
                    list={list}
                    clearList={clearList}
                    removeItem={removeItem}
                    editItem={editItem}
                    editID={editID}
                />
            </div>
            <a
                href='https://github.com/DrazhinUstin/To-Do_List'
                target='_blank'
                rel='noopener noreferrer'
                className='github-link'
            >
                <FaGithub className='icon' /> Watch on github
            </a>
        </>
    );
};

export default App;
