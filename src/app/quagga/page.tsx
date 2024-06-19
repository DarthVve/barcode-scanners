"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from "react-webcam";
import Quagga from 'quagga';
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
        const readers = ['ean_reader', 'ean_5_reader', 'ean_2_reader', 'ean_8_reader', 'code_39_reader', 'code_39_vin_reader', 'codabar_reader', 'upc_reader', 'upc_e_reader', 'i2of5_reader', '2of5_reader', 'code_93_reader'];

        const imageFile = await base64ToFile(imageSrc!, 'barcode.png', 'image/png');

        Quagga.decodeSingle({
            decoder: {
                // readers: ['code_128_reader']
                readers: readers
            },
            locate: true,
            src: imageSrc!
        }, function (result: any) {
            console.log("result-->", result);
            if (result !== undefined || null && result.codeResult !== undefined || null) {
                const code = result.codeResult.code;
                setBarcode(code);
                setBarcodeUploaded(true);
            } else {
                console.log("not detected");
                toast.error('No barcode detected. Please try again.');
            }
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
            <div className='bc-upload-stats'>{barcodeUploaded === false ? <h1 style={{ color: '#24527b' }}>Process Barcode with Quagga...</h1> : <h2 style={{ color: '#24527b' }}>{barcode}</h2>}</div>
            <div className='barcode-btns'>
                {barcodeImage === '' ? <button className='cap-btn' onClick={barcodeCapture}>Capture</button> :
                    <button className='cap-btn' onClick={() => setBarcodeImage('')}>Recapture</button>}
            </div>
        </div>
    )
};
