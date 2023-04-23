import {Sequelize} from "sequelize";

const Database = new Sequelize("desa_kadilangu", "root", "[your password]", {
   host: "localhost",
   dialect: "mysql",
   define: {
      underscored: true
   },
   timezone: "Asia/Jakarta"
});

export default Database;