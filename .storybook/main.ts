import type { StorybookConfig } from '@storybook/nextjs' // @storybook/reactから変更

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/nextjs', // 追加
    options: {}
  },
  docs: {
    autodocs: 'tag'
  }
}
export default config
