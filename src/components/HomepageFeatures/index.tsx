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



const SBC: FeatureItem[] = [
  {
    title: <Translate id='sbc_k1.title'>K1</Translate>,
    imageSrc: require('@site/static/img/index/devices/sbc_k1.png').default,
    description: (<><Translate id='sbc_k1.desc'>The High-performance Single-board Computer Based on Octa-core RISC-V Application Processor</Translate></>),
    url: "docs/k1/getting-started/preparation"
  },
  {
    title: <Translate id='sbc_k1_pro.title'>K1 PRO</Translate>,
    imageSrc: require('@site/static/img/index/devices/sbc_k1_pro.png').default,
    description: (<><Translate id='sbc_k1_pro.desc'>The High-performance Single-board Computer Based on RK3576 Application Processor</Translate></>),
    url: "docs/k1_pro/getting-started/preparation"
  },
  {
    title: <Translate id='sbc_imx8mp.title'>IMX8MP-HMI</Translate>,
    imageSrc: require('@site/static/img/index/devices/sbc_imx8mp.png').default,
    description: (<><Translate id='sbc_imx8mp.desc'>The High-performance Single-board Computer Based on i.MX 8M Plus Application Processor</Translate></>),
    url: "docs/imx8mp/intro/intro"
  },
  {
    title: <Translate id='sbc_cluster_k1.title'>Cluster_K1</Translate>,
    imageSrc: require('@site/static/img/index/devices/sbc_cluster_k1.png').default,
    description: (<><Translate id='sbc_cluster_k1.desc'>The high-performance Computing Cluster Board for SSOM-K1/SSOM-3576</Translate></>),
    url: "docs/ssom_k1/getting-started/k1_cluster_preparation"
  },
  
];

const SSOM: FeatureItem[] = [
  {
    title: <Translate id='ssom_k1.title'>SSOM-K1</Translate>,
    imageSrc: require('@site/static/img/index/devices/ssom_k1.png').default,
    description: (<><Translate id='ssom_k1.desc'>The high-performance SoM Based on Octa-core RISC-V Application Processor</Translate></>),
    url: "docs/ssom_k1/getting-started/k1_cluster_preparation"
  },
  {
    title: <Translate id='ssom_3576.title'>SSOM-3576</Translate>,
    imageSrc: require('@site/static/img/index/devices/ssom_3576.png').default,
    description: (<><Translate id='ssom_3576.desc'>The high-performance SoM Based on RK3576 Application Processor</Translate></>),
    url: "docs/ssom_3576/getting-started/preparation"
  },
  {
    title: <Translate id='ssom_3588.title'>SSOM-3588</Translate>,
    imageSrc: require('@site/static/img/index/devices/ssom_3588.png').default,
    description: (<><Translate id='ssom_3588.desc'>The high-performance SoM Based on RK3588 Application Processor</Translate></>),
    url: "docs/ssom_3588/getting-started/preparation"
  },
  {
    title: <Translate id='ssom_3588_v2.title'>SSOM-3588-V2</Translate>,
    imageSrc: require('@site/static/img/index/devices/ssom_3588_v2.png').default,
    description: (<><Translate id='ssom_3588_v2.desc'>The compact size&high-performance SoM Based on RK3588 Application Processor</Translate></>),
    url: "docs/ssom_3588_v2/intro/intro"
  },
  {
    title: <Translate id='ssom_3588s.title'>SSOM-3588S</Translate>,
    imageSrc: require('@site/static/img/index/devices/ssom_3588s.png').default,
    description: (<><Translate id='ssom_3588s.desc'>The compact size&high-performance SoM Based on RK3588S Application Processor</Translate></>),
    url: "docs/ssom_3588s/intro/intro"
  },
  {
    title: <Translate id='ssom_imx9352.title'>SSOM-IMX9352</Translate>,
    imageSrc: require('@site/static/img/index/devices/ssom_imx9352.png').default,
    description: (<><Translate id='ssom_imx9352.desc'>The compact size&high-performance SoM Based on i.MX9352 Application Processor</Translate></>),
    url: "docs/ssom_imx9352/intro/intro"
  },
  {
    title: <Translate id='ssom_imx8mp.title'>SSOM-IMX8MP</Translate>,
    imageSrc: require('@site/static/img/index/devices/ssom_imx8mp.png').default,
    description: (<><Translate id='ssom_imx8mp.desc'>The compact size&high-performance SoM Based on i.MX 8M Plus Application Processor</Translate></>),
    url: "docs/ssom_imx8mp/intro/intro"
  },
  {
    title: <Translate id='ssom_imx8mm.title'>SSOM-IMX8MM</Translate>,
    imageSrc: require('@site/static/img/index/devices/ssom_imx8mm.png').default,
    description: (<><Translate id='ssom_imx8mm.desc'>The compact size&high-performance SoM Based on i.MX 8M Mini Application Processor</Translate></>),
    url: "docs/ssom_imx8mm/intro/intro"
  },
];
const ProductList = [
  {
    title: 'SBC',
    features: SBC,
  },
  {
    title: 'SSOM',
    features: SSOM,
  },
]

let activeProduct = 'SBC';
let activeProductList = SBC;

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