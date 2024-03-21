import { useEffect, useState } from "react";

let recognition: any = null;
if ("webkitSpeechRecognition" in window) {
    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'vi-VN';
}

const useSpeechReg = () => {
    const [text, setText] = useState("");
    const [isListening, setIsListening] = useState(false);
    
    useEffect(() => {
        if (!recognition)
            return;
        recognition.onresult = (event: SpeechRecognitionEvent) => {
            console.log('onresult event: ', event);
            setText(event.results[0][0].transcript)
            recognition?.stop();
            setIsListening(false);
        }
    }, []) // Cần thêm mảng rỗng để đảm bảo useEffect chỉ chạy một lần sau khi mount

    const startListening = () => {
        setText('');
        setIsListening(true);
        if (recognition)
            recognition.start();
    }

    const stopListening = () => {
        setIsListening(false);
        if (recognition)
            recognition.stop();
    }

    return {
        text, isListening, startListening, stopListening, hasRecognitionSupport: !!recognition,
    }
};

export default useSpeechReg;
