import { factory, build } from "./compiler"

export function testApp() {
    return <html>
        <head>
            <script>
                {() => console.log("test")}
            </script>
        </head>

        <body>
            <h1 onclick={(s) => {console.log(s)}}>asaasa</h1>
            <p>dette er en test du tror du aser kul</p>
        </body>
    </html>
}


build({
    "paths": {
        "home": testApp()
    },

    "outDir": "dist"
})