/* src/pages/downloads/index.js */
import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import clsx from 'clsx';

// --- 1. 引入 Docusaurus 国际化核心组件 ---
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate, { translate } from '@docusaurus/Translate';

// --- 2. 引入两份数据源 ---
import dataEn from '../../data/downloads.json';
import dataZh from '../../data/downloads_zh.json';

// 下箭头图标
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
  // --- 3. 获取当前语言环境 ---
  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;

  // --- 4. 根据语言动态选择数据 ---
  // 更稳健的判断：凡是以 zh 开头的 locale 视为中文，否则视为英文
  const isZh = /^zh/i.test(currentLocale || '');
  const downloadData = isZh ? dataZh : dataEn;

  const [activeBoardId, setActiveBoardId] = useState('');
  const [collapsedCategories, setCollapsedCategories] = useState({});

  // --- 5. 初始化与语言切换处理 ---
  useEffect(() => {
    // 如果没有任何选中项，或者数据源变了（比如切换语言后），
    // 我们需要确保 activeBoardId 依然有效，或者重置为第一个
    if (downloadData.length > 0 && downloadData[0].boards.length > 0) {
      // 检查当前选中的ID在新的数据源里是否存在
      const boardExists = downloadData.some(cat => 
        cat.boards.some(b => b.id === activeBoardId)
      );

      // 如果未选中，或者选中的ID在当前语言数据里找不到（理论上ID应该一样，但为了安全），则重置
      if (!activeBoardId || !boardExists) {
        setActiveBoardId(downloadData[0].boards[0].id);
      }
    }
  }, [currentLocale, downloadData, activeBoardId]); 

  // 获取当前选中的板子数据
  const getActiveBoardData = () => {
    for (const category of downloadData) {
      const board = category.boards.find(b => b.id === activeBoardId);
      if (board) return board;
    }
    return null;
  };

  const activeBoard = getActiveBoardData();

  // 切换分类折叠状态
  const toggleCategory = (idx) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <Layout
      title={translate({id: 'download.pageTitle', message: 'Download Center'})}
      description={translate({id: 'download.pageDesc', message: 'Resources and Firmware Downloads'})}>
      
      <div className={styles.heroBanner}>
        {/* 直接把标题与副标题放在 banner 上，不使用背景容器 */}
        <h1 className={styles.heroTitle}>
          <Translate id="download.heroTitle">Downloads</Translate>
        </h1>
        <p className={styles.heroSubtitle}>
          <Translate id="download.heroSubtitle">Complete SDKs, firmware and hardware resources</Translate>
        </p>
      </div>
      
      <div className={styles.mainWrapper}>
        
        {/* 左侧导航 */}
        <aside className={styles.sidebar}>
          {downloadData.map((category, idx) => {
            const isCollapsed = collapsedCategories[idx];
            return (
              <div key={idx} className={styles.categoryGroup}>
                <div 
                  className={styles.categoryHeader} 
                  onClick={() => toggleCategory(idx)}
                >
                  <span className={styles.categoryTitleText}>{category.category}</span>
                  <ChevronIcon expanded={!isCollapsed} />
                </div>
                
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
                  <Translate id="download.noData">No resources available for this board</Translate>
                </div>
              )}
            </div>
          ) : (
            <div>
              <Translate id="download.loading">Loading...</Translate>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}