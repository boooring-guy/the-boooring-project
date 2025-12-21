import { ENV } from '@/env'
import { v2 as cloudinary } from 'cloudinary'
import { error } from 'console'
import { serviceRole } from 'drizzle-orm/supabase'

import { Readable } from 'stream'

cloudinary.config({
	cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
	api_key: ENV.CLOUDINARY_API_KEY,
	api_secret: ENV.CLOUDINARY_API_SECRET,
	// sign_url: true, TODO: enable this
})

export const uploadImageToCloudinary = (
	fileBuffer: Buffer,
	folderName: string
) => {
	return new Promise((resolve, reject) => {
		// Writable stream on cloudinary server
		const uploadStream = cloudinary.uploader.upload_stream(
			{
				folder: folderName,
			},
			(error, result) => {
				if (error) {
					console.log('Error uploading image to Cloudinary:', error)
					return reject(error)
				}
				resolve(result?.secure_url || '')
			}
		)

		// create the stream
		const stream = new Readable()
		// pipe readable to writableStream
		stream.push(fileBuffer)
		stream.push(null)
		stream.pipe(uploadStream)
	})
}
