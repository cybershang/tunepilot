'use client'
// components/VolumeSlider.js
import { useState, useEffect } from 'react';
import useSWR from "swr";
import axios from 'axios';

import { useBackendSettings } from "./backend-context";


interface VolumeData {
    volume: number;
}

async function setVolume(apiURL:string,volume: number) {
    try {
        const response = await axios.post(`${apiURL}/volume`, {
            volume: volume,
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error updating volume:', error);
    }
}

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function VolumeSlider() {
    const { settings } = useBackendSettings();
    const { data, error } = useSWR<VolumeData>(`${settings.apiURL}/volume`, fetcher);
    const [volume, setLocalVolume] = useState(0);

    useEffect(() => {
        if (data && data.volume !== undefined) {
            setLocalVolume(data.volume);
        }
    }, [data]);

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    const handleSliderChange = (e: { target: { value: any; }; }) => {
        const newVolume = e.target.value;
        setLocalVolume(newVolume);
        setVolume(settings.apiURL,newVolume).catch(console.error); // 使用axios发送POST请求更新音量
    };

    return (
        <div className='w-full'>
            <input
                className='w-full accent-red-500 rounded-lg'
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleSliderChange}
            />
            <p className='text-center text-2xl'>VOLUME: {volume}</p>
        </div>
    );
}
