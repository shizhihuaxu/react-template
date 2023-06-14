module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    browsers: [
                        'last 1 version',
                        '> 1%',
                        'not dead',
                    ],
                },
                useBuiltIns: 'usage',
                corejs: '3.30',
            },
        ],
        [
            '@babel/preset-react',
            {
                runtime: 'automatic',
            },
        ],
        '@babel/preset-typescript',
    ],
}