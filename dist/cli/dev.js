import { resolve } from "path";
import { argv, cwd } from "process";
import * as branchy from "branchy";
import { watch } from "fs";
const timeoutDuration = 3500;
const buildWorker = branchy("../utils/build-worker.js");
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
            buildWorker(input, output);
        }, timeoutDuration);
    }
    const watcher = watch(input, { persistent: true, recursive: true });
    startBuild();
    watcher.on("change", () => startBuild());
    watcher.on("error", (err) => console.error(err));
    console.log(`Edit ${input} for live updates.`);
};
