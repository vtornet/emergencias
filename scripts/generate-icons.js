import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SVG base como string
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
	<rect width="512" height="512" rx="115" fill="#ef4444"/>
	<g fill="white">
		<rect x="180" y="100" width="152" height="80" rx="10"/>
		<rect x="100" y="180" width="312" height="80" rx="10"/>
		<rect x="220" y="115" width="72" height="50" rx="5" fill="#fecaca"/>
		<rect x="115" y="215" width="282" height="10" rx="5" fill="#fecaca"/>
	</g>
	<path d="M380 120 c0-25-20-45-45-45 c-15 0-30 8-38 20 c-8-12-23-20-38-20 c-25 0-45 20-45 45 c0 35 45 70 83 100 c38-30 83-65 83-100z" fill="#fbbf24" opacity="0.9"/>
</svg>`;

// Tamaños de iconos necesarios
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = path.join(__dirname, '..', 'static', 'icons');

// Crear directorio si no existe
if (!fs.existsSync(iconsDir)) {
	fs.mkdirSync(iconsDir, { recursive: true });
}

// Generar iconos
async function generateIcons() {
	const svgBuffer = Buffer.from(svg);

	for (const size of sizes) {
		const filename = `icon-${size}x${size}.png`;
		const filepath = path.join(iconsDir, filename);

		await sharp(svgBuffer)
			.resize(size, size, { fit: 'cover', background: { r: 239, g: 68, b: 68 } })
			.png()
			.toFile(filepath);

		console.log(`Generated ${filename}`);
	}

	// Generar versión maskable (con padding seguro)
	const maskableSize = 512;
	const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
		<rect width="512" height="512" fill="#ef4444"/>
		<rect x="64" y="64" width="384" height="384" rx="96" fill="#dc2626"/>
		<g fill="white">
			<rect x="180" y="130" width="152" height="60" rx="8"/>
			<rect x="130" y="180" width="252" height="60" rx="8"/>
		</g>
	</svg>`;

	await sharp(Buffer.from(maskableSvg))
		.resize(maskableSize, maskableSize)
		.png()
		.toFile(path.join(iconsDir, 'icon-maskable-512x512.png'));

	console.log('Generated icon-maskable-512x512.png');
	console.log('All icons generated successfully!');
}

generateIcons().catch(console.error);
