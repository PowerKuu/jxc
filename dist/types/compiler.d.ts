declare namespace Compiler {
    interface ConstructionOptions {
        outDir: string,
        element: JSX.Element
    }    

    interface Bundel {
        script: string
        style: string
    }
}