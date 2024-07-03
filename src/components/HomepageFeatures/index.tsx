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
    imageSrc: require('@site/static/img/index/Getting-Started.png').default,
    description: (<>How to get started with your Pi One</>),
    url: "docs/pi-one/getting-started/preparation"
  },
  
  {
    title: 'Pi one OS',
    imageSrc: require('@site/static/img/index/Raspberry-Pi-OS.png').default,
    description: (<>Pi One OS  </>),
    url: "docs/pi-one/pi-one-os/os"
  },
  {
    title: 'Pi one linux kernel',
    imageSrc: require('@site/static/img/index/PIP.png').default,
    description: (<>Linux kernel</>),
    url: "docs/pi-one/pi-one-linux-kernel/yocto"
  },
  // {
  //   title: 'Pi one uboot',
  //   imageSrc: require('@site/static/img/index/Remote-Access.png').default,
  //   description: (<>How to get started with your Raspberry Pi</>),
  //   url: "docs/pi-one/pi-one-uboot/uboot"
  // },
  {
    title: 'Pi one hardware',
    imageSrc: require('@site/static/img/index/Getting-Started.png').default,
    description: (<>Hardware </>),
    url: "docs/pi-one/pi-one-hardware/hardware-brief"
  },
  {
    title: 'Pi one software',
    imageSrc: require('@site/static/img/index/Tutorials.png').default,
    description: (<>Software </>),
    url: "docs/pi-one/pi-one-software/GPIOs-functions"
  },
  // {
  //   title: 'Pi one camera',
  //   imageSrc: require('@site/static/img/index/Camera.png').default,
  //   description: (<>How to get started with your Raspberry Pi</>),
  //   url: "docs/pi-one/pi-one-camera/camera"
  // },
  // {
  //   title: 'Pi one display',
  //   imageSrc: require('@site/static/img/index/Getting-Started.png').default,
  //   description: (<>How to get started with your Raspberry Pi</>),
  //   url: "docs/pi-one/pi-one-display/display"
  // },
  {
    title: 'Datasheets',
    imageSrc: require('@site/static/img/index/Datasheets.png').default,
    description: (<>Datasheets</>),
    url: "docs/pi-one/datasheets"
  },
];

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

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}