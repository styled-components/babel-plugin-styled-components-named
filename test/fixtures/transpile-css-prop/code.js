/*
 * Basic fixtures
 */

const StaticString = p => <p css="flex: 1;">A</p>

const StaticTemplate = p => (
  <p
    css={`
      flex: 1;
    `}
  >
    A
  </p>
)

const ObjectProp = p => <p css={{ color: 'blue' }}>A</p>

const NoChildren = p => <p css="flex: 1;" />

const CssHelperProp = p => (
  <p
    css={css`
      color: blue;
    `}
  >
    A
  </p>
)

/*
 * Dynamic prop
 */

const CustomComp = p => <Paragraph css="flex: 1">H</Paragraph>

const DynamicProp = p => <p css={props.cssText}>H</p>

const LocalInterpolation = p => (
  <p
    css={`
      background: ${props.bg};
    `}
  >
    H
  </p>
)

const FuncInterpolation = p => (
  <p
    css={`
      color: ${props => props.theme.a};
    `}
  >
    H
  </p>
)

const radius = 10
const GlobalInterpolation = p => (
  <p
    css={`
      border-radius: ${radius}px;
    `}
  >
    H
  </p>
)

const LocalCssHelperProp = p => (
  <p
    css={css`
      color: ${p.color};
    `}
  >
    A
  </p>
)

const DynamicCssHelperProp = p => (
  <p
    css={css`
      color: ${props => props.theme.color};
    `}
  >
    A
  </p>
)

const CustomCompWithDot = p => <Button.Ghost css="flex: 1">H</Button.Ghost>

const NestedCompWithDot = p => (
  <Button.Ghost.New css="flex: 1">H</Button.Ghost.New>
)

const DynamicComp = p => {
  const { Box } = p.components;

  <Box css="color: blue" title="Hello">X</Box>
}

const DynamicCompWithDot = p => {
  <p.components.Box css="color: blue" title="Hello">Y</p.components.Box>
}

const DynamicCompWithAs = p => {
  const { Box, Pyramid } = p.components;

  <Box css="color: blue" as={Pyramid}>Z</Box>
}
