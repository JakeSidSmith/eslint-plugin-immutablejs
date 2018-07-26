export function constructValidSnippet(code, parserOptions) {
  if (typeof code !== 'string') {
    throw new Error('Snippet must be a string');
  }

  if (!parserOptions || typeof parserOptions !== 'object') {
    throw new Error('Parser options must be an object');
  }

  return {code, parserOptions};
}

export function constructInvalidSnippet(code, parserOptions, errors) {
  if (typeof code !== 'string') {
    throw new Error('Snippet must be a string');
  }

  if (!parserOptions || typeof parserOptions !== 'object') {
    throw new Error('Parser options must be an object');
  }

  if (!Array.isArray(errors)) {
    throw new Error('Errors must be an array');
  }

  return ({code, parserOptions, errors});
}

export function constructValidSnippets(snippets, parserOptions) {
  if (!Array.isArray(snippets)) {
    throw new Error('Snippets must be an array');
  }

  if (!parserOptions || typeof parserOptions !== 'object') {
    throw new Error('Parser options must be an object');
  }

  return snippets.map((code) => constructValidSnippet(code, parserOptions));
}

export function constructInvalidSnippets(snippets, parserOptions, errors) {
  if (!Array.isArray(snippets)) {
    throw new Error('Snippets must be an array');
  }

  if (!parserOptions || typeof parserOptions !== 'object') {
    throw new Error('Parser options must be an object');
  }

  if (!Array.isArray(errors)) {
    throw new Error('Errors must be an array');
  }

  return snippets.map((code) => constructInvalidSnippet(code, parserOptions, errors));
}
