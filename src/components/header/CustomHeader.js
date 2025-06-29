// src/components/CustomHeader.js
import React, { useEffect, useState, useRef } from 'react';
import Translate, {translate} from '@docusaurus/Translate';


const CustomHeader = () => {

  const [selectedLang, setSelectedLang] = useState('/');
  const [communityDropdownOpen, setCommunityDropdownOpen] = useState(false);
  const communityRef = useRef(null);

  useEffect(() => {
    // 检查当前的路径是否包含 '/zh'
    const path = window.location.pathname;
    if (path.startsWith('/zh')) {
      setSelectedLang('/zh');
    } else {
      setSelectedLang('/');
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (communityRef.current && !communityRef.current.contains(event.target)) {
        setCommunityDropdownOpen(false);
      }
    }
    if (communityDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [communityDropdownOpen]);

  const handleLanguageChange = (event) => {
    const selectedValue = event.target.value;

    let path = document.location.pathname;

    // 如果选择的是 /zh，且当前路径不包含 /zh，则在路径前添加 /zh
    if (selectedValue === "/zh" && !path.startsWith("/zh")) {
      path = "/zh" + path;
    }
    
    // 如果选择的是 /，且当前路径以 /zh 开头，则去除 /zh
    if (selectedValue === "/" && path.startsWith("/zh")) {
      path = path.replace("/zh", ""); // 去除开头的 /zh
    }

    // 如果路径变了，才重新导航
    if (window.location.pathname !== path) {
      window.location.href = path;
    }
  }



  return (
  <div className='custom-header'>
  <header className="site-header header-main-layout-1 ast-primary-menu-enabled ast-logo-title-inline ast-hide-custom-menu-mobile ast-builder-menu-toggle-icon ast-mobile-header-inline" id="masthead" itemType="https://schema.org/WPHeader" itemScope itemID="#masthead">
    <div id="ast-desktop-header" data-toggle-type="dropdown">
      <div className="ast-main-header-wrap main-header-bar-wrap">
        <div className="ast-primary-header-bar ast-primary-header main-header-bar site-header-focus-item" data-section="section-primary-header-builder">
          <div className="site-primary-header-wrap ast-builder-grid-row-container site-header-focus-item ast-container" data-section="section-primary-header-builder">
            <div className="ast-builder-grid-row ast-builder-grid-row-has-sides ast-builder-grid-row-no-center">
              <div className="site-header-primary-section-left site-header-section ast-flex site-header-section-left">
                <div className="ast-builder-layout-element ast-flex site-header-focus-item" data-section="title_tagline">
                  <div className="site-branding ast-site-identity" itemType="https://schema.org/Organization" itemScope>
                    <span className="site-logo-img"><a hhref={selectedLang == '/zh' ? "https://www.bit-brick.com/zh":"https://www.bit-brick.com/"} className="custom-logo-link" rel="home"><img fetchPriority="high" width="283" height="278" src="https://www.bit-brick.com/wp-content/uploads/2024/08/cropped-1723805857491-64x64.png" className="custom-logo" alt="BIT-BRICK" decoding="async" /></a></span>
                    <div className="ast-site-title-wrap">
                      <span className="site-title" itemProp="name">
                        <a href={selectedLang == '/zh' ? "https://www.bit-brick.com/zh":"https://www.bit-brick.com/"} rel="home" itemProp="url">
                          BIT-BRICK
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="site-header-primary-section-right site-header-section ast-flex ast-grid-right-section">
                <div className="ast-builder-menu-1 ast-builder-menu ast-flex ast-builder-menu-1-focus-item ast-builder-layout-element site-header-focus-item" data-section="section-hb-menu-1">
                  <div className="ast-main-header-bar-alignment">
                    <div className="main-header-bar-navigation">
                      <nav className="site-navigation ast-flex-grow-1 navigation-accessibility site-header-focus-item" id="primary-site-navigation-desktop" aria-label="Site Navigation" itemType="https://schema.org/SiteNavigationElement" itemScope>
                        <div className="main-navigation ast-inline-flex">
                          <ul id="ast-hf-menu-1" className="main-header-menu ast-menu-shadow ast-nav-menu ast-flex submenu-with-border stack-on-mobile">
                            <li id="menu-item-547" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-547"><a href={selectedLang == '/zh' ? "https://www.bit-brick.com/zh/软件/":"https://www.bit-brick.com/software/"} aria-current="page" className="menu-link"><Translate id='menu.software'>Software</Translate></a></li>
                            <li id="menu-item-547" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-547"><a href={selectedLang == '/zh' ? "https://www.bit-brick.com/zh/硬件/":"https://www.bit-brick.com/products/"} aria-current="page" className="menu-link"><Translate id='menu.hardware'>Hardware</Translate></a></li>
                            {/* <li id="menu-item-231" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-231"><a href="https://github.com/bit-brick" className="menu-link">Github</a></li> */}
                            <li id="menu-item-547" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-547"><a href={selectedLang == '/zh' ? "https://www.bit-brick.com/zh/博客/":"https://www.bit-brick.com/blog/"} aria-current="page" className="menu-link"><Translate id='menu.news'>News</Translate></a></li>
                            <li id="menu-item-525" className="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-533 current_page_item  menu-item-525"><a href={selectedLang == '/zh' ? "/zh":"/"} className="menu-link"><Translate id='menu.document'>Documentation</Translate></a></li>
                            <li id="menu-item-249" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-249" ref={communityRef} style={{position: 'relative'}}>
                              <button
                                className="menu-link"
                                style={{
                                  border: 'none',
                                  cursor: 'pointer',
                                  padding: 0,
                                  background: 'none',
                                  borderRadius: 0,
                                  boxShadow: 'none',
                                  outline: 'none',
                                }}
                                onClick={() => setCommunityDropdownOpen((open) => !open)}
                                onMouseDown={e => e.preventDefault()} // 防止点击时出现 outline
                              >
                                <Translate id='menu.community'>Community</Translate>
                              </button>
                              {communityDropdownOpen && (
                                <ul
                                  style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    background: '#fff',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                    listStyle: 'none',
                                    margin: 0,
                                    padding: '8px 0',
                                    minWidth: '160px',
                                    zIndex: 1000,
                                  }}
                                >
                                  <li>
                                    <a
                                      href="https://discourse.bit-brick.com/"
                                      className="menu-link"
                                      style={{ display: 'block', padding: '8px 16px', color: '#222', textDecoration: 'none' }}
                                      target="_blank" rel="noopener noreferrer"
                                    >
                                      Forum
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="https://redmine.bit-brick.com/"
                                      className="menu-link"
                                      style={{ display: 'block', padding: '8px 16px', color: '#222', textDecoration: 'none' }}
                                      target="_blank" rel="noopener noreferrer"
                                    >
                                      Redmine
                                    </a>
                                  </li>
                                </ul>
                              )}
                            </li>
                            <li id="menu-item-98" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-98"><a href={selectedLang == '/zh' ? "https://www.bit-brick.com/zh/关于我们/":"https://www.bit-brick.com/about-us/"} className="menu-link"><Translate id='menu.about'>About us</Translate></a></li>
                          </ul>
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
                <aside className="header-widget-area widget-area site-header-focus-item header-widget-area-inner" data-section="sidebar-widgets-header-widget-1" aria-label="Header Widget 1">
                  <section id="polylang-3" className="widget widget_polylang">
                    <label className="screen-reader-text" htmlFor="lang_choice_polylang-3">Choose a language</label>
                    <select name="lang_choice_polylang-3" id="lang_choice_polylang-3" className="pll-switcher-select" value={selectedLang} onChange={handleLanguageChange}>
                      <option value="/zh" lang="zh-CN">中文 (中国)</option>
                      <option value="/" lang="en-US">English</option>
                    </select>
                  </section>
                </aside>
              </div>
            </div>
          </div>
        </div>
        <div className="ast-desktop-header-content content-align-flex-start" style={{ display: 'none' }}></div>
      </div>
      <div id="ast-mobile-header" className="ast-mobile-header-wrap" data-type="dropdown">
        <div className="ast-main-header-wrap main-header-bar-wrap">
          <div className="ast-primary-header-bar ast-primary-header main-header-bar site-primary-header-wrap site-header-focus-item ast-builder-grid-row-layout-default ast-builder-grid-row-tablet-layout-default ast-builder-grid-row-mobile-layout-default" data-section="section-primary-header-builder">
            <div className="ast-builder-grid-row ast-builder-grid-row-has-sides ast-builder-grid-row-no-center">
              <div className="site-header-primary-section-left site-header-section ast-flex site-header-section-left">
                <div className="ast-builder-layout-element ast-flex site-header-focus-item" data-section="title_tagline">
                  <div className="site-branding ast-site-identity" itemType="https://schema.org/Organization" itemScope>
                    <span className="site-logo-img"><a href="https://www.bit-brick.com/" className="custom-logo-link" rel="home"><img fetchPriority="high" width="283" height="278" src="https://www.bit-brick.com/wp-content/uploads/2024/05/cropped-logo3-39x35.png" className="custom-logo" alt="BIT-BRICK" decoding="async" /></a></span>
                    <div className="ast-site-title-wrap">
                      <span className="site-title" itemProp="name">
                        <a href="https://www.bit-brick.com/" rel="home" itemProp="url">
                          BIT-BRICK
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="site-header-primary-section-right site-header-section ast-flex ast-grid-right-section">
                <div className="ast-builder-layout-element ast-flex site-header-focus-item" data-section="section-header-mobile-trigger">
                  <div className="ast-button-wrap">
                    <button type="button" className="menu-toggle main-header-menu-toggle ast-mobile-menu-trigger-minimal" aria-expanded="false" data-index="0">
                      <span className="screen-reader-text">Main Menu</span>
                      <span className="mobile-menu-toggle-icon">
                        <span className="ahfb-svg-iconset ast-inline-flex svg-baseline"><svg className="ast-mobile-svg ast-menu-svg" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 13h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1zM3 7h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1zM3 19h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1z"></path></svg></span><span className="ahfb-svg-iconset ast-inline-flex svg-baseline"><svg className="ast-mobile-svg ast-close-svg" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"></path></svg></span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ast-mobile-header-content content-align-flex-start">
          <div className="ast-builder-menu-mobile ast-builder-menu ast-builder-menu-mobile-focus-item ast-builder-layout-element site-header-focus-item" data-section="section-header-mobile-menu">
            <div className="ast-main-header-bar-alignment">
              <div className="main-header-bar-navigation">
                <nav className="site-navigation ast-flex-grow-1 navigation-accessibility site-header-focus-item" id="ast-mobile-site-navigation" aria-label="Site Navigation" itemType="https://schema.org/SiteNavigationElement" itemScope>
                  <div className="main-navigation">
                    <ul id="ast-hf-mobile-menu" className="main-header-menu ast-nav-menu ast-flex submenu-with-border astra-menu-animation-fade stack-on-mobile">
                      <li id="menu-item-233" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-233"><a href="https://github.com/bit-brick" className="menu-link">Github</a></li>
                      <li id="menu-item-546" className="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-533 current_page_item menu-item-546"><a href="https://www.bit-brick.com/blog/" aria-current="page" className="menu-link">News</a></li>
                      <li id="menu-item-526" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-526"><a href="https://docs.bit-brick.com/" className="menu-link">Documentation</a></li>
                      <li id="menu-item-112" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-112"><a href="https://www.bit-brick.com/about-us/" className="menu-link">About us</a></li>
                      <li id="menu-item-290" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-290"><a href="https://discourse.bit-brick.com/" className="menu-link">community</a></li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  </div>
  )
};

export default CustomHeader;
