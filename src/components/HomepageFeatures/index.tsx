import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

import Translate, {translate} from '@docusaurus/Translate';

type FeatureItem = {
  title: JSX.Element;
  imageSrc: string;
  description: JSX.Element;
  url: string;
};

const K1: FeatureItem[] = [
  {
    title: <Translate id='pione.block1.title'>Getting started</Translate>,
    imageSrc: require('@site/static/img/index/icon/gettingstarted.png').default,
    description: (<><Translate id='pione.block1.desc'>How to get started with your K1</Translate></>),
    url: "docs/k1/getting-started/preparation"
  },
  {
    title: <Translate id='pione.block2.title'>Bianbu OS</Translate>,
    imageSrc: require('@site/static/img/index/icon/os.png').default,
    description: (<><Translate id='pione.block2.desc'>The official K1 operation system</Translate></>),
    url: "docs/k1/os/desktop/os-intro"
  },
  {
    title: <Translate id='pione.block3.title'>Linux kernel</Translate>,
    imageSrc: require('@site/static/img/index/icon/kernel.png').default,
    description: (<><Translate id='pione.block3.desc'>How to configure and build your own kernel for K1</Translate></>),
    url: "docs/k1/bianbu-linux/bianbu-linux/build-bit-os"
  },
  {
    title: <Translate id='pione.block4.title'>Hardware</Translate>,
    imageSrc: require('@site/static/img/index/icon/hardware.png').default,
    description: (<><Translate id='pione.block4.desc'>The information help you to undertand the hardware of K1</Translate></>),
    url: "docs/k1/hardware/hardware-brief"
  },
  {
    title: <Translate id='pione.block5.title'>Software</Translate>,
    imageSrc: require('@site/static/img/index/icon/software.png').default,
    description: (<><Translate id='pione.block5.desc'>The drivers and applications guide for the K1</Translate></>),
    url: "docs/k1/software/peripheral_driver/PINCTRL"
  },
  {
    title: <Translate id='pione.block6.title'>Datasheets</Translate>,
    imageSrc: require('@site/static/img/index/icon/datasheet.png').default,
    description: (<><Translate id='pione.block6.desc'>PDF-based documention</Translate></>),
    url: "docs/k1/datasheets"
  },
  {
    title: <Translate id='pione.block7.title'>Camera software</Translate>,
    imageSrc: require('@site/static/img/index/icon/cam.png').default,
    description: (<><Translate id='pione.block7.desc'>Software and libraries for K1 camera hardware</Translate></>),
    url: "docs/k1/hardware/camera-interface"
  },
  {
    title: <Translate id='pione.block8.title'>Machine learning</Translate>,
    imageSrc: require('@site/static/img/index/icon/ml.png').default,
    description: (<><Translate id='pione.block8.desc'>How to use hardware accelation for AI</Translate></>),
    url: "docs/k1/ml/ai-arch"
  },
  {
    title: <Translate id='pione.block9.title'>ROS2</Translate>,
    imageSrc: require('@site/static/img/index/icon/ros2.png').default,
    description: (<><Translate id='pione.block9.desc'>Guide to show you how to set up ROS</Translate></>),
    url: "docs/k1/news/ros2"
  },
];

const K1_Pro: FeatureItem[] = [
  {
    title: <Translate id='k1pro.block1.title'>Getting started</Translate>,
    imageSrc: require('@site/static/img/index/icon/gettingstarted.png').default,
    description: (<><Translate id='k1pro.block1.desc'>How to get started with your K1-Pro</Translate></>),
    url: "docs/k1_pro/getting-started/preparation"
  },
  {
    title: <Translate id='k1pro.block2.title'> OS</Translate>,
    imageSrc: require('@site/static/img/index/icon/os.png').default,
    description: (<><Translate id='k1pro.block2.desc'>The official K1-Pro operation system</Translate></>),
    url: "docs/k1_pro/os/debian/os-intro"
  },
  {
    title: <Translate id='k1pro.block3.title'>Linux kernel</Translate>,
    imageSrc: require('@site/static/img/index/icon/kernel.png').default,
    description: (<><Translate id='k1pro.block3.desc'>How to configure and build your own kernel for K1-Pro</Translate></>),
    url: "docs/k1_pro/system_dev/kernel_dev"
  },
  {
    title: <Translate id='k1pro.block4.title'>Hardware</Translate>,
    imageSrc: require('@site/static/img/index/icon/hardware.png').default,
    description: (<><Translate id='k1pro.block4.desc'>The information help you to undertand the hardware of K1-Pro</Translate></>),
    url: "docs/k1_pro/hardware/hardware-brief"
  },
  {
    title: <Translate id='k1pro.block5.title'>Software</Translate>,
    imageSrc: require('@site/static/img/index/icon/software.png').default,
    description: (<><Translate id='k1pro.block5.desc'>The drivers and applications guide for the K1-Pro</Translate></>),
    url: "docs/k1_pro/software/debian/linux"
  },
  {
    title: <Translate id='pione.block8.title'>Machine learning</Translate>,
    imageSrc: require('@site/static/img/index/icon/ml.png').default,
    description: (<><Translate id='pione.block8.desc'>How to use hardware accelation for AI</Translate></>),
    url: "docs/k1_pro/ml/env"
  },
];

const SSOM_3588: FeatureItem[] = [
  {
    title: <Translate id='ssom_3588.block1.title'>Getting started</Translate>,
    imageSrc: require('@site/static/img/index/icon/gettingstarted.png').default,
    description: (<><Translate id='ssom_3588.block1.desc'>How to get started with your SSOM_3588</Translate></>),
    url: "docs/ssom_3588/getting-started/preparation"
  },
  {
    title: <Translate id='ssom_3588.block2.title'> OS</Translate>,
    imageSrc: require('@site/static/img/index/icon/os.png').default,
    description: (<><Translate id='ssom_3588.block2.desc'>The official SSOM_3588 operation system</Translate></>),
    url: "docs/ssom_3588/os/debian/os-intro"
  },
  {
    title: <Translate id='ssom_3588.block3.title'>Linux kernel</Translate>,
    imageSrc: require('@site/static/img/index/icon/kernel.png').default,
    description: (<><Translate id='ssom_3588.block3.desc'>How to configure and build your own kernel for SSOM_3588</Translate></>),
    url: "docs/ssom_3588/ystem_dev/kernel_dev"
  },
  {
    title: <Translate id='ssom_3588.block4.title'>Hardware</Translate>,
    imageSrc: require('@site/static/img/index/icon/hardware.png').default,
    description: (<><Translate id='ssom_3588.block4.desc'>The information help you to undertand the hardware of SSOM_3588</Translate></>),
    url: "docs/ssom_3588/hardware/hardware-brief"
  },
  {
    title: <Translate id='ssom_3588.block5.title'>Software</Translate>,
    imageSrc: require('@site/static/img/index/icon/software.png').default,
    description: (<><Translate id='ssom_3588.block5.desc'>The drivers and applications guide for the SSOM_3588</Translate></>),
    url: "docs/ssom_3588/software/debian/linux"
  },
  {
    title: <Translate id='pione.block8.title'>Machine learning</Translate>,
    imageSrc: require('@site/static/img/index/icon/ml.png').default,
    description: (<><Translate id='pione.block8.desc'>How to use hardware accelation for AI</Translate></>),
    url: "docs/ssom_3588/ml/env"
  },
];

const ProductList = [
  {
    title: 'K1',
    features: K1,
  },
  {
    title: 'K1-Pro',
    features: K1_Pro,
  },
  {
    title: 'SSOM-3588',
    features: SSOM_3588,
  },
]

let activeProduct = 'K1';
let activeProductList = K1;

function handleClick(title){
  activeProduct = title
  activeProductList = ProductList.find(item => item.title === title).features
}

function ProductFilter(){
  return (
    <div className={styles.filter}>
      <ul>
      {ProductList.map((props, idx) => (
        <li className={props.title === activeProduct ? styles.select : ''} key={idx}>
          <h3><a href="#" onClick={() => handleClick(props.title)}>{props.title}</a></h3>
        </li>
      ))}
      </ul>
    </div>
  )
}

function Feature({title, imageSrc, description, url}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.block}>
      <div className="text--center">
      <a href={url}  rel="noopener noreferrer">
        <img src={imageSrc} className={styles.featureSvg} alt={title} />
      </a>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
      </div>
    </div>
  );
}

function Banner() {
  return (
    <div className={styles.banner}>
      <div className={styles.title}>
        <h2 className={styles.title1}>Bit-Brick <Translate id="banner.title">Documentation</Translate></h2>
      </div>
      <p className={styles.b_desc}>
        <Translate id="banner.desc">The official documentation for BIT-BRICK computers and microcontrollers</Translate>
      </p>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <div>
      <Banner></Banner>
      <ProductFilter/>
      <section className={styles.features}>
        <div className="container">
          <div className="row">
            {activeProductList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}