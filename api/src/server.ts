import 'reflect-metadata';
import Application from "./Application";
import registerRoutes from "./routes";

const app = new Application()

registerRoutes(app)

app.start(3333)

