# JXC

A javascript "framwork" to compile tsx and jsx files to static index.html files on the server. It uses Babel and a custom compiler.

## Setup proccess:

-   Create a new empty folder
```sh
mkdir x
cd x
```

- Install JXC 
```sh
npm install @klevn/jxc
```

-   Create a tsconfig file
```json
{
    "compilerOptions": {
        "jsx": "preserve",
        "types": ["@klevn/jxc/src/types/jsx"]
    }
}
```

- Create a routes folder
```sh
mkdir routes
cd routes
```

- Create a home routes
```sh
mkdir home
cd home
```

- Create a ```index.tsx``` file
```tsx
export default () => {
    return <html lang="en">
        <head>
            <title>Document</title>
            <script>
                {
                    () => {
                        console.log("this is client side")
                    }
                }
            </script>
        </head>
        <body>
            <p>Hello world</p>
        </body>
    </html>
}
```

- Build to static assets in the project root
```sh
cd ../..
npx @klevn/jxc build
```

## U can store static assets in the "public" route:
- css
- img
- svg
- ...etc