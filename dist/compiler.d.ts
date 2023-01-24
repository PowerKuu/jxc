export declare function compile(root: JSX.Element): string;
export declare function construct(options: Compiler.ConstructionOptions): void;
export declare function factory<Tag extends keyof JSX.IntrinsicElements>(tag: Tag | Function, attributes: JSX.Attributes | null, ...children: JSX.Children[]): JSX.Element;
export declare function appendStyleBundel(style: string): void;
export declare function appendScriptBundel(script: string, semicolon?: boolean): void;
export declare function appendClientElement(target: HTMLElement, element: JSX.Element): void;
//# sourceMappingURL=compiler.d.ts.map