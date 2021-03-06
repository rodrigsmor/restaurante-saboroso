var connect = require("./db");

module.exports = {
    getMenus(req) {
        let menus = [
            {
                text: 'Tela Inicial',
                href: '/admin/',
                icon: 'home',
                active: false
            },
            {
                text: 'Menu',
                href: '/admin/menus',
                icon: 'cutlery',
                active: false
            },
            {
                text: 'Reservas',
                href: '/admin/reservations',
                icon: 'calendar-check-o',
                active: false
            },
            {
                text: 'Contatos',
                href: '/admin/contacts',
                icon: 'comments',
                active: false
            },
            {
                text: 'Usuários',
                href: '/admin/users',
                icon: 'users',
                active: false
            },
            {
                text: 'E-mail',
                href: '/admin/emails',
                icon: 'envelope',
                active: false
            }
        ];

        menus.map(menu => {
            if(menu.href === `/admin${req.url}`)
                menu.active = true;
        })

        return menus;
    }, 
    getParams(req, params) {
        return Object.assign({}, {
            menus: req.menus,
            user: req.session.user
        }, params);
    },
    dashboard(req){
        return new Promise((resolve, reject) => {
            connect.query(`
                SELECT
                    (SELECT COUNT(*) FROM tb_contacts) AS nrcontacts,
                    (SELECT COUNT(*) FROM tb_menus) AS nrmenus,
                    (SELECT COUNT(*) FROM tb_reservations) AS nrreservations,
                    (SELECT COUNT(*) FROM tb_users) AS nrusers;
            `, (err, result) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(result[0]);
                }
            });
        });
    }
}