module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@models': './src/models',
          '@services': './src/services',
          '@hooks': './src/hooks',
          '@components': './src/components',
          '@utils': './src/utils',
          '@constants': './src/constants',
        },
      },
    ],
  ],
};

