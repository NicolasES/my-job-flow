import 'reflect-metadata';
import Application from "./Application";
import registerRoutes from "./routes";

const app = new Application()

registerRoutes(app)

const port = Number(process.env.PORT) || 3333;
app.start(port);

