import classNames from "classnames";

interface TdProps {
  children: React.ReactNode | React.ReactNode[];
  sticky?: boolean;
}

const Td = ({ children, sticky }: TdProps) => (
  <td
    className={
      classNames({
        "td": true,
        "sticky": sticky
      })
    }
  >
    {children}
  </td>
);

export default Td;