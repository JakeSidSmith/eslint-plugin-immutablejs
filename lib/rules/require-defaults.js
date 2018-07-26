module.exports = context => {
    return {
        CallExpression({ callee, parent, arguments:args = [] }) {
            console.log(callee, parent, args);
        }
    };
};
