module.exports = {
    entry: './calc_script',
    output: {
        filename: './build.js'
    },

    watch: true,
    watchOptions: {
        aggregateTimeout: 500,
        poll: 1000, // проверяем изменения раз в секунду
        ignored: /node_modules/,
    },

    optimization: {
        minimize: false
    }
}