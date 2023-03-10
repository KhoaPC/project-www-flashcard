import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/Collection.module.scss'

function Collection(props) {
    const { id, selected, showModal, setShowModal, setShowMenu, result, setResult } = props;
    const [showCreate, setShowCreate] = useState(false);
    const [value, setValue] = useState('');
    const [notification, setNotification] = useState('');
    const [checkedState, setCheckedState] = useState([]);
    const [result2, setResult2] = useState([]);
    const [collectionId, setCollection_id] = useState(0);

    useEffect(() => {
        const handler = async () => {
            if (checkedState.length > 1) {
                console.log('Successfully added to the collection');
                axios.patch(
                    'api/collection/collection',
                    {
                        id,
                        collection_id: collectionId
                    },
                    {
                        "Content-Type": "application/json",
                    }
                )
            }
        }
        handler();
    }, [collectionId])

    useEffect(() => {
        setResult2(result.filter(item => item.collection_id !== -1));
    }, [result])

    useEffect(() => {
        const data = new Array(result2.length).fill(false);
        data.unshift(false);
        setCheckedState(data);
    }, [result2])


    const handleOnChangeCheckbox = async (e, i, collection_id) => {
        const updatedCheckedState = checkedState.map((item, index) => index === i ? !item : item);
        setCheckedState(updatedCheckedState);

        if (e.target.checked)
            setCollection_id(collection_id);
        else {
            const deleted = await axios.delete(`api/collection/collection?f_id=${id}&c_id=${collection_id}`)
            // console.log(deleted.data.message);
            console.log('Deleted');
        }

    } // handleOnChangeCheckbox

    const addCollectionHandler = async () => {
        if (value) {
            await axios.post(
                "/api/collection/collection",
                {
                    filed: 'collection',
                    value
                },
                {
                    "Content-Type": "application/json",
                }
            );

            const data = await axios.get(`/api/collection/list-collection`);
            setResult(data.data);

            setNotification('')
        } else setNotification('Please enter collection name');
        setValue('');
    } // addCollectionHandler

    const closeModalHandler = () => {
        setShowCreate(false);
        setShowModal(false);
        setShowMenu(false);
    } // closeModalHandler

    return (
        <>
            {showModal ?
                <div onClick={(e) => e.stopPropagation()} className={styles.overlay}>
                    <div className={styles.modal}>
                        <div className={styles.header}>
                            <h3>L??u v??o...</h3>
                            <span onClick={() => closeModalHandler()}>x</span>
                        </div>
                        <div className={styles['collection-list']}>
                            <div className={styles['input-container']}>
                                <input
                                    id={-1}
                                    type="checkbox"
                                    onChange={(e) => {
                                        handleOnChangeCheckbox(e, 0, -1)
                                    }}
                                />
                                <label>Kh??c</label>
                            </div>
                            {result2.map((item, index) => {
                                return (
                                    <div key={item.collection_id} className={styles['input-container']}>
                                        <input
                                            id={item.collection_id}
                                            type="checkbox"
                                            defaultChecked={selected.findIndex(entry => entry.collection_id === item.collection_id) > -1}
                                            onChange={(e) => {
                                                handleOnChangeCheckbox(e, index + 1, item.collection_id)
                                            }} />
                                        <label>{item.collection}</label>
                                    </div>
                                )
                            })}
                        </div>

                        {showCreate ?
                            <>
                                <div className={styles['add-collection']}>
                                    <div>
                                        <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter collection name" />
                                        <span>{notification}</span>
                                    </div>
                                </div>
                                <div className={styles.footer}>
                                    <button onClick={() => {
                                        addCollectionHandler();
                                    }}>Create</button>
                                </div>
                            </>
                            :
                            <div onClick={() => {
                                setShowCreate(true);
                            }} className={styles.create}>
                                <span>???</span>
                                Create new collection
                            </div>
                        }
                    </div>
                </div>
                : ''}

        </>

    );
}

export default Collection;