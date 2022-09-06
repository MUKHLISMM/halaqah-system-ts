/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
// /** @type {import('next').NextConfig} */
// const withLess = require("next-with-less");
// const withPlugins = require('next-compose-plugins');
// const path = require('path')
// const withTM = require("next-transpile-modules")([
//   "@fullcalendar/common",
//   "@babel/preset-react",
//   "@fullcalendar/common",
//   "@fullcalendar/daygrid",
//   "@fullcalendar/interaction",
//   "@fullcalendar/react",
//   "@fullcalendar/timegrid",
//   "@fullcalendar/list",
// ]);
// const nextConfig = {
//   reactStrictMode: true,
//   sassOptions: {
//     includePaths: [path.join(__dirname, 'styles')],
//   },
  
//   compress: true,
//   optimizeFonts: false,
// }
// module.exports = withPlugins(
//   [
//     [withTM],
//     [
//       withLess,
//       {
//         lessLoaderOptions: {
//           lessOptions: { // If you are using less-loader@5 please spread the lessOptions to options directly
//             // modifyVars: getThemeVariables({
//             //   dark: true, // Enable dark mode
//             //   compact: true, // Enable compact mode
//             // }),
//             javascriptEnabled: true,
//           },
//         }
//       }],
//   ],
//   nextConfig
// );