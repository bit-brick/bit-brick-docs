/* src/pages/downloads/index.js */
import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import clsx from 'clsx';
import downloadData from '../../data/downloads.json';

// 下箭头图标 (用于折叠/展开)
const ChevronIcon = ({ expanded }) => (
  <svg 
    className={clsx(styles.chevron, { [styles.chevronExpanded]: expanded })} 
    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// 下载图标
const DownloadIcon = () => (
  <svg className={styles.downloadIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export default function Downloads() {
  const [activeBoardId, setActiveBoardId] = useState('');
  // 记录哪些分类是折叠的 (key为索引, value为true表示折叠)
  // 默认全部展开，或者你可以设置默认全部折叠
  const [collapsedCategories, setCollapsedCategories] = useState({});

  useEffect(() => {
    // 默认选中第一个
    if (downloadData.length > 0 && downloadData[0].boards.length > 0) {
      setActiveBoardId(downloadData[0].boards[0].id);
    }
  }, []);

  const getActiveBoardData = () => {
    for (const category of downloadData) {
      const board = category.boards.find(b => b.id === activeBoardId);
      if (board) return board;
    }
    return null;
  };

  // 切换分类折叠状态
  const toggleCategory = (idx) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const activeBoard = getActiveBoardData();

  return (
    <Layout
      title="Download Center"
      description="Resources and Firmware Downloads">
      
      <div className={styles.heroBanner}>
        <h1 className={styles.heroTitle}>资料下载</h1>
        <p className={styles.heroSubtitle}>完整的 SDK 免费开放，配套完善的软硬件资料</p>
      </div>
      
      <div className={styles.mainWrapper}>
        
        {/* 左侧导航 */}
        <aside className={styles.sidebar}>
          {downloadData.map((category, idx) => {
            const isCollapsed = collapsedCategories[idx];
            return (
              <div key={idx} className={styles.categoryGroup}>
                {/* 分类标题 (可点击) */}
                <div 
                  className={styles.categoryHeader} 
                  onClick={() => toggleCategory(idx)}
                >
                  <span className={styles.categoryTitleText}>{category.category}</span>
                  <ChevronIcon expanded={!isCollapsed} />
                </div>
                
                {/* 下面的列表，如果 isCollapsed 为 true 则不渲染或者隐藏 */}
                <div className={clsx(styles.categoryListWrapper, { [styles.collapsed]: isCollapsed })}>
                  <ul className={styles.menuList}>
                    {category.boards.map((board) => (
                      <li 
                        key={board.id}
                        className={clsx(styles.menuItem, {
                          [styles.activeItem]: activeBoardId === board.id
                        })}
                        onClick={() => setActiveBoardId(board.id)}
                      >
                        {board.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </aside>

        {/* 右侧内容 */}
        <main className={styles.content}>
          {activeBoard ? (
            <div className="animate__animated animate__fadeIn">
              <h2 className={styles.boardTitle}>{activeBoard.name}</h2>
              
              {activeBoard.sections && activeBoard.sections.length > 0 ? (
                activeBoard.sections.map((section, sIdx) => (
                  <div key={sIdx} className={styles.section}>
                    <h3 className={styles.sectionTitle}>{section.title}</h3>
                    <div className={styles.grid}>
                      {section.items.map((item, iIdx) => (
                        <a 
                          key={iIdx} 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={styles.card}
                        >
                          <div className={styles.cardContent}>
                            <span className={styles.cardLabel}>{item.label}</span>
                            {item.desc && (
                              <p className={styles.cardDesc}>{item.desc}</p>
                            )}
                          </div>
                          <DownloadIcon />
                        </a>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="alert alert--warning" role="alert">
                  暂无相关资料下载
                </div>
              )}
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </main>
      </div>
    </Layout>
  );
}