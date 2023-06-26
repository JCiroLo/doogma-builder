import classnames from "classnames";
import Button from "./Button";
import Icon from "./Icon";

function Header({ title }) {
  return (
    <div className="modal-header">
      <p className="modal-title">{title}</p>
    </div>
  );
}

function Body({ children }) {
  return <div className="modal-body">{children}</div>;
}

function Footer({ children }) {
  return <div className="modal-footer">{children}</div>;
}

function Modal({ show, size = "medium", children, onClose }) {
  return (
    <div className={classnames("modal-component", [size], { show })}>
      <div className="modal-content">
        <Button className={classnames("moda-close-button")} icon={<Icon name="times" />} onClick={onClose} />
        {children}
      </div>
    </div>
  );
}

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
