

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



  namespace Attribute {
    type Class = string|string[]
    type Style = string|CSSProperties
    type Use = {[name: string]: any}
    type EventHandler<T> = (element:Element) => any
  }

  interface Attributes {
      class?: Attribute.Class
      style?: Attribute.Style
      use?: Attribute.Use

      onCopy?: Attribute.EventHandler<ClipboardEvent>
      onCut?: Attribute.EventHandler<ClipboardEvent>
      onPaste?: Attribute.EventHandler<ClipboardEvent>
      onCompositionEnd?: Attribute.EventHandler<CompositionEvent>
      onCompositionStart?: Attribute.EventHandler<CompositionEvent>
      onCompositionUpdate?: Attribute.EventHandler<CompositionEvent>
      onFocus?: Attribute.EventHandler<FocusEvent>
      onFocusOut?: Attribute.EventHandler<FocusEvent>
      onFocusIn?: Attribute.EventHandler<FocusEvent>
      onBlur?: Attribute.EventHandler<FocusEvent>
      onChange?: Attribute.EventHandler<Event>
      onInvalid?: Attribute.EventHandler<Event>
      onInput?: Attribute.EventHandler<InputEvent>
      onBeforeInput?: Attribute.EventHandler<InputEvent>
      onReset?: Attribute.EventHandler<Event>
      onSubmit?: Attribute.EventHandler<Event & {submitter: HTMLElement}>
      onLoad?: Attribute.EventHandler<Event>
      onError?: Attribute.EventHandler<Event>
      onKeyDown?: Attribute.EventHandler<KeyboardEvent>
      onKeyPress?: Attribute.EventHandler<KeyboardEvent>
      onKeyUp?: Attribute.EventHandler<KeyboardEvent>
      onGotPointerCapture?: Attribute.EventHandler<PointerEvent>
      onLostPointerCapture?: Attribute.EventHandler<PointerEvent>
      onPointerCancel?: Attribute.EventHandler<PointerEvent>
      onPointerDown?: Attribute.EventHandler<PointerEvent>
      onPointerEnter?: Attribute.EventHandler<PointerEvent>
      onPointerLeave?: Attribute.EventHandler<PointerEvent>
      onPointerMove?: Attribute.EventHandler<PointerEvent>
      onPointerOver?: Attribute.EventHandler<PointerEvent>
      onPointerOut?: Attribute.EventHandler<PointerEvent>
      onPointerUp?: Attribute.EventHandler<PointerEvent>
      onAbort?: Attribute.EventHandler<Event>
      onCanPlay?: Attribute.EventHandler<Event>
      onCanPlayThrough?: Attribute.EventHandler<Event>
      onDurationChange?: Attribute.EventHandler<Event>
      onEmptied?: Attribute.EventHandler<Event>
      onEncrypted?: Attribute.EventHandler<Event>
      onEnded?: Attribute.EventHandler<Event>
      onLoadedData?: Attribute.EventHandler<Event>
      onLoadedMetadata?: Attribute.EventHandler<Event>
      onLoadStart?: Attribute.EventHandler<Event>
      onPause?: Attribute.EventHandler<Event>
      onPlay?: Attribute.EventHandler<Event>
      onPlaying?: Attribute.EventHandler<Event>
      onProgress?: Attribute.EventHandler<Event>
      onRateChange?: Attribute.EventHandler<Event>
      onSeeked?: Attribute.EventHandler<Event>
      onSeeking?: Attribute.EventHandler<Event>
      onStalled?: Attribute.EventHandler<Event>
      onSuspend?: Attribute.EventHandler<Event>
      onTimeUpdate?: Attribute.EventHandler<Event>
      onVolumeChange?: Attribute.EventHandler<Event>
      onWaiting?: Attribute.EventHandler<Event>
      onClick?: Attribute.EventHandler<MouseEvent>
      onAuxClick?: Attribute.EventHandler<MouseEvent>
      onContextMenu?: Attribute.EventHandler<MouseEvent>
      onDblClick?: Attribute.EventHandler<MouseEvent>
      onDrag?: Attribute.EventHandler<DragEvent>
      onDragEnd?: Attribute.EventHandler<DragEvent>
      onDragEnter?: Attribute.EventHandler<DragEvent>
      onDragExit?: Attribute.EventHandler<DragEvent>
      onDragLeave?: Attribute.EventHandler<DragEvent>
      onDragOver?: Attribute.EventHandler<DragEvent>
      onDragStart?: Attribute.EventHandler<DragEvent>
      onDrop?: Attribute.EventHandler<DragEvent>
      onMouseDown?: Attribute.EventHandler<MouseEvent>
      onMouseEnter?: Attribute.EventHandler<MouseEvent>
      onMouseLeave?: Attribute.EventHandler<MouseEvent>
      onMouseMove?: Attribute.EventHandler<MouseEvent>
      onMouseOut?: Attribute.EventHandler<MouseEvent>
      onMouseOver?: Attribute.EventHandler<MouseEvent>
      onMouseUp?: Attribute.EventHandler<MouseEvent>
      onSelect?: Attribute.EventHandler<UIEvent>
      onTouchCancel?: Attribute.EventHandler<TouchEvent>
      onTouchEnd?: Attribute.EventHandler<TouchEvent>
      onTouchMove?: Attribute.EventHandler<TouchEvent>
      onTouchStart?: Attribute.EventHandler<TouchEvent>
      onScroll?: Attribute.EventHandler<UIEvent>
      onWheel?: Attribute.EventHandler<WheelEvent>
      onAnimationStart?: Attribute.EventHandler<AnimationEvent>
      onAnimationEnd?: Attribute.EventHandler<AnimationEvent>
      onAnimationIteration?: Attribute.EventHandler<AnimationEvent>
      onTransitionEnd?: Attribute.EventHandler<TransitionEvent>

      // lower case events
      oncopy?: Attribute.EventHandler<ClipboardEvent>
      oncut?: Attribute.EventHandler<ClipboardEvent>
      onpaste?: Attribute.EventHandler<ClipboardEvent>
      oncompositionend?: Attribute.EventHandler<CompositionEvent>
      oncompositionstart?: Attribute.EventHandler<CompositionEvent>
      oncompositionupdate?: Attribute.EventHandler<CompositionEvent>
      onfocus?: Attribute.EventHandler<FocusEvent>
      onfocusout?: Attribute.EventHandler<FocusEvent>
      onfocusin?: Attribute.EventHandler<FocusEvent>
      onblur?: Attribute.EventHandler<FocusEvent>
      onchange?: Attribute.EventHandler<Event>
      oninvalid?: Attribute.EventHandler<Event>
      oninput?: Attribute.EventHandler<InputEvent>
      onbeforeinput?: Attribute.EventHandler<InputEvent>
      onreset?: Attribute.EventHandler<Event>
      onsubmit?: Attribute.EventHandler<Event & { submitter: HTMLElement}>
      onload?: Attribute.EventHandler<Event>
      onerror?: Attribute.EventHandler<Event>
      onkeydown?: Attribute.EventHandler<KeyboardEvent>
      onkeypress?: Attribute.EventHandler<KeyboardEvent>
      onkeyup?: Attribute.EventHandler<KeyboardEvent>
      ongotpointercapture?: Attribute.EventHandler<PointerEvent>
      onlostpointercapture?: Attribute.EventHandler<PointerEvent>
      onpointercancel?: Attribute.EventHandler<PointerEvent>
      onpointerdown?: Attribute.EventHandler<PointerEvent>
      onpointerenter?: Attribute.EventHandler<PointerEvent>
      onpointerleave?: Attribute.EventHandler<PointerEvent>
      onpointermove?: Attribute.EventHandler<PointerEvent>
      onpointerover?: Attribute.EventHandler<PointerEvent>
      onpointerout?: Attribute.EventHandler<PointerEvent>
      onpointerup?: Attribute.EventHandler<PointerEvent>
      onabort?: Attribute.EventHandler<Event>
      oncanplay?: Attribute.EventHandler<Event>
      oncanplaythrough?: Attribute.EventHandler<Event>
      ondurationchange?: Attribute.EventHandler<Event>
      onemptied?: Attribute.EventHandler<Event>
      onencrypted?: Attribute.EventHandler<Event>
      onended?: Attribute.EventHandler<Event>
      onloadeddata?: Attribute.EventHandler<Event>
      onloadedmetadata?: Attribute.EventHandler<Event>
      onloadstart?: Attribute.EventHandler<Event>
      onpause?: Attribute.EventHandler<Event>
      onplay?: Attribute.EventHandler<Event>
      onplaying?: Attribute.EventHandler<Event>
      onprogress?: Attribute.EventHandler<Event>
      onratechange?: Attribute.EventHandler<Event>
      onseeked?: Attribute.EventHandler<Event>
      onseeking?: Attribute.EventHandler<Event>
      onstalled?: Attribute.EventHandler<Event>
      onsuspend?: Attribute.EventHandler<Event>
      ontimeupdate?: Attribute.EventHandler<Event>
      onvolumechange?: Attribute.EventHandler<Event>
      onwaiting?: Attribute.EventHandler<Event>
      onclick?: Attribute.EventHandler<MouseEvent>
      onauxclick?: Attribute.EventHandler<MouseEvent>
      oncontextmenu?: Attribute.EventHandler<MouseEvent>
      ondblclick?: Attribute.EventHandler<MouseEvent>
      ondrag?: Attribute.EventHandler<DragEvent>
      ondragend?: Attribute.EventHandler<DragEvent>
      ondragenter?: Attribute.EventHandler<DragEvent>
      ondragexit?: Attribute.EventHandler<DragEvent>
      ondragleave?: Attribute.EventHandler<DragEvent>
      ondragover?: Attribute.EventHandler<DragEvent>
      ondragstart?: Attribute.EventHandler<DragEvent>
      ondrop?: Attribute.EventHandler<DragEvent>
      onmousedown?: Attribute.EventHandler<MouseEvent>
      onmouseenter?: Attribute.EventHandler<MouseEvent>
      onmouseleave?: Attribute.EventHandler<MouseEvent>
      onmousemove?: Attribute.EventHandler<MouseEvent>
      onmouseout?: Attribute.EventHandler<MouseEvent>
      onmouseover?: Attribute.EventHandler<MouseEvent>
      onmouseup?: Attribute.EventHandler<MouseEvent>
      onselect?: Attribute.EventHandler<UIEvent>
      ontouchcancel?: Attribute.EventHandler<TouchEvent>
      ontouchend?: Attribute.EventHandler<TouchEvent>
      ontouchmove?: Attribute.EventHandler<TouchEvent>
      ontouchstart?: Attribute.EventHandler<TouchEvent>
      onscroll?: Attribute.EventHandler<UIEvent>
      onwheel?: Attribute.EventHandler<WheelEvent>
      onanimationstart?: Attribute.EventHandler<AnimationEvent>
      onanimationend?: Attribute.EventHandler<AnimationEvent>
      onanimationiteration?: Attribute.EventHandler<AnimationEvent>
      ontransitionend?: Attribute.EventHandler<TransitionEvent>

      [key: string]: any
  }
}

