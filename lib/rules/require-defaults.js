const GETTER_TO_ARGUMENT_COUNT_MAP = {
    get: 2,
    getIn: 2,
    find: 3,
    findLast: 3,
    findEntry: 3,
    findLastEntry: 3,
    update: 2,
    updateIn: 2
};

module.exports = context => {
    return {
        CallExpression(node) {
            const { callee, arguments:args = [] } = node;

            const possiblyAGetter = callee.type === 'MemberExpression' &&
                (callee.property.name in GETTER_TO_ARGUMENT_COUNT_MAP);

            if (possiblyAGetter) {
                if (args.length < GETTER_TO_ARGUMENT_COUNT_MAP[callee.property.name]) {
                    context.report({
                        message: 'ImmutableJS getters must have a default value.',
                        node
                    });
                }
            }
        }
    };
};
