let conn = require('./db');

module.exports = {
    getMenus() {
        return new Promise((resolver, reject) => {
            conn.query(`
                SELECT * FROM tb_menus ORDER BY title;
            `, (err, results) => {
                    if(err) {
                        reject(err);
                    }       

                resolver(results);
            });
        })
    }
}