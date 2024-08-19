import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import React, { useEffect } from 'react';

export default function Home(): JSX.Element {
  useEffect(() => {
    function sendHeight() {
        window.parent.postMessage({
            frameHeight: document.documentElement.scrollHeight
        }, '*'); // 注意安全性，最好指定父页面的具体来源
    }

        sendHeight(); // 初始发送高度
        window.addEventListener('resize', sendHeight); // 监听窗口变化

        return () => {
            window.removeEventListener('resize', sendHeight); // 清理事件监听器
        };
    }, []);

  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Documentation`}
      description="Here is bit-brick official documentation">
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
