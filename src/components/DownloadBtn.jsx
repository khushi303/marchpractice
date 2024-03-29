import React from 'react';

const DownloadButton = () => {
    const handleDownload = () => {
        // Fetch the HTML content of the Chrome document
        fetch('https://www.google.com/chrome/')
            .then(response => response.text())
            .then(htmlContent => {
                // Create a Blob object representing the HTML content
                const blob = new Blob([htmlContent], { type: 'text/html' });

                // Create a URL representing the blob and trigger download
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'chrome_document.html';
                document.body.appendChild(a);
                a.click();

                // Clean up
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            })
            .catch(error => {
                console.error('Error downloading Chrome document:', error);
            });
    };

    return (
        <div>
            <button onClick={handleDownload}>Download Chrome HTML Document</button>
        </div>
    );
};

export default DownloadButton;
