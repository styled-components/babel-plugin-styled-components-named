import { useTopLevelImportPaths } from './options'

const VALID_TOP_LEVEL_IMPORT_PATHS = [
  'styled-components',
  'styled-components/no-tags',
  'styled-components/native',
  'styled-components/primitives',
]

export const isValidTopLevelImport = (x, state) =>
  [...VALID_TOP_LEVEL_IMPORT_PATHS, ...useTopLevelImportPaths(state)].includes(
    x
  )

const localNameCache = {}

export const importLocalName = (name, state, bypassCache = false) => {
  const cacheKey = name + state.file.opts.filename

  if (!bypassCache && cacheKey in localNameCache) {
    return localNameCache[cacheKey]
  }

  let localName = state.styledRequired
    ? name === 'default'
      ? 'styled'
      : name
    : false

  state.file.path.traverse({
    ImportDeclaration: {
      exit(path) {
        const { node } = path

        if (isValidTopLevelImport(node.source.value, state)) {
          for (const specifier of path.get('specifiers')) {
            if (specifier.isImportSpecifier() && specifier.node.imported.name === 'styled') {
              localName = 'styled'
            }
            
            if (specifier.isImportDefaultSpecifier()) {
              localName = specifier.node.local.name
            }

            if (
              specifier.isImportSpecifier() &&
              specifier.node.imported.name === name
            ) {
              localName = specifier.node.local.name
            }

            if (specifier.isImportNamespaceSpecifier()) {
              localName = specifier.node.local.name
            }
          }
        }
      },
    },
  })

  localNameCache[cacheKey] = localName

  return localName
}

// cache styled tags that we've already found from previous calls to isStyled()
const visitedStyledTags = new WeakSet()

export const isStyled = t => (tag, state, includeIIFE = false) => {
  if (includeIIFE) {
    // check to see if this is an IIFE wrapper created by pureWrapStaticProps()
    // that replaced what was originally a `styled` call
    if (t.isArrowFunctionExpression(tag) && tag.body && tag.body.body[0]) {
      const statement = tag.body.body[0]
      if (t.isVariableDeclaration(statement)) {
        const callee = statement.declarations[0].init.callee
        if (callee && isStyled(t)(callee, state)) {
          return true
        }
      }
    }
  }

  if (
    t.isCallExpression(tag) &&
    t.isMemberExpression(tag.callee) &&
    tag.callee.property.name !== 'default' /** ignore default for #93 below */
  ) {
    // styled.something()
    return isStyled(t)(tag.callee.object, state)
  }
  if (visitedStyledTags.has(tag)) {
    return true
  }
  const ret = Boolean(
    (t.isMemberExpression(tag) &&
      tag.object.name === importLocalName('default', state)) ||
      (t.isCallExpression(tag) &&
        tag.callee.name === importLocalName('default', state)) ||
      /**
       * #93 Support require()
       * styled-components might be imported using a require()
       * call and assigned to a variable of any name.
       * - styled.default.div``
       * - styled.default.something()
       */
      (state.styledRequired &&
        t.isMemberExpression(tag) &&
        t.isMemberExpression(tag.object) &&
        tag.object.property.name === 'default' &&
        tag.object.object.name === state.styledRequired) ||
      (state.styledRequired &&
        t.isCallExpression(tag) &&
        t.isMemberExpression(tag.callee) &&
        tag.callee.property.name === 'default' &&
        tag.callee.object.name === state.styledRequired)
  )
  if (ret) {
    visitedStyledTags.add(tag)
  }
  return ret
}

export const isCSSHelper = t => (tag, state) =>
  t.isIdentifier(tag) && tag.name === importLocalName('css', state)

export const isCreateGlobalStyleHelper = t => (tag, state) =>
  t.isIdentifier(tag) &&
  tag.name === importLocalName('createGlobalStyle', state)

export const isInjectGlobalHelper = t => (tag, state) =>
  t.isIdentifier(tag) && tag.name === importLocalName('injectGlobal', state)

export const isKeyframesHelper = t => (tag, state) =>
  t.isIdentifier(tag) && tag.name === importLocalName('keyframes', state)

export const isWithThemeHelper = t => (tag, state) =>
  t.isIdentifier(tag) && tag.name === importLocalName('withTheme', state)

export const isHelper = t => (tag, state) =>
  isCSSHelper(t)(tag, state) ||
  isKeyframesHelper(t)(tag, state) ||
  isWithThemeHelper(t)(tag, state)

export const isPureHelper = t => (tag, state) =>
  isCSSHelper(t)(tag, state) ||
  isKeyframesHelper(t)(tag, state) ||
  isCreateGlobalStyleHelper(t)(tag, state) ||
  isWithThemeHelper(t)(tag, state)

export { isFunctionComponent } from './isFunctionComponent'
