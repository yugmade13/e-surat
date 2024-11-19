import {Sequelize} from "sequelize";

const Database = new Sequelize("desa_kadilangu", "root", "", {
   host: "localhost",
   dialect: "mysql",
   define: {
      underscored: true
   },
   timezone: "Asia/Jakarta"
});

export default Database;