"use strict";

function _templateObject20() {
  var data = _taggedTemplateLiteral(["color: blue"]);

  _templateObject20 = function _templateObject20() {
    return data;
  };

  return data;
}

function _templateObject19() {
  var data = _taggedTemplateLiteral(["color: blue"]);

  _templateObject19 = function _templateObject19() {
    return data;
  };

  return data;
}

function _templateObject18() {
  var data = _taggedTemplateLiteral(["color: blue"]);

  _templateObject18 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17() {
  var data = _taggedTemplateLiteral(["flex: 1"]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = _taggedTemplateLiteral(["flex: 1"]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = _taggedTemplateLiteral(["\n      color: ", ";\n    "]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = _taggedTemplateLiteral(["\n      color: ", ";\n    "]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["\n      border-radius: ", "px;\n    "]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["\n      color: ", ";\n    "]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n      background: ", ";\n    "]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["", ""]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["flex: 1"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n      color: blue;\n    "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["flex: 1;"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["", ""]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n      flex: 1;\n    "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["flex: 1;"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n      color: ", ";\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n      color: ", ";\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      color: blue;\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/*
 * Basic fixtures
 */
var StaticString = function StaticString(p) {
  return <_StyledP>A</_StyledP>;
};

var StaticTemplate = function StaticTemplate(p) {
  return <_StyledP2>
    A
  </_StyledP2>;
};

var ObjectProp = function ObjectProp(p) {
  return <_StyledP3 _css={{
    color: 'blue'
  }}>A</_StyledP3>;
};

var NoChildren = function NoChildren(p) {
  return <_StyledP4 />;
};

var CssHelperProp = function CssHelperProp(p) {
  return <_StyledP5>
    A
  </_StyledP5>;
};
/*
 * Dynamic prop
 */


var CustomComp = function CustomComp(p) {
  return <_StyledParagraph as={Paragraph}>H</_StyledParagraph>;
};

var DynamicProp = function DynamicProp(p) {
  return <_StyledP6 _css2={props.cssText}>H</_StyledP6>;
};

var LocalInterpolation = function LocalInterpolation(p) {
  return <_StyledP7 _css3={props.bg}>
    H
  </_StyledP7>;
};

var FuncInterpolation = function FuncInterpolation(p) {
  return <_StyledP8>
    H
  </_StyledP8>;
};

var radius = 10;

var GlobalInterpolation = function GlobalInterpolation(p) {
  return <_StyledP9>
    H
  </_StyledP9>;
};

var LocalCssHelperProp = function LocalCssHelperProp(p) {
  return <_StyledP10 _css4={p.color}>
    A
  </_StyledP10>;
};

var DynamicCssHelperProp = function DynamicCssHelperProp(p) {
  return <_StyledP11>
    A
  </_StyledP11>;
};

var CustomCompWithDot = function CustomCompWithDot(p) {
  return <_StyledButtonGhost as={Button.Ghost}>H</_StyledButtonGhost>;
};

var NestedCompWithDot = function NestedCompWithDot(p) {
  return <_StyledButtonGhostNew as={Button.Ghost.New}>H</_StyledButtonGhostNew>;
};

var DynamicComp = function DynamicComp(p) {
  var Box = p.components.Box;
  <_StyledBox as={Box} title="Hello">X</_StyledBox>;
};

var DynamicCompWithDot = function DynamicCompWithDot(p) {
  <_StyledPComponentsBox as={p.components.Box} title="Hello">Y</_StyledPComponentsBox>;
};

var DynamicCompWithAs = function DynamicCompWithAs(p) {
  var _p$components = p.components,
      Box = _p$components.Box,
      Pyramid = _p$components.Pyramid;
  <_StyledBox2 as={Pyramid}>Z</_StyledBox2>;
};

var _StyledP = (0, _styledComponents.default)("p")(_templateObject4());

var _StyledP2 = (0, _styledComponents.default)("p")(_templateObject5());

var _StyledP3 = (0, _styledComponents.default)("p")(_templateObject6(), function (p) {
  return p._css;
});

var _StyledP4 = (0, _styledComponents.default)("p")(_templateObject7());

var _StyledP5 = (0, _styledComponents.default)("p")(_templateObject8());

var _StyledParagraph = (0, _styledComponents.default)("-")(_templateObject9());

var _StyledP6 = (0, _styledComponents.default)("p")(_templateObject10(), function (p) {
  return p._css2;
});

var _StyledP7 = (0, _styledComponents.default)("p")(_templateObject11(), function (p) {
  return p._css3;
});

var _StyledP8 = (0, _styledComponents.default)("p")(_templateObject12(), function (props) {
  return props.theme.a;
});

var _StyledP9 = (0, _styledComponents.default)("p")(_templateObject13(), radius);

var _StyledP10 = (0, _styledComponents.default)("p")(_templateObject14(), function (p) {
  return p._css4;
});

var _StyledP11 = (0, _styledComponents.default)("p")(_templateObject15(), function (props) {
  return props.theme.color;
});

var _StyledButtonGhost = (0, _styledComponents.default)("-")(_templateObject16());

var _StyledButtonGhostNew = (0, _styledComponents.default)("-")(_templateObject17());

var _StyledBox = (0, _styledComponents.default)("-")(_templateObject18());

var _StyledPComponentsBox = (0, _styledComponents.default)("-")(_templateObject19());

var _StyledBox2 = (0, _styledComponents.default)("-")(_templateObject20());
