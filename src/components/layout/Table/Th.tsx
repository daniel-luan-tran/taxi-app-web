import { SortDirection } from '@tanstack/react-table';
import classNames from 'classnames';
import { Icon } from '../../common';

interface ThProps {
  children: React.ReactNode | React.ReactNode[];
  onClick?: (event: unknown) => void;
  propertyHeader?: boolean;
  sorted?: SortDirection | false;
  colSpan?: number;
  sticky?: boolean;
}

const Th = ({
  children,
  colSpan,
  onClick,
  propertyHeader = false,
  sorted,
  sticky,
}: ThProps) => {
  const renderArrow = () => {
    switch (sorted) {
      case 'asc':
        return <Icon name="IoCaretUp" />;
      case 'desc':
        return <Icon name="IoCaretDown" />;
      default:
        return null;
    }
  };

  const thClasses = classNames({
    th: true,
    'th--clickable': onClick,
    'th--property-header': propertyHeader,
    sticky: sticky,
  });

  return (
    <th className={thClasses} onClick={onClick} colSpan={colSpan}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {children}
        {renderArrow()}
      </div>
    </th>
  );
};

export default Th;
