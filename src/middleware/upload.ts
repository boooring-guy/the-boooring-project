import multer from 'multer'
import type { Request, Response, NextFunction } from 'express'

const storage = multer.memoryStorage()

export const upload = multer({
	storage,
	limits: { fileSize: 10 * 1024 * 1024, files: 1 }, // 10MB
	fileFilter: (req, file, cb) => {
		if (file.mimetype.startsWith('image/')) {
			cb(null, true)
		} else {
			cb(new Error('File is not an image'))
		}
	},
})

export const singleUpload = (fieldName: string) => {
	const uploadFn = upload.single(fieldName)
	return (req: Request, res: Response, next: NextFunction) => {
		uploadFn(req, res, (err) => {
			if (err instanceof multer.MulterError) {
				return res
					.status(400)
					.json({ message: `Multer Error : ${err.message}` })
			} else if (err) {
				return res.status(400).json({ message: `Error : ${err.message}` })
			}
			// if no error, continue to the next middleware
			next()
		})
	}
}
