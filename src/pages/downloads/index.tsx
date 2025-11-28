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

  // 选择板子并更新 URL hash（不触发页面跳动）
  const handleSelectBoard = (id) => {
    setActiveBoardId(id);
    // 使用 replaceState 更新 URL 的 hash，使其可被分享且不产生多余历史记录
    if (typeof window !== 'undefined' && window.history && window.location) {
      const newUrl = `${window.location.pathname}#${id}`;
      window.history.replaceState(null, '', newUrl);
    }
  };

  // --- 5. 初始化与语言切换处理（含 hash 支持） ---
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 尝试从 URL hash 获取目标板子 id
    const hashId = (window.location.hash || '').replace('#', '');
    let hashBoardExists = false;
    if (hashId) {
      hashBoardExists = downloadData.some(cat => cat.boards.some(b => b.id === hashId));
    }

    // 如果 hash 对应有效板子，则优先使用 hash
    if (hashBoardExists) {
      if (activeBoardId !== hashId) setActiveBoardId(hashId);
    } else {
      // 否则使用原来的逻辑：选中第一个板子（如果未设置或不在数据中）
      if (downloadData.length > 0 && downloadData[0].boards.length > 0) {
        const boardExists = downloadData.some(cat => 
          cat.boards.some(b => b.id === activeBoardId)
        );
        if (!activeBoardId || !boardExists) {
          setActiveBoardId(downloadData[0].boards[0].id);
        }
      }
    }

    // 监听浏览器 hash 变化（前进/后退或外部修改）
    const onHashChange = () => {
      const newHash = (window.location.hash || '').replace('#', '');
      if (newHash) {
        const exists = downloadData.some(cat => cat.boards.some(b => b.id === newHash));
        if (exists) setActiveBoardId(newHash);
      }
    };
    window.addEventListener('hashchange', onHashChange);

    return () => {
      window.removeEventListener('hashchange', onHashChange);
    };
  }, [currentLocale, downloadData, activeBoardId]);

  // 当 activeBoardId 变化时，尝试滚动到对应的内容元素（便于锚点定位）
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!activeBoardId) return;
    // 延迟一点以确保元素已渲染
    const t = setTimeout(() => {
      const el = document.getElementById(activeBoardId);
      if (el) {
        // 平滑滚动到元素顶部（可调整 behavior）
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
    return () => clearTimeout(t);
  }, [activeBoardId]);

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
                        onClick={() => handleSelectBoard(board.id)}
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
            // 给当前板块容器添加 id，方便通过 #id 定位
            <div id={activeBoard.id} className="animate__animated animate__fadeIn">
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