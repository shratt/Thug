let mediaRecorder;
let stream;

async function meetingRecorder() {
    try {
        stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });

        mediaRecorder = new MediaRecorder(stream, {
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

    } catch (error) {
        console.error('Error: ', error);
    }
}

meetingRecorder.stop = function () {
    mediaRecorder.stop();
    stream.getTracks().forEach(track => track.stop());
}

export default meetingRecorder;
