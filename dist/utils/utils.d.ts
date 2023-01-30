export declare function trailingSemicolon(target: string, semicolon: boolean): string;
export declare function minifyJavascript(str: string, semicolon: boolean): string;
export declare function minifyCss(str: string): string;
export declare function stringifyValue(value: any): string;
export declare function tryCatch<T extends (...args: any) => any>(func: T): ReturnType<T>;
export declare function getNames(meta: any): {
    __dirname: string;
    __filename: string;
};
export declare function addExtension(path: string, extension: string): string;
//# sourceMappingURL=utils.d.ts.map