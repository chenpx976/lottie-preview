
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: false,
      dynamicImport: true,
      title: 'lottie-preview',
      dll: true,
      routes: {
        exclude: [],
      },
      hardSource: false,
    }],
  ],
  disableCSSModules: true,
}
