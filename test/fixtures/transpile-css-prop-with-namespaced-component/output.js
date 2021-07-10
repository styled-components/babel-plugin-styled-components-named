"use strict";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      width: 35em;\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _react = _interopRequireDefault(require("react"));

var _components = require("../../shared/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @flow
var _default = function _default() {
  return <_StyledHeadingH>
    Title
  </_StyledHeadingH>;
};

exports.default = _default;

var _StyledHeadingH = (0, _styledComponents.default)(Heading.h1)(_templateObject());
