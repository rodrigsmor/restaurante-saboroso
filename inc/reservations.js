var conn = require('./db');
var Pagination = require('../inc/Pagination');

module.exports = {
    render(req, res, error, success) {
        res.render('reservations',  {
            title: 'Reservas - Restaurante Saboroso',
            background: 'images/img_bg_2.jpg',
            heading: 'Reserve uma Mesa!',
            body: req.body,
            error, 
            success
        });
    },
    save(fields) {
        return new Promise((resolve, reject) => {
            if(fields.date.indexOf('/') > -1) {
                let date = fields.date.split('/');
                fields.date = `${date[2]}-${date[1]}-${date[0]}`;
            }

            let query, params = [
                fields.name,
                fields.email,
                fields.people,
                fields.date,
                fields.time
            ];

            if(parseInt(fields.id) > 0) {
                query = `
                    UPDATE tb_reservations
                    SET 
                        name = ?,
                        email = ?,
                        people = ?,
                        date = ?,
                        time = ?
                    WHERE id = ?
                `;

                params.push(fields.id);
            } else {
                query = `
                    INSERT INTO tb_reservations (name, email, people, date, time)
                    VALUES(?, ?, ?, ?, ?)
                `;
            }

            conn.query(query, params, (error, results) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        })
    },
    getReservations(req) {
        return new Promise((resolve, reject) => {
            let page = req.query.page;
            let start = req.query.start;
            let end = req.query.end;

            if(!page) page = 1;
    
            let params = [];
    
            if(start && end) params.push(start, end)
    
            let pagination = new Pagination(`
                    SELECT SQL_CALC_FOUND_ROWS
                    * FROM tb_reservations
                    ${(start && end) ? 'WHERE date BETWEEN ? AND ?' : '' } 
                    ORDER BY name LIMIT ?, ?
                `, params
            );
    
            pagination.getPage(page).then(data => {
                resolve({
                    data,
                    links: pagination.getNavigations(req.query),
                })
            });
        })
    },
    delete(id) {
        return new Promise((resolve, reject) => {
            conn.query(`
                DELETE FROM tb_reservations WHERE id = ?
            `, [
                id
            ], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
    }
}