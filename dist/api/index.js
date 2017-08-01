'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _package = require('../../package.json');

var _express = require('express');

var _acceptLanguageParser = require('accept-language-parser');

var _acceptLanguageParser2 = _interopRequireDefault(_acceptLanguageParser);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _facets = require('./facets');

var _facets2 = _interopRequireDefault(_facets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var config = _ref.config,
	    db = _ref.db;

	var api = (0, _express.Router)();

	// mount the facets resource
	api.use('/facets', (0, _facets2.default)({ config: config, db: db }));

	// perhaps expose some API metadata at the root
	api.get('/whoami', function (req, res) {
		var parsedLanguage = _acceptLanguageParser2.default.parse(req.headers['accept-language']);
		var language = parsedLanguage[0].code + '-' + parsedLanguage[0].region;
		var platform = _os2.default.type() + '; ' + _os2.default.release() + '; ' + _os2.default.platform() + '; ' + _os2.default.arch();
		res.json({ ip: req.ip, language: language, platform: platform });
	});

	return api;
};
//# sourceMappingURL=index.js.map