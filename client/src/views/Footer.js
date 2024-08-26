import logo from '../images/logo.png';

function Footer() {
    return (
        <footer className="container p-4 rounded">
            <div className="d-lg-flex justify-content-between">
                <div>
                    <img src={logo} alt="Logo" width="60" height="48" className="d-inline-block align-text-top" />
                </div>
                <div className="copyright">
                    <p>developed and maintained by <a href="https://github.com/babak2000ir/node-react-minimalist-dev-framework" target="_blank">Babak</a></p>
                </div>
                <div>
                    <ul className="d-flex gap-3 list-unstyled">
                        <li><a href="#"><i className="bi bi-facebook"></i></a></li>
                        <li><a href="#"><i className="bi bi-twitter"></i></a></li>
                        <li><a href="#"><i className="bi bi-instagram"></i></a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;