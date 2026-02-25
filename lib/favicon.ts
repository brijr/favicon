export const convertEmojiToFavicon = async (emoji: string): Promise<"ico" | "png"> => {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    if (!ctx) throw new Error('Could not get canvas context');

    ctx.font = '28px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, 16, 16);

    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, 'image/x-icon');
    });

    // Firefox (and other non-Chromium browsers) don't support image/x-icon
    // in canvas.toBlob and fall back to image/png
    const isIco = blob.type === 'image/x-icon' || blob.type === 'image/vnd.microsoft.icon';
    const format = isIco ? 'ico' : 'png';

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `favicon.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return format;
  } catch (error) {
    return Promise.reject(error);
  }
};