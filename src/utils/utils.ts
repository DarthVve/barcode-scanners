export async function base64ToFile(base64: string, fileName: string, mimeType: string): Promise<File | null> {
    try {
        // Decode the base64 string, atob runs in the browser only
        const byteString = atob(base64.split(',')[1]);

        // Create an array of bytes
        const byteNumbers = new Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            byteNumbers[i] = byteString.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        // Create a Blob from the byte array
        const blob = new Blob([byteArray], { type: mimeType });

        // Create a File from the Blob
        const file = new File([blob], fileName, { type: mimeType, lastModified: Date.now() });

        return file;
    } catch (error) {
        console.error("Error converting base64 string to file:", error);
        return null;
    }
}