import { version } from '../../package.json';
import { Router } from 'express';
import acceptLanguageParser from 'accept-language-parser';
import os from 'os';
import facets from './facets';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/whoami', (req, res) => {
		const parsedLanguage = acceptLanguageParser.parse(req.headers['accept-language'])
		const language = `${parsedLanguage[0].code}-${parsedLanguage[0].region}`
		const platform = `${os.type()}; ${os.release()}; ${os.platform()}; ${os.arch()}`
		res.json({ ip: req.ip, language, platform});
	});

	return api;
}
