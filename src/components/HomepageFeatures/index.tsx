import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  imageSrc: string;
  description: JSX.Element;
  url: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Getting started',
    imageSrc: require('@site/static/img/index/icon/gettingstarted.png').default,
    description: (<>How to get started with your PI ONE</>),
    url: "docs/pi-one/getting-started/preparation"
  },
  {
    title: 'Pi one OS',
    imageSrc: require('@site/static/img/index/icon/os.png').default,
    description: (<>How to get started with your Raspberry Pi</>),
    url: "docs/pi-one/pi-one-os/os"
  },
  {
    title: 'Linux kernel',
    imageSrc: require('@site/static/img/index/icon/kernel.png').default,
    description: (<>How to get started with your Raspberry Pi</>),
    url: "docs/pi-one/pi-one-linux-kernel/yocto"
  },
  {
    title: 'Pi one hardware',
    imageSrc: require('@site/static/img/index/icon/hardware.png').default,
    description: (<>How to get started with your Raspberry Pi</>),
    url: "docs/pi-one/pi-one-hardware/hardware-brief"
  },
  {
    title: 'Pi one software',
    imageSrc: require('@site/static/img/index/icon/software.png').default,
    description: (<>How to get started with your Raspberry Pi</>),
    url: "docs/pi-one/pi-one-software/GPIOs-functions"
  },
  {
    title: 'Datasheets',
    imageSrc: require('@site/static/img/index/icon/datasheet.png').default,
    description: (<>How to get started with your Raspberry Pi</>),
    url: "docs/pi-one/datasheets"
  },
  {
    title: 'Camera software',
    imageSrc: require('@site/static/img/index/icon/cam.png').default,
    description: (<>Software and libraries for Raspberry Pi camera hardware</>),
    url: "docs/pi-one/datasheets"
  },
  {
    title: 'Machine learning',
    imageSrc: require('@site/static/img/index/icon/ml.png').default,
    description: (<>How to get started with your Raspberry Pi</>),
    url: "docs/pi-one/datasheets"
  },
  {
    title: 'ROS2',
    imageSrc: require('@site/static/img/index/icon/ros2.png').default,
    description: (<>How to get started with your Raspberry Pi</>),
    url: "docs/pi-one/datasheets"
  },
];

const ProductList = [
  {
    title: 'PI ONE',
    features: FeatureList,
  },
  {
    title: 'RISC-V',
    features: FeatureList
  },
]

let activeProduct = 'PI ONE';

function handleClick(title){
  activeProduct = title
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
      <div className={styles.title}><h2 className={styles.title1}>Bit-Brick</h2><h2 className={styles.title2}>Documentation</h2></div>
      <p className={styles.b_desc}>The official documentation for</p>
      <p className={styles.b_desc}>BIT-BRICK computers and microcontrollers</p>
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
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}