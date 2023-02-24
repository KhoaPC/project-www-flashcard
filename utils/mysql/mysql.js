import pool from './pool';

export async function getAllTopic() {
    const query = `select * from topic;`;
    const [data] = await pool().execute(query);

    if (!data)
        return false;

    return data;
} // getAllTopic

export async function createFlashcard(topic_id, term, description, date) {
    const query = `insert into flashcard (topic_id, term, descrption, creation_time) values( ?, ?, ?, ?);`;
    const values = [topic_id, term, description, date];
    const [data] = await pool().execute(query, values);

    if (data?.affectedRows !== 1)
        return {
            success: false,
            message: "Error occured."
        };

    return {
        success: true,
        message: 'Tạo flashcard thành công'
    };
} // createFlashcard

export async function removeFlashcard(id) {
    const query = `delete from flashcard where id = ?;`;
    const [data] = await pool().execute(query, [id]);

    if (data?.affectedRows !== 1)
        return {
            success: false,
            message: "Error occured."
        };

    return {
        success: true,
        message: 'Xóa flashcard thành công'
    };
} // getAllFlashcard


export async function updateFlashcard(id, field, value) {
    const query = `update flashcard set ${field} = ? where id = ${id};`;
    const [data] = await pool().execute(query, [value]);

    if (data?.affectedRows !== 1)
        return {
            success: false,
            message: "Error occured."
        };

    return {
        success: true,
        message: 'Chỉnh sửa flashcard thành công'
    };
} // getAllFlashcard

export async function getAndSortFlashcard(field, orderBy) {
    const query = `select * from flashcard order by ${field} ${orderBy}`;
    const [data] = await pool().execute(query);
    
    if (!data)
        return false;

    return data;
} // getAndSortFlashcard