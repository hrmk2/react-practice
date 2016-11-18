import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from '../webpack.config.js';

export default app => {
    if (process.env.NODE_ENV !== 'production') {
        console.log('Using webpack dev middleware');
        var webpackCompiler = webpack(config);
        app.use(webpackDevMiddleware(webpackCompiler, {
            noInfo: true,
            publicPath: '/static/'
        }));
    } else {
        console.log('Using webpack build');
    }
};
