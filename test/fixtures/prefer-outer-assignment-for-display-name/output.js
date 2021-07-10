import styled from 'styled-components';
const Test = styled.div.withConfig({
  displayName: "Test"
})`width:100%;`;
const Test2 = styled('div').withConfig({
  displayName: "Test2"
})``;
const Test3 = true ? styled.div.withConfig({
  displayName: "Test3"
})`` : styled.div.withConfig({
  displayName: "Test3"
})``;
const styles = {
  One: styled.div.withConfig({
    displayName: "One"
  })``
};
const doubleStyles = {
  One: Discarded = styled.div.withConfig({
    displayName: "One"
  })``
};
let Component;
Component = styled.div.withConfig({
  displayName: "Component"
})``;
const WrappedComponent = styled(Inner).withConfig({
  displayName: "WrappedComponent"
})``;

class ClassComponent {}

ClassComponent.Child = styled.div.withConfig({
  displayName: "Child"
})``;

class DoubleClassComponent {}

DoubleClassComponent.DoubleChild = Discarded = styled.div.withConfig({
  displayName: "DoubleChild"
})``;
const DoubleAssignment = Discarded = styled.div.withConfig({
  displayName: "DoubleAssignment"
})`width:50%;`;
const TripleAssignment = Discarded2 = Discarded = styled.div.withConfig({
  displayName: "TripleAssignment"
})`width:50%;`;
let DiscardWithLet;
const UsingLetForDiscard = DiscardWithLet = styled.div.withConfig({
  displayName: "UsingLetForDiscard"
})`width:50%;`;
var DiscardWithVar;
const UsingVarForDiscard = DiscardWithVar = styled.div.withConfig({
  displayName: "UsingVarForDiscard"
})`width:50%;`;
let UsingLetForAssignmentAfterDeclaration;
UsingLetForAssignmentAfterDeclaration = Discarded = styled.div.withConfig({
  displayName: "UsingLetForAssignmentAfterDeclaration"
})`width:50%;`;
var UsingVarForAssignmentAfterDeclaration;
UsingVarForAssignmentAfterDeclaration = Discarded = styled.div.withConfig({
  displayName: "UsingVarForAssignmentAfterDeclaration"
})`width:50%;`;
