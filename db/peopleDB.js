import conn from "./connection.js";

export const insert = (person) => conn.execute(
    `INSERT INTO people
    (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)`,
    [person.firstName, person.lastName, person.email, person.phone],
    );

export const getAllPeople = () => conn.execute(`SELECT * FROM people`);

export const getPeopleById = (id) => conn.execute('SELECT * FROM people WHERE id = ?', [id]);

export const update = (newInfo, id) => conn.execute(
    `UPDATE people
        SET first_name = ?, last_name = ?, email = ?, phone = ?
        WHERE id = ?`,
        [newInfo.firstName, newInfo.lastName, newInfo.email, newInfo.phone, id],
);


export const remove = (id) => conn.execute('DELETE FROM people WHERE id = ?', [id]);

