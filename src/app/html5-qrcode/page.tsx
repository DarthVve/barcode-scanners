"use client";

import Webcam from "react-webcam";
import { useState, useRef, useCallback, useEffect } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats, Html5QrcodeScanner, QrcodeErrorCallback } from "html5-qrcode";
import { toast } from 'react-toastify';
import Image from 'next/image';

import { base64ToFile } from '@/utils/utils';

export default function HTML5() {
    const camRef = useRef<Webcam | null>(null);
    const [barcode, setBarcode] = useState<string>('');
    const [barcodeImage, setBarcodeImage] = useState<string>('');
    const [barcodeUploaded, setBarcodeUploaded] = useState<boolean>(false);
    const [facingmode, setFacingMode] = useState<string>('user');

    const barcodeCapture = useCallback(async () => {
        const imageSrc = camRef.current?.getScreenshot();
        if (imageSrc) {
            setBarcodeImage(imageSrc);
        }
        toast.info('Processing Barcode Image...');
        const barcodeTypes = [Html5QrcodeSupportedFormats.AZTEC, Html5QrcodeSupportedFormats.CODE_128, Html5QrcodeSupportedFormats.CODE_39, Html5QrcodeSupportedFormats.DATA_MATRIX, Html5QrcodeSupportedFormats.EAN_13, Html5QrcodeSupportedFormats.EAN_8, Html5QrcodeSupportedFormats.ITF, Html5QrcodeSupportedFormats.PDF_417, Html5QrcodeSupportedFormats.QR_CODE, Html5QrcodeSupportedFormats.UPC_A, Html5QrcodeSupportedFormats.UPC_E];

        const imageFile = await base64ToFile(imageSrc!, 'barcode.png', 'image/png');

        const html5QrCode = new Html5Qrcode("reader", { formatsToSupport: barcodeTypes, verbose: true });

        html5QrCode.scanFileV2(imageFile!, false).then((response: any) => {
            console.log('response', response);
            if (response.decodedText.length > 0) {
                setBarcode(response.decodedText);
                setBarcodeUploaded(true);
            } else {
                toast.error('No barcode detected. Please try again.');
            }
        }).catch((error: Error) => {
            toast.error('Error detecting barcode. Please try again.');
            console.error('Barcode Rekognition Error:', error);
        });
    }, []);

    return (
        <div className="container">
            <div id="reader"></div>
            <div className='barcode-btns'>
                {barcodeImage === '' ? <button className='cap-btn' onClick={barcodeCapture}>Capture</button> :
                    <button className='cap-btn' onClick={() => setBarcodeImage('')}>Recapture</button>}
            </div>
            {barcodeImage !== '' ? <Image src={barcodeImage!} alt="barcode" width={5000} height={5000} className="barcode-img" loading='lazy' /> :
                <Webcam
                    className='test-camera-container'
                    ref={camRef}
                    audio={false}
                    screenshotFormat="image/png"
                    videoConstraints={{
                        facingMode: "user"
                    }}
                    imageSmoothing={true}
                />
            }
            <div className='bc-upload-stats'>{barcodeUploaded === false ? <h1 style={{ color: '#24527b' }}>Waiting to process Barcode Image...</h1> : <h2 style={{ color: '#24527b' }}>{barcode}</h2>}</div>
            <div className='barcode-btns'>
                {barcodeImage === '' ? <button className='cap-btn' onClick={barcodeCapture}>Capture</button> :
                    <button className='cap-btn' onClick={() => setBarcodeImage('')}>Recapture</button>}
            </div>
        </div>
    )
};
