declare namespace JSX {
  // Allow any intrinsic element with any attributes (for Astro directives like client:load, is:inline, and 'class')
  interface IntrinsicElements {
    [elemName: string]: any;
  }
  interface IntrinsicAttributes {
    [key: string]: any;
  }
}

export {};
