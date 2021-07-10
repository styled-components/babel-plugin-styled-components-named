import path from 'path'
import fs from 'fs'
import {
  useFileName,
  useDisplayName,
  useSSR,
  useNamespace,
  preferOuterAssignment
} from '../utils/options'
import getName from '../utils/getName'
import prefixLeadingDigit from '../utils/prefixDigit'
import hash from '../utils/hash'
import {
  isCreateGlobalStyleHelper,
  isCSSHelper,
  isStyled,
} from '../utils/detectors'

const addConfig = t => (path, displayName, componentId) => {
  if (!displayName && !componentId) {
    return
  }

  const withConfigProps = []

  if (displayName) {
    withConfigProps.push(
      t.objectProperty(
        t.identifier('displayName'),
        t.stringLiteral(displayName)
      )
    )
  }
  if (componentId) {
    withConfigProps.push(
      t.objectProperty(
        t.identifier('componentId'),
        t.stringLiteral(componentId)
      )
    )
  }

  const existingConfig = getExistingConfig(t)(path)

  if (
    existingConfig &&
    existingConfig.arguments.length &&
    Array.isArray(existingConfig.arguments[0].properties) &&
    !existingConfig.arguments[0].properties.some(prop =>
      ['displayName', 'componentId'].includes(prop.key.name)
    )
  ) {
    existingConfig.arguments[0].properties.push(...withConfigProps)
    return
  }

  if (
    path.node.callee &&
    t.isMemberExpression(path.node.callee.callee) &&
    path.node.callee.callee.property &&
    path.node.callee.callee.property.name &&
    path.node.callee.callee.property.name == 'withConfig' &&
    path.node.callee.arguments.length &&
    Array.isArray(path.node.callee.arguments[0].properties) &&
    !path.node.callee.arguments[0].properties.some(prop =>
      ['displayName', 'componentId'].includes(prop.key.name)
    )
  ) {
    path.node.callee.arguments[0].properties.push(...withConfigProps)
    return
  }

  if (path.node.tag) {
    // Replace x`...` with x.withConfig({ })`...`
    path.node.tag = t.callExpression(
      t.memberExpression(path.node.tag, t.identifier('withConfig')),
      [t.objectExpression(withConfigProps)]
    )
  } else {
    path.replaceWith(
      t.callExpression(
        t.callExpression(
          t.memberExpression(path.node.callee, t.identifier('withConfig')),
          [t.objectExpression(withConfigProps)]
        ),
        path.node.arguments
      )
    )
  }
}

const getExistingConfig = t => path => {
  if (
    path.node.callee &&
    t.isMemberExpression(path.node.callee.callee) &&
    path.node.callee.callee.property &&
    path.node.callee.callee.property.name &&
    path.node.callee.callee.property.name == 'withConfig'
  ) {
    return path.node.callee
  }

  if (
    path.node.callee &&
    t.isMemberExpression(path.node.callee.callee) &&
    path.node.callee.callee.object &&
    path.node.callee.callee.object.callee &&
    path.node.callee.callee.object.callee.property &&
    path.node.callee.callee.object.callee.property.name === 'withConfig'
  ) {
    return path.node.callee.callee.object
  }
}

const getBlockName = file => {
  const name = path.basename(
    file.opts.filename,
    path.extname(file.opts.filename)
  )
  return name !== 'index'
    ? name
    : path.basename(path.dirname(file.opts.filename))
}

const getDisplayName = t => (path, state) => {
  const file = useFileName(state) ? state.file : false;
  const componentName = getName(t)(path, state)
  if (file) {
    const blockName = getBlockName(file)
    if (blockName === componentName) {
      return componentName
    }
    return componentName
      ? `${prefixLeadingDigit(blockName)}__${componentName}`
      : prefixLeadingDigit(blockName)
  } else {
    return componentName
  }
}

const findModuleRoot = filename => {
  if (!filename) {
    return null
  }
  let dir = path.dirname(filename)
  if (fs.existsSync(path.join(dir, 'package.json'))) {
    return dir
  } else if (dir !== filename) {
    return findModuleRoot(dir)
  } else {
    return null
  }
}

const FILE_HASH = 'styled-components-file-hash'
const COMPONENT_POSITION = 'styled-components-component-position'
const separatorRegExp = new RegExp(`\\${path.sep}`, 'g')

const getFileHash = state => {
  const { file } = state
  // hash calculation is costly due to fs operations, so we'll cache it per file.
  if (file.get(FILE_HASH)) {
    return file.get(FILE_HASH)
  }
  const filename = file.opts.filename
  // find module root directory
  const moduleRoot = findModuleRoot(filename)
  const filePath =
    moduleRoot &&
    path.relative(moduleRoot, filename).replace(separatorRegExp, '/')
  const moduleName =
    moduleRoot &&
    JSON.parse(fs.readFileSync(path.join(moduleRoot, 'package.json'))).name
  const code = file.code

  const stuffToHash = [moduleName]

  if (filePath) {
    stuffToHash.push(filePath)
  } else {
    stuffToHash.push(code)
  }

  const fileHash = hash(stuffToHash.join(''))
  file.set(FILE_HASH, fileHash)
  return fileHash
}

const getNextId = state => {
  const id = state.file.get(COMPONENT_POSITION) || 0
  state.file.set(COMPONENT_POSITION, id + 1)
  return id
}

const getComponentId = state => {
  // Prefix the identifier with a character because CSS classes cannot start with a number
  return `${useNamespace(state)}sc-${getFileHash(state)}-${getNextId(state)}`
}

export default t => (path, state) => {
  if (
    path.node.tag
      ? isStyled(t)(path.node.tag, state)
      : /* styled()`` */ (isStyled(t)(path.node.callee, state) &&
          path.node.callee.property &&
          path.node.callee.property.name !== 'withConfig') ||
        // styled(x)({})
        (isStyled(t)(path.node.callee, state) &&
          !t.isMemberExpression(path.node.callee.callee)) ||
        // styled(x).attrs()({})
        (isStyled(t)(path.node.callee, state) &&
          t.isMemberExpression(path.node.callee.callee) &&
          path.node.callee.callee.property &&
          path.node.callee.callee.property.name &&
          path.node.callee.callee.property.name !== 'withConfig') ||
        // styled(x).withConfig({})
        (isStyled(t)(path.node.callee, state) &&
          t.isMemberExpression(path.node.callee.callee) &&
          path.node.callee.callee.property &&
          path.node.callee.callee.property.name &&
          path.node.callee.callee.property.name === 'withConfig' &&
          path.node.callee.arguments.length &&
          Array.isArray(path.node.callee.arguments[0].properties) &&
          !path.node.callee.arguments[0].properties.some(prop =>
            ['displayName', 'componentId'].includes(prop.key.name)
          ))
  ) {
    const displayName =
      useDisplayName(state) &&
      getDisplayName(t)(path, state)

    addConfig(t)(
      path,
      displayName && displayName.replace(/[^_a-zA-Z0-9-]/g, ''),
      useSSR(state) && getComponentId(state)
    )
  }
}
