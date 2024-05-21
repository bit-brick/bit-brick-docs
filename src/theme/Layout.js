// src/theme/Layout.js
import React from 'react';
import Layout from '@theme-original/Layout';
import CustomHeader from '../components/header/CustomHeader';
import CustomFooter from '../components/footer/CustomFooter';

export default function CustomLayout(props) {
  return (
    <Layout {...props}>
      <CustomHeader />
      <main>{props.children}</main>
      <CustomFooter />
    </Layout>
  );
}
