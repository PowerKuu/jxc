import { resolve } from "path";
import { argv, cwd } from "process";
import { build } from "../builder.js";
import { watch } from "chokidar";
const timeoutDuration = 2000;
export default () => {
    const input = resolve(cwd(), argv[3] ?? "./routes");
    const output = resolve(cwd(), argv[4] ?? "./dist");
    console.log(`Starting dev input: ${input}, output: ${output}.`);
    var timeout = null;
    function startBuild() {
        if (timeout)
            clearTimeout(timeout);
        timeout = setTimeout(() => {
            const date = new Date();
            const formatedDate = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
            console.log(`${formatedDate} - New live server reload.`);
            build(input, output);
        }, timeoutDuration);
    }
    const watcher = watch(input, { persistent: true, awaitWriteFinish: true });
    startBuild();
    watcher.on("change", () => startBuild());
    watcher.on("add", () => startBuild());
    watcher.on("unlink", () => startBuild());
    watcher.on("error", (err) => console.error(err));
    console.log(`Edit ${input} for live updates.`);
};
