export const copyUrlToClipboard = (jobId: string) => {
  const url = window.location.href;
  navigator.clipboard
    .writeText(`${url}/${jobId}`)
    .then(() => {
      return url;
    })
    .catch((error) => {
      console.error(`Failed to copy ${url} to clipboard: ${error}`);
    });
};
