const { createUploadthing } = require("uploadthing/server");

const f = createUploadthing();

const uploadRouter = {
	videoAndImage: f({
		image: {
			maxFileSize: "4MB",
			maxFileCount: 10,
		},
		video: {
			maxFileCount: 5,
		}
	})
	.onUploadComplete((data) => console.log("Upload complete", data))
};

module.exports = { uploadRouter };