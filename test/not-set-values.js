import test from 'ava';
import rule from '../lib/rules/not-set-values';
import RuleTester from 'eslint/lib/testers/rule-tester';
import { constructValidSnippets, constructInvalidSnippets } from './_construct-snippets';

const parserOptions = {
    ecmaVersion: 6,
    sourceType: 'module'
};

const errors = [
    {
        message: 'ImmutableJS methods must have a notSetValue'
    }
];

test('"not-set-values" Rule', t => {
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
        `,
        `
        a.find(() => {
            return true;
        }, context, {})
        `,
        `
        a.updateIn(['foo'], {}, () => {
            return {
                foo: 'bar'
            };
        })
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
        `,
        `
        a.find(() => {
            return true;
        }, context)
        `,
        `
        a.find(() => {
            return true;
        })
        `,
        `
        a.updateIn(['foo'], () => {
            return {
                foo: 'bar'
            };
        })
        `
    ], parserOptions, errors);

    ruleTester.run('not-set-values', rule, { valid, invalid });

    t.pass();
});
