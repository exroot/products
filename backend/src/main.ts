import { App } from "./app";
import { AuthServer } from "./authServer";

async function main() {
    const app = new App();
    const authServer = new AuthServer();
    app.listen();
    authServer.listen();
}

main();
