import { App } from "./app";

async function main(){
    const app = new App(8080);
    await app.listen();
}main().then().catch();