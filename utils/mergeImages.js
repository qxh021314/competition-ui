/**
 * opts新增 direction 配置（目前支持Y方向）
 */

// Defaults
const defaultOptions = {
	format: 'image/png',
	quality: 0.92,
	width: undefined,
	height: undefined,
	Canvas: undefined,
	crossOrigin: undefined
};

// Return Promise
const mergeImages = (sources = [], options = {}) => new Promise(resolve => {
	options = Object.assign({}, defaultOptions, options);

	// Setup browser/Node.js specific variables
	const canvas = options.Canvas ? new options.Canvas() : window.document.createElement('canvas');
	const Image = options.Image || window.Image;

	// Load sources
	const images = sources.map(source => new Promise((resolve, reject) => {
		// Convert sources to objects
		if (source.constructor.name !== 'Object') {
			source = {
				src: source
			};
		}

		// Resolve source and img when loaded
		const img = new Image();
		img.crossOrigin = options.crossOrigin;
		img.onerror = () => reject(new Error('Couldn\'t load image'));
		img.onload = () => resolve(Object.assign({}, source, {
			img
		}));
		img.src = source.src;
	}));

	// Get canvas context
	const ctx = canvas.getContext('2d');

	// When sources have loaded
	resolve(Promise.all(images)
		.then(images => {
			// Set canvas dimensions
			const getSize = dim => options[dim] || Math.max(...images.map(image => image.img[dim]));
			canvas.width = getSize('width');
			canvas.height = 0 // getSize('height');

			// 配置direction为y时 合并垂直方向高度
			if (options['direction'] === 'y') {
				let totalH = 0
				for (let i = 0; i < images.length; i++) {
					const img = images[i].img || {}
					const ratio = img.naturalHeight / img.naturalWidth
					const nh = ratio * window.innerWidth

					img.width = options['width']
					img.height = nh

					totalH += nh
				}

				canvas.height = totalH
			}

			// Draw images to canvas
			let y = 0
			for (let i = 0; i < images.length; i++) {
				const image = images[i]
				if (options['direction'] === 'y') {
					if (i > 0) {
						y += images[i - 1].img.height
					} else {
						image.y = 0
					}
				}
				
				image.y = y

				ctx.globalAlpha = image.opacity ? image.opacity : 1;
				ctx.drawImage(image.img,
					image.x || 0, image.y || 0,
					image.img.width || 0, image.img.height || 0
				);
			}

			// images.forEach(image => {
			// 	ctx.globalAlpha = image.opacity ? image.opacity : 1;
			// 	return ctx.drawImage(image.img, image.x || 0, image.y || 0);
			// });

			if (options.Canvas && options.format === 'image/jpeg') {
				// Resolve data URI for node-canvas jpeg async
				return new Promise((resolve, reject) => {
					canvas.toDataURL(options.format, {
						quality: options.quality,
						progressive: false
					}, (err, jpeg) => {
						if (err) {
							reject(err);
							return;
						}
						resolve(jpeg);
					});
				});
			}

			// Resolve all other data URIs sync
			return canvas.toDataURL(options.format, options.quality);
		}));
});

export default mergeImages;
