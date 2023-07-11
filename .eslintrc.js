module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    parserOptions: { // 优先级低于 parser 的语法解析配置
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
    ],
    plugins: [
        '@typescript-eslint',
        'react',
    ],
    settings: {             //自动发现React的版本，从而进行规范react代码
        react: {
            pragma: 'React',
            version: 'detect',
        },
    },
    rules: {
        // https://github.com/eslint/eslint/issues/13956
        indent: 'off',
        '@typescript-eslint/indent': [
            'error',
            4,
            {
                SwitchCase: 1, // switch case 添加一个单位缩进
            },
        ],
        quotes: [
            'error',
            'single',
        ],
        'jsx-quotes': [ 'error', 'prefer-single' ],
        'quote-props': [ 'error', 'as-needed' ], // 对象属性在必要时才加引号
        semi: [
            'error',
            'never',
        ],
        'comma-dangle': [ 'warn', 'always-multiline' ], // 对象、数组等最后一个元素使用尾逗号
        'comma-spacing': [ 'error', { before: false, after: true } ], // 逗号后加空格
        'prefer-template': 'error', // 优先使用字符串模板
        // 对象、函数、数组、操作符 前后空格
        'space-infix-ops': 'error',
        'space-before-function-paren': [ 'warn', 'always' ],
        'array-bracket-spacing': [ 'error', 'always' ],
        'object-curly-spacing': [ 'error', 'always' ],
        'arrow-spacing': [ 'error', { before: true, after: true } ],
        // NOTE 解决 ts 函数重载
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': 'error',
        // NOTE 解决 ts 类型声明参数名称未使用的问题
        'no-unused-vars': [ 'off' ],
        '@typescript-eslint/no-unused-vars': [
            'error',
            { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'react/jsx-closing-tag-location': 'error',
    },
}
