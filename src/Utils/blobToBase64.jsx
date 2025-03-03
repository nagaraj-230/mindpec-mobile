// export const blobToBase64 = blob => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(blob);
//     reader.onloadend = () => {
//       resolve(reader.result.split(',')[1]); // Extract Base64 content
//     };
//     reader.onerror = reject;
//   });
// };

export const blobToBase64 = async blob => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]); // Get base64 data
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
