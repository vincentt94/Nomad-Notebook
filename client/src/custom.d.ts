// helps typescript recognize .png file in the logo
declare module '*.png' {
    const value: string;
    export default value;
}

declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";
declare module "*.gif";
declare module "*.svg";
declare module "*.webp";
declare module "*.avif";