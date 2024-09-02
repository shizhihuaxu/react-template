// module.exports = {
//     plugins: [
//         'postcss-preset-env', 
//     ],
// }

const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
    plugins: [
        postcssPresetEnv()
    ],
}

