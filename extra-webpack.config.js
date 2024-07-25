module.exports = {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'sass',
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true // Required for resolve-url-loader
              }
            }
          ]
        }
      ]
    }
  };
