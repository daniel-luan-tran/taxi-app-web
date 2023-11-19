import classNames from 'classnames';
import './Page.scss';

type PageProps = {
  /**
   * Component used to pass metadata into the html head.
   */
  title: string;
  /**
   * Components to be rendered inside the page.
   */
  children: React.ReactNode | React.ReactNode[];
  fullHeight?: boolean;
  customStyles?: object;
};

/**
 * Layout component used to wrap an entire pages content.
 */
const Page = ({ title, children, fullHeight, customStyles }: PageProps) => {
  return (
    <main
      className={classNames({
        page: true,
        'page--fullHeight': fullHeight,
        [title]: title,
      })}
      style={customStyles}
    >
      {children}
    </main>
  );
};

export default Page;
