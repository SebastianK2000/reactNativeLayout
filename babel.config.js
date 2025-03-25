module.exports = function (api) {
  api.cache(true);
  const plugins = [
    'babel-plugin-styled-components',
  ];

  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins,
  };
};
