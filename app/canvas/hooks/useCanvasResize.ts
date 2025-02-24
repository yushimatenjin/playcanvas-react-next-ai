"use client"

import { RefObject, useEffect } from 'react';

export const useCanvasResize = (containerRef: RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ResizeObserverを作成
    const resizeObserver = new ResizeObserver(() => {
      // PlayCanvasは自動的にキャンバスをリサイズするため、
      // 追加の処理は必要ありません
    });

    // コンテナの監視を開始
    resizeObserver.observe(container);

    // クリーンアップ
    return () => resizeObserver.disconnect();
  }, [containerRef]);
};