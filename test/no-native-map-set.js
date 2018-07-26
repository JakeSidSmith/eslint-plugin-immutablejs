import test from 'ava';
import rule from '../lib/rules/no-native-map-set';
import RuleTester from 'eslint/lib/testers/rule-tester';
import { constructValidSnippets, constructInvalidSnippets } from './_construct-snippets';

const parserOptions = {
    ecmaVersion: 6,
    sourceType: 'module'
};

const errors = [{
    message: 'Native ES6 Map is not allowed. Use Immutable.Map()'
}, {
    message: 'Native ES6 Set is not allowed. Use Immutable.Set()'
}];

test('"immutable-no-map-set" Rule', t => {
    const ruleTester = new RuleTester();

    const valid = constructValidSnippets([
        `
            import { Map, Set } from 'immutable';
            const a = Map();
            const b = Set();
        `,
        `
            import immute from 'immutable';
            const Map = immute.Map;
            const Set = immute.Set;
            const a = Map();
            const b = Set();
        `,
        `
            const immute = require('immutable');
            const Set = immute.Set;
            const Map = immute.Map;
            const a = Map();
            const b = Set();
        `,
        `
            import { Map, Set } from 'immutable';
            foo.propTypes = {
                foo: instanceOf(Map),
                bar: instanceOf(Set)
            }
        `,
        `
            import immutable from 'immutable';
            const { Map } = immutable;
        `
    ], parserOptions);

    const invalid = constructInvalidSnippets([
        `
            foo.propTypes = {
                foo: instanceOf(Map),
                bar: instanceOf(Set)
            }
        `,
        `
            import immute from 'immutable';
            const a = Map();
            const b = Set();
        `,
        `
            Map() && Set();
        `,
        `
            new Map() && new Set();
        `
    ], parserOptions, errors);

    ruleTester.run('immutable-no-map-set', rule, { valid, invalid });

    t.pass();
});
