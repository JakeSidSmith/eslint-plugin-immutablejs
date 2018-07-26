import test from 'ava';
import rule from '../lib/rules/require-defaults';
import RuleTester from 'eslint/lib/testers/rule-tester';
import { constructValidSnippets, constructInvalidSnippets } from './_construct-snippets';

const parserOptions = {
    ecmaVersion: 6,
    sourceType: 'module'
};

const errors = [
    {
        message: 'ImmutableJS getters must have a default value.'
    }
];

test('"require-defaults" Rule', t => {
    const ruleTester = new RuleTester();

    const valid = constructValidSnippets([
        `
        a.get('foo', 'bar');
        `,
        `
        a.getIn('foo', 'bar');
        `,
        `
        a.getIn(['foo', 'bar'], 'baz');
        `,
        `
        get('this is fine because it is not a property')
        `
    ], parserOptions);

    const invalid = constructInvalidSnippets([
        `
        a.get('foo');
        `,
        `
        a.getIn('foo');
        `,
        `
        a.getIn(['foo', 'bar']);
        `
    ], parserOptions, errors);

    ruleTester.run('require-defaults', rule, { valid, invalid });

    t.pass();
});
