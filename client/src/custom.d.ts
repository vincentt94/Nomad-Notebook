// helps typescript recognize .png file in the logo
declare module '*.png' {
    const value: string;
    export default value;
}