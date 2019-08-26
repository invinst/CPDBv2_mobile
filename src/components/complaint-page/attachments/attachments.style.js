const fileTypeSpecificThumbnailStyle = {
  audio: () => ({
    backgroundImage: 'url(/img/ic-audio.svg)',
  }),
  video: (imageUrl) => ({
    backgroundImage: imageUrl ? `url(${imageUrl})` : 'url(/img/ic-video.svg)',
  }),
  document: (imageUrl) => ({
    backgroundImage: `url(${imageUrl})`,
  }),
};

export const thumbnailStyle = (fileType, imageUrl) => ({
  ...fileTypeSpecificThumbnailStyle[fileType](imageUrl),
});
