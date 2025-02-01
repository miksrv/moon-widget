const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
    stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

    addons: [
        '@storybook/addon-webpack5-compiler-swc',
        '@storybook/addon-onboarding',
        '@storybook/addon-links',
        '@storybook/addon-docs',
        '@storybook/addon-essentials',
        '@chromatic-com/storybook',
        '@storybook/addon-interactions',
        '@storybook/addon-themes'
    ],

    framework: {
        name: '@storybook/react-webpack5',
        options: {}
    },

    webpackFinal: async (config) => {
        config.resolve.plugins = [
            new TsconfigPathsPlugin({
                configFile: '../tsconfig.json'
            })
        ]

        config.module.rules.push({
            test: /\.module\.s(a|c)ss$/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'sass-loader'
                }
            ]
        })

        return config
    },

    docs: {},

    typescript: {
        reactDocgen: 'react-docgen-typescript'
    }
}
export default config
