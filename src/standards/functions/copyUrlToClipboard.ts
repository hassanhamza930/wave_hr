export const copyUrlToClipboard = (jobId: string) => {
  const baseUrl = window.location.origin;
  const url = `${baseUrl}/apply/${jobId}`;
  navigator.clipboard
    .writeText(url)
    .then(() => {
      return url;
    })
    .catch((error) => {
      console.error(`Failed to copy ${url} to clipboard: ${error}`);
    });
};
