'use client'
import React from 'react';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

function MediaControls() {
    // 使用SWR获取媒体状态
    const { data, error } = useSWR(`${process.env.backendApi}/media`, fetcher);

    // 检查是否在加载或发生错误
    if (error) return <div>加载失败{process.env.backendApi}</div>;
    if (!data) return <div>加载中...</div>;
    console.log(error)

    // 发送媒体控制请求
    const sendMediaRequest = async (path: string) => {
        try {
            await axios.post(`${process.env.backendApi}${path}`);
            // 这里不需要手动更新mediaStatus状态，SWR会定期重新获取数据
        } catch (error) {
            console.error('Error sending media control request:', error);
        }
    };

    // 处理播放/暂停按钮点击
    const handlePlayPauseClick = () => {
        sendMediaRequest('/media/play-pause');
    };

    // 处理上一曲和下一曲按钮点击
    const handlePreviousClick = () => sendMediaRequest('/media/previous');
    const handleNextClick = () => sendMediaRequest('/media/next');

    return (
        <div className='space-x-5'>
            <button onClick={handlePreviousClick} className='text-5xl'>⏪</button>
            <button onClick={handlePlayPauseClick} className='text-5xl'>⏯️</button>
            <button onClick={handleNextClick} className='text-5xl'>⏩</button>
        </div>
    );
}

export default MediaControls;
