const { createUploadthing } = require("uploadthing/server");

const f = createUploadthing();

const uploadRouter = {
	videoAndImage: f({
		image: {
			maxFileSize: "4MB",
			maxFileCount: 4,
		},
		video: {
			maxFileCount: 2,
		}
	}).onUploadComplete((data) => {
		console.log("upload completed", data);
	}),
};

module.exports = { uploadRouter };