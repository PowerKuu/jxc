

declare namespace JSX {
  type CssType = import("csstype").PropertiesHyphen

  type Children = string|Function|Element

  interface Element {
    tag: keyof IntrinsicElements,
    attributes: Attributes

    children: Children[]
    
    id: string,

    scope: Object
  }

  interface IntrinsicElements  {
    script: Attributes
    a: Attributes,
    abbr: Attributes
    address: Attributes
    area: Attributes
    article: Attributes
    aside: Attributes
    audio: Attributes
    b: Attributes
    base: Attributes
    bdi: Attributes
    bdo: Attributes
    big: Attributes
    blockquote: Attributes
    body: Attributes
    br: Attributes
    button: Attributes
    canvas: Attributes
    caption: Attributes
    cite: Attributes
    code: Attributes
    col: Attributes
    colgroup: Attributes
    data: Attributes
    datalist: Attributes
    dd: Attributes
    del: Attributes
    details: Attributes
    dfn: Attributes
    dialog: Attributes
    div: Attributes
    dl: Attributes
    dt: Attributes
    em: Attributes
    embed: Attributes
    fieldset: Attributes
    figcaption: Attributes
    figure: Attributes
    footer: Attributes
    form: Attributes
    h1: Attributes
    h2: Attributes
    h3: Attributes
    h4: Attributes
    h5: Attributes
    h6: Attributes
    head: Attributes
    header: Attributes
    hgroup: Attributes
    hr: Attributes
    html: Attributes
    i: Attributes
    iframe: Attributes
    img: Attributes
    input: Attributes
    ins: Attributes
    kbd: Attributes
    keygen: Attributes
    label: Attributes
    legend: Attributes
    li: Attributes
    link: Attributes
    main: Attributes
    map: Attributes
    mark: Attributes
    menu: Attributes
    menuitem: Attributes
    meta: Attributes
    meter: Attributes
    nav: Attributes
    noindex: Attributes
    noscript: Attributes
    object: Attributes
    ol: Attributes
    optgroup: Attributes
    option: Attributes
    output: Attributes
    p: Attributes
    param: Attributes
    picture: Attributes
    pre: Attributes
    progress: Attributes
    q: Attributes
    rp: Attributes
    rt: Attributes
    ruby: Attributes
    s: Attributes
    samp: Attributes
    section: Attributes
    select: Attributes
    slot: Attributes
    small: Attributes
    source: Attributes
    span: Attributes
    strong: Attributes
    style: Attributes
    sub: Attributes
    summary: Attributes
    sup: Attributes
    table: Attributes
    tbody: Attributes
    td: Attributes
    textarea: Attributes
    tfoot: Attributes
    th: Attributes
    thead: Attributes
    time: Attributes
    title: Attributes
    tr: Attributes
    track: Attributes
    u: Attributes
    ul: Attributes
    var: Attributes
    video: Attributes
    wbr: Attributes
    svg: Attributes
    animate: Attributes
    animateMotion: Attributes
    animateTransform: Attributes
    circle: Attributes
    clipPath: Attributes
    defs: Attributes
    desc: Attributes
    ellipse: Attributes
    feBlend: Attributes
    feColorMatrix: Attributes
    feComponentTransfer: Attributes
    feComposite: Attributes
    feConvolveMatrix: Attributes
    feDiffuseLighting: Attributes
    feDisplacementMap: Attributes
    feDistantLight: Attributes
    feFlood: Attributes
    feFuncA: Attributes
    feFuncB: Attributes
    feFuncG: Attributes
    feFuncR: Attributes
    feGaussianBlur: Attributes
    feImage: Attributes
    feMerge: Attributes
    feMergeNode: Attributes
    feMorphology: Attributes
    feOffset: Attributes
    fePointLight: Attributes
    feSpecularLighting: Attributes
    feSpotLight: Attributes
    feTile: Attributes
    feTurbulence: Attributes
    filter: Attributes
    foreignObject: Attributes
    g: Attributes
    image: Attributes
    line: Attributes
    linearGradient: Attributes
    marker: Attributes
    mask: Attributes
    metadata: Attributes
    path: Attributes
    pattern: Attributes
    polygon: Attributes
    polyline: Attributes
    radialGradient: Attributes
    rect: Attributes
    stop: Attributes
    switch: Attributes
    symbol: Attributes
    text: Attributes
    textPath: Attributes
    tspan: Attributes
    use: Attributes
    view: Attributes
  }
  
  interface ElementChildrenAttribute {
    children: {}
  }


  //type Child<T extends unknown> = (T|Element<Child<unknown>>)
  // Attributes
  interface CSSProperties extends CssType {
    // Override
    [key: `-${string}`]: string | number | undefined
  }


  type EventHandler<T> = (element:Element) => any

  interface Attributes {
      class?: string|string[]
      style?: string|CSSProperties

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
}

