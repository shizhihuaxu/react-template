module.exports = {
    plugins: [
        [ 
            'postcss-preset-env', 
            { 
                browsers: [ 
                    'last 1 version',
                    '> 1%',
                    'not dead', 
                ], 
            },
        ],
    ],
}