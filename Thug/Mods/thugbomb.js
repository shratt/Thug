async function thugbomb() {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });

        const mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'video/webm; codecs=vp9',
            audioBitsPerSecond: 128000,
            videoBitsPerSecond: 2500000,
        });
        
        const recordedChunks = [];

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'recorded-video.webm';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        };

        mediaRecorder.start();

        const stopButton = document.createElement('button');
        stopButton.textContent = 'Stop Recording';
        stopButton.onclick = () => {
            mediaRecorder.stop();
            stream.getTracks().forEach(track => track.stop());
            document.body.removeChild(stopButton);
        };
        document.body.appendChild(stopButton);
    } catch (error) {
        console.error('Error: ', error);
    }
}

export default thugbomb;
