var conn = require('./db');

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
            let date = fields.date.split('/');
            fields.date = `${date[2]}-${date[1]}-${date[0]}`;

            conn.query(`
                INSERT INTO tb_reservations (name, email, people, date, time)
                values(?, ?, ?, ?, ?) 
            `, [
                fields.name,
                fields.email, 
                fields.people,
                fields.date,
                fields.time
            ], (error, results) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        })
    }
}