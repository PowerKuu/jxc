export interface BuildOptions {
    outDir: string,

    paths: {
        [path:string]: Element<unknown>
    }
}






export type Child<T extends unknown> = (T|Element<Child<unknown>>)

export interface Element<T extends Child<unknown>> {
    tag: keyof Elements,
    attributes: Attributes
    children: T[]
    
    elementID: string,
}


export interface Elements {
    script: ((...args:any[]) => void)|string

    a: Child<string>,
    abbr: Child<string>
    address: Child<string>
    area: Child<string>
    article: Child<string>
    aside: Child<string>
    audio: Child<string>
    b: Child<string>
    base: Child<string>
    bdi: Child<string>
    bdo: Child<string>
    big: Child<string>
    blockquote: Child<string>
    body: Child<string>
    br: Child<string>
    button: Child<string>
    canvas: Child<string>
    caption: Child<string>
    cite: Child<string>
    code: Child<string>
    col: Child<string>
    colgroup: Child<string>
    data: Child<string>
    datalist: Child<string>
    dd: Child<string>
    del: Child<string>
    details: Child<string>
    dfn: Child<string>
    dialog: Child<string>
    div: Child<string>
    dl: Child<string>
    dt: Child<string>
    em: Child<string>
    embed: Child<string>
    fieldset: Child<string>
    figcaption: Child<string>
    figure: Child<string>
    footer: Child<string>
    form: Child<string>
    h1: Child<string>
    h2: Child<string>
    h3: Child<string>
    h4: Child<string>
    h5: Child<string>
    h6: Child<string>
    head: Child<string>
    header: Child<string>
    hgroup: Child<string>
    hr: Child<string>
    html: Child<string>
    i: Child<string>
    iframe: Child<string>
    img: Child<string>
    input: Child<string>
    ins: Child<string>
    kbd: Child<string>
    keygen: Child<string>
    label: Child<string>
    legend: Child<string>
    li: Child<string>
    link: Child<string>
    main: Child<string>
    map: Child<string>
    mark: Child<string>
    menu: Child<string>
    menuitem: Child<string>
    meta: Child<string>
    meter: Child<string>
    nav: Child<string>
    noindex: Child<string>
    noscript: Child<string>
    object: Child<string>
    ol: Child<string>
    optgroup: Child<string>
    option: Child<string>
    output: Child<string>
    p: Child<string>
    param: Child<string>
    picture: Child<string>
    pre: Child<string>
    progress: Child<string>
    q: Child<string>
    rp: Child<string>
    rt: Child<string>
    ruby: Child<string>
    s: Child<string>
    samp: Child<string>
    section: Child<string>
    select: Child<string>
    slot: Child<string>
    small: Child<string>
    source: Child<string>
    span: Child<string>
    strong: Child<string>
    style: Child<string>
    sub: Child<string>
    summary: Child<string>
    sup: Child<string>
    table: Child<string>
    tbody: Child<string>
    td: Child<string>
    textarea: Child<string>
    tfoot: Child<string>
    th: Child<string>
    thead: Child<string>
    time: Child<string>
    title: Child<string>
    tr: Child<string>
    track: Child<string>
    u: Child<string>
    ul: Child<string>
    var: Child<string>
    video: Child<string>
    wbr: Child<string>
    svg: Child<string>
    animate: Child<string>
    animateMotion: Child<string>
    animateTransform: Child<string>
    circle: Child<string>
    clipPath: Child<string>
    defs: Child<string>
    desc: Child<string>
    ellipse: Child<string>
    feBlend: Child<string>
    feColorMatrix: Child<string>
    feComponentTransfer: Child<string>
    feComposite: Child<string>
    feConvolveMatrix: Child<string>
    feDiffuseLighting: Child<string>
    feDisplacementMap: Child<string>
    feDistantLight: Child<string>
    feFlood: Child<string>
    feFuncA: Child<string>
    feFuncB: Child<string>
    feFuncG: Child<string>
    feFuncR: Child<string>
    feGaussianBlur: Child<string>
    feImage: Child<string>
    feMerge: Child<string>
    feMergeNode: Child<string>
    feMorphology: Child<string>
    feOffset: Child<string>
    fePointLight: Child<string>
    feSpecularLighting: Child<string>
    feSpotLight: Child<string>
    feTile: Child<string>
    feTurbulence: Child<string>
    filter: Child<string>
    foreignObject: Child<string>
    g: Child<string>
    image: Child<string>
    line: Child<string>
    linearGradient: Child<string>
    marker: Child<string>
    mask: Child<string>
    metadata: Child<string>
    path: Child<string>
    pattern: Child<string>
    polygon: Child<string>
    polyline: Child<string>
    radialGradient: Child<string>
    rect: Child<string>
    stop: Child<string>
    switch: Child<string>
    symbol: Child<string>
    text: Child<string>
    textPath: Child<string>
    tspan: Child<string>
    use: Child<string>
    view: Child<string>
}





export type EventHandler<T> = (element:Element<unknown>) => any

export interface Attributes {
    args?: unknown[]

    class?: string|string[]
    style?: string

    onCopy?: EventHandler<ClipboardEvent>
    onCut?: EventHandler<ClipboardEvent>
    onPaste?: EventHandler<ClipboardEvent>
    onCompositionEnd?: EventHandler<CompositionEvent>
    onCompositionStart?: EventHandler<CompositionEvent>
    onCompositionUpdate?: EventHandler<CompositionEvent>
    onFocus?: EventHandler<FocusEvent>
    onFocusOut?: EventHandler<FocusEvent>
    onFocusIn?: EventHandler<FocusEvent>
    onBlur?: EventHandler<FocusEvent>
    onChange?: EventHandler<Event>
    onInvalid?: EventHandler<Event>
    onInput?: EventHandler<InputEvent>
    onBeforeInput?: EventHandler<InputEvent>
    onReset?: EventHandler<Event>
    onSubmit?: EventHandler<Event & {submitter: HTMLElement}>
    onLoad?: EventHandler<Event>
    onError?: EventHandler<Event>
    onKeyDown?: EventHandler<KeyboardEvent>
    onKeyPress?: EventHandler<KeyboardEvent>
    onKeyUp?: EventHandler<KeyboardEvent>
    onGotPointerCapture?: EventHandler<PointerEvent>
    onLostPointerCapture?: EventHandler<PointerEvent>
    onPointerCancel?: EventHandler<PointerEvent>
    onPointerDown?: EventHandler<PointerEvent>
    onPointerEnter?: EventHandler<PointerEvent>
    onPointerLeave?: EventHandler<PointerEvent>
    onPointerMove?: EventHandler<PointerEvent>
    onPointerOver?: EventHandler<PointerEvent>
    onPointerOut?: EventHandler<PointerEvent>
    onPointerUp?: EventHandler<PointerEvent>
    onAbort?: EventHandler<Event>
    onCanPlay?: EventHandler<Event>
    onCanPlayThrough?: EventHandler<Event>
    onDurationChange?: EventHandler<Event>
    onEmptied?: EventHandler<Event>
    onEncrypted?: EventHandler<Event>
    onEnded?: EventHandler<Event>
    onLoadedData?: EventHandler<Event>
    onLoadedMetadata?: EventHandler<Event>
    onLoadStart?: EventHandler<Event>
    onPause?: EventHandler<Event>
    onPlay?: EventHandler<Event>
    onPlaying?: EventHandler<Event>
    onProgress?: EventHandler<Event>
    onRateChange?: EventHandler<Event>
    onSeeked?: EventHandler<Event>
    onSeeking?: EventHandler<Event>
    onStalled?: EventHandler<Event>
    onSuspend?: EventHandler<Event>
    onTimeUpdate?: EventHandler<Event>
    onVolumeChange?: EventHandler<Event>
    onWaiting?: EventHandler<Event>
    onClick?: EventHandler<MouseEvent>
    onAuxClick?: EventHandler<MouseEvent>
    onContextMenu?: EventHandler<MouseEvent>
    onDblClick?: EventHandler<MouseEvent>
    onDrag?: EventHandler<DragEvent>
    onDragEnd?: EventHandler<DragEvent>
    onDragEnter?: EventHandler<DragEvent>
    onDragExit?: EventHandler<DragEvent>
    onDragLeave?: EventHandler<DragEvent>
    onDragOver?: EventHandler<DragEvent>
    onDragStart?: EventHandler<DragEvent>
    onDrop?: EventHandler<DragEvent>
    onMouseDown?: EventHandler<MouseEvent>
    onMouseEnter?: EventHandler<MouseEvent>
    onMouseLeave?: EventHandler<MouseEvent>
    onMouseMove?: EventHandler<MouseEvent>
    onMouseOut?: EventHandler<MouseEvent>
    onMouseOver?: EventHandler<MouseEvent>
    onMouseUp?: EventHandler<MouseEvent>
    onSelect?: EventHandler<UIEvent>
    onTouchCancel?: EventHandler<TouchEvent>
    onTouchEnd?: EventHandler<TouchEvent>
    onTouchMove?: EventHandler<TouchEvent>
    onTouchStart?: EventHandler<TouchEvent>
    onScroll?: EventHandler<UIEvent>
    onWheel?: EventHandler<WheelEvent>
    onAnimationStart?: EventHandler<AnimationEvent>
    onAnimationEnd?: EventHandler<AnimationEvent>
    onAnimationIteration?: EventHandler<AnimationEvent>
    onTransitionEnd?: EventHandler<TransitionEvent>

    // lower case events
    oncopy?: EventHandler<ClipboardEvent>
    oncut?: EventHandler<ClipboardEvent>
    onpaste?: EventHandler<ClipboardEvent>
    oncompositionend?: EventHandler<CompositionEvent>
    oncompositionstart?: EventHandler<CompositionEvent>
    oncompositionupdate?: EventHandler<CompositionEvent>
    onfocus?: EventHandler<FocusEvent>
    onfocusout?: EventHandler<FocusEvent>
    onfocusin?: EventHandler<FocusEvent>
    onblur?: EventHandler<FocusEvent>
    onchange?: EventHandler<Event>
    oninvalid?: EventHandler<Event>
    oninput?: EventHandler<InputEvent>
    onbeforeinput?: EventHandler<InputEvent>
    onreset?: EventHandler<Event>
    onsubmit?: EventHandler<Event & { submitter: HTMLElement}>
    onload?: EventHandler<Event>
    onerror?: EventHandler<Event>
    onkeydown?: EventHandler<KeyboardEvent>
    onkeypress?: EventHandler<KeyboardEvent>
    onkeyup?: EventHandler<KeyboardEvent>
    ongotpointercapture?: EventHandler<PointerEvent>
    onlostpointercapture?: EventHandler<PointerEvent>
    onpointercancel?: EventHandler<PointerEvent>
    onpointerdown?: EventHandler<PointerEvent>
    onpointerenter?: EventHandler<PointerEvent>
    onpointerleave?: EventHandler<PointerEvent>
    onpointermove?: EventHandler<PointerEvent>
    onpointerover?: EventHandler<PointerEvent>
    onpointerout?: EventHandler<PointerEvent>
    onpointerup?: EventHandler<PointerEvent>
    onabort?: EventHandler<Event>
    oncanplay?: EventHandler<Event>
    oncanplaythrough?: EventHandler<Event>
    ondurationchange?: EventHandler<Event>
    onemptied?: EventHandler<Event>
    onencrypted?: EventHandler<Event>
    onended?: EventHandler<Event>
    onloadeddata?: EventHandler<Event>
    onloadedmetadata?: EventHandler<Event>
    onloadstart?: EventHandler<Event>
    onpause?: EventHandler<Event>
    onplay?: EventHandler<Event>
    onplaying?: EventHandler<Event>
    onprogress?: EventHandler<Event>
    onratechange?: EventHandler<Event>
    onseeked?: EventHandler<Event>
    onseeking?: EventHandler<Event>
    onstalled?: EventHandler<Event>
    onsuspend?: EventHandler<Event>
    ontimeupdate?: EventHandler<Event>
    onvolumechange?: EventHandler<Event>
    onwaiting?: EventHandler<Event>
    onclick?: EventHandler<MouseEvent>
    onauxclick?: EventHandler<MouseEvent>
    oncontextmenu?: EventHandler<MouseEvent>
    ondblclick?: EventHandler<MouseEvent>
    ondrag?: EventHandler<DragEvent>
    ondragend?: EventHandler<DragEvent>
    ondragenter?: EventHandler<DragEvent>
    ondragexit?: EventHandler<DragEvent>
    ondragleave?: EventHandler<DragEvent>
    ondragover?: EventHandler<DragEvent>
    ondragstart?: EventHandler<DragEvent>
    ondrop?: EventHandler<DragEvent>
    onmousedown?: EventHandler<MouseEvent>
    onmouseenter?: EventHandler<MouseEvent>
    onmouseleave?: EventHandler<MouseEvent>
    onmousemove?: EventHandler<MouseEvent>
    onmouseout?: EventHandler<MouseEvent>
    onmouseover?: EventHandler<MouseEvent>
    onmouseup?: EventHandler<MouseEvent>
    onselect?: EventHandler<UIEvent>
    ontouchcancel?: EventHandler<TouchEvent>
    ontouchend?: EventHandler<TouchEvent>
    ontouchmove?: EventHandler<TouchEvent>
    ontouchstart?: EventHandler<TouchEvent>
    onscroll?: EventHandler<UIEvent>
    onwheel?: EventHandler<WheelEvent>
    onanimationstart?: EventHandler<AnimationEvent>
    onanimationend?: EventHandler<AnimationEvent>
    onanimationiteration?: EventHandler<AnimationEvent>
    ontransitionend?: EventHandler<TransitionEvent>

    [key: string]: any
}



