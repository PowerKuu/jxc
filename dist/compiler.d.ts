export declare function compile(element: JSX.Element): string;
export declare function construct(options: Compiler.ConstructionOptions): void;
export declare function factory<Tag extends keyof JSX.IntrinsicElements>(tag: Tag | Function, attributes: JSX.Attributes | null, ...children: JSX.Children[]): JSX.Element;
export declare function appendStyleBundel(style: string): void;
export declare function appendScriptBundel(script: string, semicolon?: boolean): void;
export declare function useClient(values: {
    [key: string]: unknown;
}): void;
export declare function id(id: string): HTMLElement;
//# sourceMappingURL=compiler.d.ts.map