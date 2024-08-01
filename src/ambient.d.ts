declare module "*.png" {
  const uri: string;
  export = uri;
}

declare module "*.svg" {
  const content: any;
  export = content;
}

