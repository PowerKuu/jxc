import { resolve } from "path";
import { argv, cwd } from "process";
import { transpileRoutes } from "../builder.js";
export default () => {
    const input = resolve(cwd(), argv[3] ?? "./routes");
    const output = resolve(cwd(), argv[4] ?? "./build");
    console.log(`Starting babel input: ${input}, output: ${output}.`);
    transpileRoutes(input, output, true);
};
