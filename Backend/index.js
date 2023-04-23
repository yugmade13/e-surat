import express from "express";
import session from "express-session";
import fileUpload from "express-fileupload";
import Database from "./config/Database.js";
import cors from "cors";
import SequelizeStore from "connect-session-sequelize";
import RoutesUser from "./routes/UserRoutes.js";
import RoutesProfiles from "./routes/UserProfileRoutes.js";
import RoutesRequestToEveryone from "./routes/RequestToEveryoneRoutes.js";
import RoutesLetter from "./routes/LetterRoutes.js";
import RoutesLetterRequest from "./routes/LetterRequestRoutes.js";
import RoutesLetterOrder from "./routes/LetterOrderRoutes.js";
import RoutesAuth from "./routes/AuthRoutes.js";
import RoutesCounter from "./routes/CounterRoutes.js";
import dotenv from "dotenv";
dotenv.config();

// try {
//     await Database.sync();
//     console.log("Database Berhasil dibuat");
// } catch (error) {
//     console.log(error);
// }

const App = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: Database,
});


App.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: "auto",
        maxAge: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours})
    },
}));

App.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));
App.use(express.json());
App.use(fileUpload());
App.use(express.static("public"));

// Routes
App.use(RoutesUser);
App.use(RoutesProfiles);
App.use(RoutesRequestToEveryone);
App.use(RoutesLetter);
App.use(RoutesLetterRequest);
App.use(RoutesLetterOrder);
App.use(RoutesAuth);
App.use(RoutesCounter);

// store.sync();

const port = process.env.PORT || 5000
App.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})