import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { URL } from 'node:url';

// Load .env.local manually if present
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
	const envContent = fs.readFileSync(envPath, 'utf8');
	for (const line of envContent.split('\n')) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) continue;
		const eqIdx = trimmed.indexOf('=');
		if (eqIdx > 0) {
			const key = trimmed.slice(0, eqIdx).trim();
			const val = trimmed.slice(eqIdx + 1).trim();
			if (!process.env[key]) {
				process.env[key] = val;
			}
		}
	}
}

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUri =
	process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/oauth2callback';

if (!clientId || !clientSecret) {
	console.error(
		'\n❌ ERROR: GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET missing in environment or .env.local.',
	);
	console.error(
		'Please configure your credentials in .env.local before running this script.\n',
	);
	process.exit(1);
}

const parsedRedirect = new URL(redirectUri);
const port = parseInt(parsedRedirect.port || '3000', 10);
const pathname = parsedRedirect.pathname || '/oauth2callback';

const stateToken = crypto.randomBytes(16).toString('hex');
const scopes = [
	'https://www.googleapis.com/auth/calendar.events',
	'https://www.googleapis.com/auth/calendar.freebusy',
].join(' ');

const authUrl =
	`https://accounts.google.com/o/oauth2/v2/auth?` +
	`client_id=${encodeURIComponent(clientId)}` +
	`&redirect_uri=${encodeURIComponent(redirectUri)}` +
	`&response_type=code` +
	`&scope=${encodeURIComponent(scopes)}` +
	`&access_type=offline` +
	`&prompt=consent` +
	`&state=${stateToken}`;

console.log('\n==================================================');
console.log('🔒 Google Calendar API - One-Time Admin Setup');
console.log('==================================================');
console.log(
	'Please ensure you have rotated your client secret in GCP Console if it was previously exposed.',
);
console.log('\nOpen the following link in your browser to authorize access:\n');
console.log(authUrl);
console.log('\nWaiting for callback on ' + redirectUri + '...\n');

const server = http.createServer(async (req, res) => {
	const reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

	if (reqUrl.pathname !== pathname) {
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end('Not Found');
		return;
	}

	const code = reqUrl.searchParams.get('code');
	const returnedState = reqUrl.searchParams.get('state');
	const error = reqUrl.searchParams.get('error');

	if (error) {
		res.writeHead(400, { 'Content-Type': 'text/html' });
		res.end('<h2>Authorization Denied</h2><p>' + error + '</p>');
		console.error('❌ Authorization error:', error);
		server.close();
		process.exit(1);
	}

	if (returnedState !== stateToken) {
		res.writeHead(400, { 'Content-Type': 'text/html' });
		res.end('<h2>Security Error</h2><p>CSRF state mismatch.</p>');
		console.error('❌ CSRF state mismatch.');
		server.close();
		process.exit(1);
	}

	if (!code) {
		res.writeHead(400, { 'Content-Type': 'text/html' });
		res.end('<h2>Missing Authorization Code</h2>');
		server.close();
		process.exit(1);
	}

	try {
		// Exchange code for refresh token using standard OAuth endpoint
		const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({
				code,
				client_id: clientId,
				client_secret: clientSecret,
				redirect_uri: redirectUri,
				grant_type: 'authorization_code',
			}),
		});

		const tokenData = await tokenRes.json();

		if (tokenData.error) {
			res.writeHead(400, { 'Content-Type': 'text/html' });
			res.end(
				'<h2>Token Exchange Failed</h2><p>' +
					(tokenData.error_description || tokenData.error) +
					'</p>',
			);
			console.error('❌ Token Exchange Error:', tokenData);
			server.close();
			process.exit(1);
		}

		const refreshToken = tokenData.refresh_token;

		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(`
			<!DOCTYPE html>
			<html>
			<head><title>Authorization Successful</title></head>
			<body style="font-family: system-ui, sans-serif; background: #111; color: #eee; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0;">
				<div style="background: #222; border: 1px solid #333; padding: 2rem; border-radius: 12px; text-align: center; max-width: 450px;">
					<h2 style="color: #4ade80; margin-top: 0;">Authorization Complete!</h2>
					<p style="color: #aaa;">Your refresh token has been output to your terminal window.</p>
					<p style="font-size: 0.85rem; color: #888;">You can close this browser window now.</p>
				</div>
			</body>
			</html>
		`);

		console.log('\n==================================================');
		console.log('✅ AUTHORIZATION SUCCESSFUL!');
		console.log('==================================================');
		if (refreshToken) {
			console.log('\nYour GOOGLE_REFRESH_TOKEN is:\n');
			console.log(refreshToken);
			console.log(
				'\n📌 Copy the line above and add it to your .env.local file (and production host secrets):\n',
			);
			console.log(`GOOGLE_REFRESH_TOKEN=${refreshToken}\n`);
		} else {
			console.log(
				'\n⚠️ No refresh token was returned in this consent response.',
			);
			console.log(
				'If you previously authorized this app, please revoke access at https://myaccount.google.com/permissions and re-run this script.\n',
			);
		}

		setTimeout(() => {
			server.close();
			process.exit(0);
		}, 1000);
	} catch (err) {
		console.error('❌ Unexpected error during token exchange:', err);
		res.writeHead(500, { 'Content-Type': 'text/plain' });
		res.end('Internal Server Error');
		server.close();
		process.exit(1);
	}
});

server.listen(port, () => {
	console.log(`Local OAuth listener running on port ${port}...`);
});
