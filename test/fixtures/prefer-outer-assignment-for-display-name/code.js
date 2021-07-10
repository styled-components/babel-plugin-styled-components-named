import styled from 'styled-components'

const Test = styled.div`
  width: 100%;
`
const Test2 = styled('div')``
const Test3 = true ? styled.div`` : styled.div``
const styles = { One: styled.div`` }
const doubleStyles = { One: Discarded = styled.div`` }
let Component
Component = styled.div``
const WrappedComponent = styled(Inner)``

class ClassComponent {
  static Child = styled.div``
}

class DoubleClassComponent {
  static DoubleChild = Discarded = styled.div``
}

const DoubleAssignment = Discarded = styled.div`
  width: 50%;
`
const TripleAssignment = Discarded2 = Discarded = styled.div`
  width: 50%;
`
let DiscardWithLet;
const UsingLetForDiscard = DiscardWithLet = styled.div`
  width: 50%;
`
var DiscardWithVar;
const UsingVarForDiscard = DiscardWithVar = styled.div`
  width: 50%;
`
let UsingLetForAssignmentAfterDeclaration
UsingLetForAssignmentAfterDeclaration = Discarded = styled.div`
  width: 50%;
`
var UsingVarForAssignmentAfterDeclaration
UsingVarForAssignmentAfterDeclaration = Discarded = styled.div`
  width: 50%;
`
