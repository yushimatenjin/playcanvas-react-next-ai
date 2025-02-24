"use client"

import { useState, useEffect, useCallback, RefObject } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number; // スクロールのトリガーとなる閾値（0-1）
  loadMoreTrigger?: number; // 次のセクションを読み込むトリガーとなる残りのセクション数
}

export const useInfiniteScroll = (
  containerRef: RefObject<HTMLElement>,
  options: UseInfiniteScrollOptions = {}
) => {
  const {
    threshold = 0.8,
    loadMoreTrigger = 2
  } = options;

  const [sections, setSections] = useState<number[]>([0, 1, 2]); // 初期セクション
  const [lastVisibleSection, setLastVisibleSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // スクロール位置を監視し、表示中のセクションを更新
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerHeight = container.clientHeight;
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // 現在のセクションとスクロール進捗を計算
    const currentSection = Math.floor(scrollTop / containerHeight);
    const sectionProgress = (scrollTop % containerHeight) / containerHeight;
    
    setLastVisibleSection(currentSection);
    setScrollProgress(scrollTop / (documentHeight - windowHeight));

    // スクロール位置が閾値を超えたら新しいセクションを追加
    const scrollRatio = (scrollTop + windowHeight) / documentHeight;
    if (scrollRatio > threshold && sections.length - currentSection <= loadMoreTrigger) {
      setSections(prev => {
        const nextSection = prev[prev.length - 1] + 1;
        return [...prev, nextSection];
      });
    }
  }, [containerRef, sections, threshold, loadMoreTrigger]);

  // スクロールイベントのリスナーを設定
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初期値を設定
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // 現在のセクションの進捗度を計算（0-1）
  const sectionProgress = containerRef.current
    ? (window.scrollY % containerRef.current.clientHeight) / containerRef.current.clientHeight
    : 0;

  return {
    sections,
    lastVisibleSection,
    currentSectionIndex: lastVisibleSection,
    scrollProgress,
    sectionProgress
  };
};