import React from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const List = ({ list, removeItem, editItem, editID }) => {
    return (
        <ul className='list'>
            {list.map((item) => {
                const { id, text } = item;
                return (
                    <li key={id} className={id === editID ? 'edit' : ''}>
                        <p>{text}</p>
                        <div className='btn-container'>
                            <button className='edit-btn' onClick={() => editItem(id, text)}>
                                <FaEdit className='icon' />
                            </button>
                            <button className='trash-btn' onClick={() => removeItem(id)}>
                                <FaTrashAlt className='icon' />
                            </button>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default List;
